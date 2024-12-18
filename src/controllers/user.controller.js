import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

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

    // got the user details
    const {fullname, email, username, password} = req.body
    console.log("email: ", email);

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
    // console log "req.files"
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

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
        username: username.toLowerCase(),
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

export {registerUser}