const mysql = require('mysql');
const assert = require('assert')
const util = require('util');


//***** dotenv *****//
require('dotenv').config()
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

describe("Affiche un titre", () => {
    it('should be WOW ShadowLand', async () => {
        const response = await querysql("SELECT article.titre, article.image,article.articleId, utilisateur.pseudo, categorieJeu.categorie, article.contenu FROM utilisateur INNER JOIN article ON utilisateur.utilisateurID = article.utilisateurId INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID WHERE titre ='WoW ShadowLand'")
        const actual = response[0].titre
        const expected = "WoW ShadowLand";
        assert.strictEqual(actual,expected)
    })
})
