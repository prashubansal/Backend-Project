## Roadmap of Backend
### Libraraies used in Javascript
- Express -> used for routing purpose
- mongoose -> used for interacting with database

### A JS based backend
we handle these 
    > Data

    > File

    > Third party (API)

### Directory structure for backend
src

- /src/files
    > index: DB connects

    > app: configuration, cookies, urlencode

    > constants: enums, DB-name

- /src/folders
    > DB: contains actual code jo DB se connect karta hai 

    > Models: contains data structure/schema/models

    > Controllers: functionality

    > Routes: 

    > Middlewares: 

    > Utils: code snippets that will be used repeatedly in a project

    > More (depends)

## Video2: How to deploy backend code in production
we will use these packages 
1. ExpressJS -> to make a server and listen on the it
2. Mongoose -> to interact with DB
3. dotenv -> to provide the variables

### Steps
1. Make a empty node application
    > npm init -> create a package.json file, It only covers the most common file

    > create entry file (Index.js)

    > change the script in the package.json

2. Install Exprees
    > npm i express

    > npm i dotenv

3. Go to index.js
    > import the express and dotenv module

    > create a app using express object

    > provide a port to listen by server using '.env' file
    - process.env.PORT (variable name)

    > provide the routes and how to handle the request.

    > start listening on that port

## Video3: How to connect frontend and backend in JS.
Two ways to assemble all JS files
1. CommonJS => use the 'require' statement => code will come synchronously
2. ModuleJS => use the 'import' statement => code will come Asynchronously

- How to use import statement in your code
    > go to package.json file 

    > insert "type" : "module"; before scripts

3. created a simple backend and start the server.
4. create a frontend thorugh "vite"
    > npm create vite@latest .
    - creates the file structure on the same directory

    > npm i 

    > npm run dev

    > write your code in app.jsx

    > Install a package "Axios"
    - npm i axios 
    - This library is written for making web request 
    efficiently and how to handle them professionaly.
    > import axios from "axios" in app.jsx

    > make a get request through axios on the backend url to fetch some data. 

### CORS(Cross-Origin Resource sharing)
It's a browser's in-built security system to prevent resource sharing from different origin.

