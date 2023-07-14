const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
// MonGO
mongoose.connect('mongodb+srv://PaoSL:1234@cluster0.0vxw1wo.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

global.loggeddIn = null

//controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const loginoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')

//middleware
const redirectifAuth = require('./middleware/redirectifAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*",(req,res,next) => {
    loggeddIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectifAuth, loginController)
app.get('/register', redirectifAuth, registerController)
app.post('/user/register',redirectifAuth, storeUserController)
app.post('/user/login',redirectifAuth, loginUserController)
app.get('/logout', loginoutController)

app.listen(4000, () => {
    console.log("App listening on port 4000")
})
