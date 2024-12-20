import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //save refresh token in DB 
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - fields are not empty, correct format of data
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload images to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refreshToken field from response
    // check for user creation 
    // return response

    // get the user details
    const {fullname, email, username, password} = req.body
    // console.log("email: ", email);

    // validation, if fields are empty
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //check if user already exists or not
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // check for images, check for avatar
    // middleware add more things in "req" object
    // we are getting access of ".files" because of multer
    // console.log(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath){
        throw new ApiError(400, "avatar files is required")
    }

    // upload images to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(500, "avatar not uploaded on cloudinary")  
    }

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        username,
        password,
        coverImage: coverImage?.url || "",
        email
    })

    // check for user creation
    // remove password and refreshToken field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response
    return res
    .status(201)
    .json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    //get login details from frontend
    //check if that user exists in our db
    //validate the password
    //generate the access and refresh token
    //return the user details to frontend(-password)
    //save the refresh and access token in user's browser using cookieParser

    //1. req body -> data
    //2. username or email based login
    //3. find the user
    //4. password check
    //5. access and refresh token
    //6. send cookies


    //1. req body -> data
    const {email, username, password} = req.body

    //2. username or email based login
    if(!(username || email)){
        throw new ApiError(400, "username or email is required")
    }

    //3. find the user
    // findOne -> as soon as it get the first document/entry in mongoDB it returns that document 
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    //4. password check
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Your password is incorrect")
    }

    //5. access and refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    //6. send cookies
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // whenever you want to send cookies
    //design some options of cookies
    // because of these options, no one can modify these cookies
    // can only be modified through server
    const options = {
        httpOnly: true,
        secure: true
    }

    //Why to send tokens in json?
    //so that user can save these tokens at his end 
    //but you need to have the cookieParser to use cookie
    return res.
    status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    console.log(req.cookies);
    
    //1. clear the refreshToken from user in DB
    //2. clear the cookies from user's browser

    //Strategy
    //1. create a middleware(auth.middleware.js) to add the "user" object in req
    //2. add that middleware in "/logout" route

    //1. clear the refreshToken from user in DB
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            //you get updated response in return   
            new: true
        }
    )

    //2. clear the cookies from user's browser
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser
}