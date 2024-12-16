## Roadmap of Backend
### Libraraies used in Javascript
Express -> used for routing purpose
mongoose -> used for interacting with database

### A JS based backend
- we handle these 
    > Data
    > File
    > Third party (API)

### Directory structure for backend
- src
- files
    > index: DB connects
    > app: configuration, cookies, urlencode
    > constants: enums, DB-name
- folders
    > DB: contains actual code jo DB se connect karta hai 
    > Models: contains data structure/schema/models
    > Controllers: functionality
    > Routes: 
    > Middlewares: 
    > Utils: code snippets that will be used repeatedly in a project
    > More (depends)

## Video2: How to deploy backend code in production

we will use two packages 
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
        > process.env.PORT (variable name)
    > provide the routes and how to handle the request.
    > start listening on that port

## Video3: How to connect frontend and backend in JS.

- Two ways to assemble all JS files
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
    - This library is written for making web request efficiently and how to handle them professionaly.
    > import axios from "axios" in app.jsx
    > make a get request through axios on the backend url to fetch some data. 

### CORS(Cross-Origin Resource sharing)
- It's a browser's in-built security system to prevent resource sharing from different origin.

How to remove that CORS error? So that our frontend can interact with backend. 
<!-- 1. whitelist the frontend url in backend -->
2. follow the "standard url" in backend in app.get
3. change that url in frontend also
4. No need to write full url (http://localhost:3000/api/jokes) in frontend for making request, instead you can write like 
- /api/jokes
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
        