How to remove that CORS error? So that our frontend can interact with backend. 
<!-- 1. whitelist the frontend url in backend -->
2. follow the "standard url" in backend in app.get
3. change that url in frontend also
4. No need to write full url (http://localhost:3000/api/jokes) in frontend for making request, instead you can write like 
- /api/jokes, or
- /api/v1/jokes
5. we can implement 4th step and remove CORS error using "proxy"
- How to use proxy in Vite?
    > go to "vite.config.js"
    
    > add proxy in the server
- When you add proxy in the vite.config.js, you basically telling the vite that any outgoing request which has the word (/api), automatically append the baseURL (http://localhost:5000). 
------------------------------ AND -------------------------------
- Proxy not only adds the baseURL with the request but also make your server believe that this request is coming from the proxy URL. So it automatically handles the CORS error.

- toh hamari vite application khi bhi chal rhi ho par hamare server ko kya lagega ki request kaha se aa rhi hai same url se jispe server chal rha hai.

## Video5: Data modelling for backend with mongoose.
### Phase1 : Theory
- sabse pehle ye dhyan mai rakho ki user se kya-2 info/data leke db mai store karne wale ho. 
- Always start with your data structure
- draw the screen from where you are taking data to save in the DB(Register)
- create your data models using "mongoose"

### Phase2 : Practical
- Install => npm i mongoose
- How does mongoose make models and export them?

    > import mongoose from "mongoose"

    > const userSchema = new mongoose.Schema({}, {})

    > export const User = mongoose.model("User", userSchema)
        
        > 'model' asks two question 
            1. kya naam se model banana hai
            2. kis schema ke basis pe banana hai model ko

- You can store the images in your DB(mongoDB) in buffer format, but you should not do it, because it'll make the DB very heavy and DB are not designed for storing buffer items(images, videos, PDF).

- so, usually buffer items are stored in your own server in a different folder and folder's public URL is taken 
- OR
- Use 3rd party service like AWS => store the image in their bucket and their SDK(API) will return you a Public URL and you store that URL in your DB
        
## Video7: How to setup a professional backend project?

- [Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

- How to store the images?

    > first user will upload images

    > for short period of time you'll keep that image on your server

    > then you upload that image on 3rd party service(cloudinary, AWS)
        
- make a empty file ".gitkeep" in your empty folder

### Project Setup

1. Create a "temp" folder inside the "public" folder
2. ".gitignore" file => gitignore generators(node)
3. ".env" file => whenever we push code into production the env variables are picked from system not files
4. "src" folder => keep your complete directory structure in "src"
5. go to "src" => "app.js", "constants.js", "index.js"

    > Mkdir src

    > cd. > index.js/app.js/constants.js

6. make changes in the "package.json"

    > type: module

    > install nodemon 
        
        - npm i -D nodemon
        - scripts > "dev": "nodemon src/index.js"

7. create folders in "src"
- controllers
- db => connect database
- middlewares 

    > koi code aapko in b/w run karana hai. 

    > aapke paas koi request ayi, vo request server fullfill kare usse pehle hi mai beech mai checking lagana chahata hu toh wo middleware ke anadar karta hu.
- models
- routes
- utils => file upload, send mail, token lena/dena

8. Install "Prettier"

    > npm i -D prettier

    > create ".prettierrc" file

    > add settings in that file

    > create ".prettierignore" file => kis-2 mai file mai mujhe prettier ko implement nhi karna hai

    > add files in ".prettierignore"

## Video8: How to connect DB in MERN?

- mongodb atlas

    > mongodb sub-service where they provide online DB
    1. create Organization
    2. create project
    3. create cluster(DB)

    > 'mongodb' mai enter karne ke liye specially "atlas" ke thorugh you need 3 things 
    1. your IP address should have permission to enter in the DB => go to Network Access
    2. correct username and password => go to Database Access
    3. you should have the MONGODB_URI/URL(string) of the database/cluster => will get it when connecting to the cluster

1. go to .env and add

    > PORT

    > MONGODB_URI

2. go to "src" and add DB name in the "constants.js"
    > export const DB_NAME = "DB_NAME"

3. Approach to connect DB

    > create a "DB" folder

    > write my DB connection function in that folder
    
    > import that function in my "index.js" and execute it. 

4. install express, mongoose, dotenv

5. Two things to remember before connecting to DB
- DB se baat karne mai problem hoti hai(try/catch)
- DB se baat karne mai time lagta hai(async/await)

### Steps to connect to DB 
1. Not so good approach

    > import 'mongoose' in index.js

    > import "DB_NAME" in index.js

    > write a function to connect to DB

    > import "express" in index.js

    > check if our "express" app is able to talk to our DB or not

    > start listening through "express" 

2. Good approach

    > create a "index.js" in /src/db

    > import 'mongoose' in index.js

    > import "DB_NAME" in index.js

- Note: "nodeJS" gives you access of "process". Our current application is running on a process and we give reference of that process.

    > write a function to connect to DB

- Note: when you connect to a DB, mongoose will return you an "object"
    
    > export the function

    > import in "index.js" file and execute it.

- Make sure that your environment variables are available to every file as soon as you deploy your code. Steps are given below.

    > import dotenv in index.js
    
    > dotenv.config({
        path: '.env'
        })

    > "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"

## Video9: Custom api response and error handling

- import express in app.js, create app, export it
- go to "index.js"
- import "app"
- start listening to port through "app"

- EXPRESS (Request, Response)

    > req.params => URL se jab bhi koi data ata hai vo "req.params" se hi ata hai

    > req.body => data can come in different forms like (forms, json, etc.)

    > req.cookies => 

- app.use() => to use middlewares or configuration ke liye use ata hai.

1. install cookie-parser, cors
2. import cookieParser and cors in app.js
3. configure cors using app.use()
4. configure express for incoming data from frontend. 
5. configure cookieParser.

- cookieParser: I can access user's browser cookies and also set them in user's browser from my server.

- Middleware: when a user try to access any resource from our server, we check if that user is eligible or not before letting him access that resource. So, this inbetween checking is called middleware.

6. create a routeHandler function (asyncHandler)
7. create custom error, and response for any request and response


## Video10: User and video model with hooks and JWT

- Objective
    > inject plugin in video model

    > write advance level aggregation pipeline

1. Create User and Video model
2. for "watchHistory" in User model
- install "mongoose-aggregate-paginate-v2" package
    > it allows to write aggregation queries

    > it is used as a plugin

3. import it in "video.model.js"
4. before exporting the Video model use this package, now we can write aggregation queries
    > add as a plugin thorugh videoSchema using "plugin" hook of mongoose

5. install "bcrypt"
    > A library to help you hash passwords.

6. install "jsonwebtoken"
    > [to understand jwt](https://jwt.io/) 
    
    > tokens are made using cryptographic algos

    > it has three parts: header, payload, verify Signature

7. import "bcrypt" and "jwt" in User model
8. now encrypt the password using "pre" hook of mongoose in "User" model
    > It is a prebuilt middleware: jaise hi aapka data save hone jaa rha hoga, just use pehle ise run karwa sakte ho(in our case encrypt the password)

9. make custom method to check/validate the password using "bcrypt"

10. "jwt"
- it is a bearer token
- bearer token: whoever has this token will recieve the data

11. go to .env file
    > ACCESS_TOKEN_SECRET= random complex string 

    > ACCESS_TOKEN_EXPIRY= life time

    > REFRESH_TOKEN_SECRET

    > REFRESH_TOKEN_EXPIRY= more life time than access token

12. REFRESH_TOKEN is stored in DB not ACCESS_TOKEN, both are "jwt" tokens
13. write methods to generate access and refresh tokens

## Video11: How to upload file in backend | Multer

- file handling is backend work not frontend
- Express does not have file uploading capabilities directly
- file uploading is not done on your own server
- it is kept as a utility and same concept applies to video, pdf, etc.
- wherever you need it, inject it as a middleware

- Services: cloudinary, "multer" package
    > npm i multer cloudinary

- Strategy:
    1. user se file upload karwaenge - "multer" ke thorugh hi file upload hoti hai direct cloudinary nhi hota hai
        - cloudinary aap se file leti hai aur apne server pe upload kar deti hai
        - we will keep the file on our local server temporarily

    2. then using cloudinary we take that file from local storage and upload on cloudinary server.

1. create a utility "cloudinary.js"
2. import cloudinary in "cloudinary.js"
3. import fs(file system) 
- no need to install the "fs" library, this comes with nodeJS, helps in read, write, remove the file
- we need local path from "fs"
4. configure cloudinary
- this configuration allows you to upload the file on cloudinary

5. create a method "uploadOnCloudinary"
- pass the local file path in this method and it will upload the file 
- if successfully upload ho gyi toh local file ko unlink kar dunga from fs
- you'll get the response after uploading the file on cloudinary
- print the response and read it

6. We'll make a middleware using multer
- we can directly use multer but,
- we'll use this as a middleware, so that we can inject it wherever we want file uploading feature.

<!-- this will solve the "localFilePath" problem -->
7. create a file "multer.middleware.js"
<!-- Read about multer for better understanding -->
- [Understand multer](https://github.com/expressjs/multer)
1. import "multer"
2. use multer.diskStorage
3. "diskStorage" will return the "localFilePath"
- [Read about "file" from multer docs]()
- try to change the filename as per your need (usecase: if muliple user upload file with same name)

## Video13: Guide for router and controller 

- start writing controllers and routes

1. create "user.controller.js" and write your methods/functionalities related to user 
- create "userRegister" in "user.controller.js" and export it

2. we will create routes for user in "routes" folder 
- create router in "user.routes.js" and export it

3. import "router" in "app.js"
4. In "app.js" redirect the user to "routes" file and from there handle request and redirect it to "controllers".
- we cannot use "app.get()", because router ko hum alag nikal ke le gye hai, toh ab router ko laane ke liye middleware lana padega
- hence, we'll do "app.use()" to redirect all the request related to user to "user.routes.js"
- from "user.routes.js", router will direct user/request to the    user.controller.js
- and execute the requested controller in the user.controller.js like
    > /register: userRegister
    > /login: userLogin, etc..



## Video14: Logic Building | Register Controller

1. "User" in user.model.js => It can directly contact DB, kyuki ye mongoose ke through bana hai 

## Video15: How to use postman for backend

- as soon as file gets successfully uploaded on cloudinary, unlink the file from "fs"
- console.log(response): Read it
- console.log(req.body)
- console.log(req.files)

- configure the postman for checking the API
1. create a new collection
2. create environment variables 

## Video16: Access, refresh token, middleware and cookies in backend

### why there are two tokens(Access, refresh)
- Access token short lived and refresh token long lived.

**Access token** : Till the time you have access token, you can access that features or resources which require authentication.

- suppose your login session expires in 15min, now you have to login again through password.
- so to prevent this problem, you use "refresh token"

**Refresh Token** : saved in DB and also given to user

- user will be validated through access token only, which will be given after login

- but user do not have to enter password every time to have the new access token, if he have the refresh token, same as stored in DB, then we give him a new access token. 

**Task** : Using access and refresh token methods will create login, logout

1. write "loginUser" method 
2. write "logoutUser" method using custom middleware








