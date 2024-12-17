//Assignment
// read "this."data

class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        //overwrite the current values in Error class
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        // avoid this code
        if (stack){
           this.stack = stack 
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}


// ES6

// class User {
//     constructor(username, email, password){
//         this.username = username
//         this.email = email
//         this.password = password
//     }

//     //method
//     encryptPassword(){
//         return `${this.password}abc`
//     }

//     //method
//     changeUsername(){
//         return `${this.username.toUpperCase()}`
//     }

// }

// const chai = new User("chai", "chai@gmail.com", "123")

// console.log(chai.encryptPassword());
// console.log(chai.changeUsername());

//behind the scene

// function User(username, email, password){
//     this.username = username
//     this.email = email
//     this.password = password
// }

// User.prototype.encryptPassword = function(){
//     return `${this.password}abc`
// }

// User.prototype.changeUsername = function(){
//     return `${this.username.toUpperCase()}`
// }

// const tea = new User("tea", "tea@gmail.com", "456")

// console.log(tea.encryptPassword());
// console.log(tea.changeUsername());



// ********************* INHERITANCE ***************************

// class User {
//     constructor(username){
//         this.username = username
//     }

//     //method
//     logMe(){
//         console.log(`USERNAME IS ${this.username}`);
//     }
// }

// class Teacher extends User{
//     constructor(username, email, password){
//         super(username)
//         this.email = email
//         this.password = password
//     }

//     //method
//     addCourse(){
//         console.log(`A new course was added by ${this.username}`);
//     }
// }

// const chai = new Teacher("prashu", "prashu@gmail.com", "123")
// chai.addCourse()
// chai.logMe() 

// const masalaChai = new User("masalaChai")
// masalaChai.logMe()

// console.log(Teacher instanceof User);



// ********************** staticprop ***************************

// class User{
//     constructor(username){
//         this.username = username
//     }

//     // method
//     logMe(){
//         console.log(`Username: ${this.username}`);
//     }

//     // you don't want to give access of this method to all objects that instantiate from this class.
//     static createId(){
//         return `123`
//     }
// }

// const hitesh = new User("hitesh")
// console.log(hitesh.createId());

// class Teacher extends User{
//     constructor(username, email){
//         super(username)
//         this.email = email
//     }
// }

// const prashu = new Teacher("prashu", "prashu@gmail.com")
// console.log(prashu.createId());