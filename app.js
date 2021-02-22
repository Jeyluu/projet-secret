const express = require('express')
const mysql = require('mysql');
const methodOverride = require('method-override');
const path = require('path');
const util = require('util');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLsession = require('express-mysql-session');
//***** port *****//
const port = 3001;

//***** dotenv *****//
require('dotenv').config()

//***** express *****//
const app = express();

//***** override *****//
app.use(methodOverride('_method'))

//***** mysql - session *****//
var sessionStore = new MySQLsession({}, db)

//***** mysql *****//
const db = mysql.createConnection(
    {

        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,

    }
)


db.connect(
    (err) => {
        if (err) { throw err }
        console.log('Connecté au serveur MySQL');
    }
)

//***** declare la variable mysql *****//
global.querysql = util.promisify(db.query).bind(db)

//***** express-session *****//

app.use(session({
    name: 'cookie-final',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxage: 1000 * 60 * 60 * 24 // le cookie du 24heures
    }
}))

//***** les messages flash d'erreurs ou d'alerte *****//
app.use(flash())

//***** bodyparser *****//
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//***** ejs *****//
app.set('view engine', 'ejs');

//***** dossier static public *****//
app.use(express.static(path.join(__dirname, 'public')));


// ------------------------------------------- Chargement des routes -------------------------------------------//

//***** ecoute du port *****//
app.listen(port, () => {
    console.log(`Vous êtes bien connecté sur le port ${port}, le ${new Date().toLocaleString()} `);
})