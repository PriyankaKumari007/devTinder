Create a repository
Intialize the repo
node_modules, package.json, package-locl.json
Install express
Create a server
Listen to port 7777
Write request handlers for /test, /hello
Install nodemon and update scripts inside package.json
What are dependencies
What is the use of "-g" while npm install
Difference between caret and tilde (^ vs ~)

Intialize git
.gitignore
Create a remote repo on github
Push all code to remote origin
Play with routes and route extensions ex /hello, /, /hello/2, /xyz
Order of the routes matter a lot 
Install Postman app and make a workplace/collection > test API call
Write logic to handle GET, POST, PATCH,DELETE API calls and test them on Post man
Explore routing and use of ? , +, (),* in the routes
Use of regex in routes/a/
Reading the query params in the routes
Reading the dynamic routes

Multiple Route Handler - Play with that code
next()
next function and errors along with res.send()
app.use("/route", rH,[rH2,rH3])
What is middleware? why we need that
Diff btw app.use() and app.all()

mongodb+srv://<db_username>:<db_password>@devtinder.929pjqt.mongodb.net/?appName=DevTinder

Create a free cluster on mongoDb official website
Install mongoose library
Connect your application to the Database "Cnnection String"
Connect to Database before listening to the server
Create a userSchema && userModel
Create signup  API to add data to database
Push some documents using API calls from postman
Error handling using try and catch

Diff between json and JS object
Add the express.json() Middleware to your app
Make your  signup API dynamic to receive data frm end user
Create Delete API and test with POSTMAN
Create PATH API to update user details 
Diff btw PATCH AND PUT API
Explore the Mongoose Doc for Model Methods

Explore schema type options from the doc
add required, default,trim,lowercase,minLength
create a custom validate function
Add default
Add API level validation for each field
DATA Santization
Install validator package
Explore validator library and use validate function for password, email

Validate data in SignUp API
Install bcrypt package
Create PasswordHash using bcrypt and save the user
Create Login API
Compare password and throw errors if email or password is invalid


install cookie-parser
send a dummy cookie to user
create GET /profile API and check if you get the cookie back
install jsonwebtoken
In login API after email and  password validation, create a JWT token and send it to user in cokies
Read the cookies inside your profile API and find the logged in user
userAuth Middleware
Add the userAuth middleware in profile and a new sendConnectionRequest
Set the jwt token and cookies to 7 days



11
Explore tinder APIs
Create a list of all API you can think of in Dev Tinder
Group multiple routes under respective router
Read Doc of express.Router()
Creates routes folder for manageing auth,profile
Import this router in app.js
Create Logout API and test
Create PATCH /profile/edit API
Test all API

12.
Create Connection Request Schema
Send Connection Request API
Proper validation of API
$or query $and query in mongoose
Read about compond index in mongoose doc
why do we need index in DB
What is adv and disadvantage of index