-- CODE BASE DE DONNEES 

-- CREATION DE LA BASE DE DONNEES
CREATE DATABASE blogGaming;
USE blogGaming;

-- TABLE categorieJeu
CREATE TABLE categorieJeu (
	categorieId INT PRIMARY KEY AUTO_INCREMENT,
    categorie VARCHAR(25),
    image VARCHAR(255), 
    description VARCHAR(255)
);

SELECT * FROM categorieJeu;

INSERT INTO categorieJeu (categorie,description)
VALUES 
('FPS',"Les jeux de tir subjectif sont basés sur une visée et des déplacements ou l'environnement est vu à travers les  ''yeux''  du personnage joué. Cette perspective génère une forte identification, accentuée par des graphismes en trois dimensions."),
('Gestion',"Dans les jeux de gestion, le joueur endosse le rôle d'un personnage qui doit construire et gérer un espace de vie (une ville), de loisir (un parc d'attraction), etc. Les jeux de gestion sont associés aux jeux de guerre dans la segmentation des jeux."),
('MMO',"Jeux de rôle en ligne massivement multi-joueurs. Ce type de jeux exclusivement multijoueurs innove, notamment, par la mise en place d'univers fonctionnant 24 heures sur 24 appelés '' mondes persistants "),
('Plate-forme',"Les jeux de plates-formes sont caractérisés par des sauts d'une plate-forme suspendue à l'autre ou au-dessus d'obstacles, ainsi que divers '' pièges '' tendus au personnage contrôlé par le joueur.");

UPDATE categorieJeu
SET image = 'images/fps.jpg'
WHERE categorieId = 1;

UPDATE categorieJeu
SET image = 'images/gestion.jpg'
WHERE categorieId = 2;

UPDATE categorieJeu
SET image = 'images/mmo.jpg'
WHERE categorieId = 3;

UPDATE categorieJeu
SET image = 'images/plateforme.jpg'
WHERE categorieId = 4;

ALTER TABLE categorieJeu ADD liens VARCHAR(50)

-- TABLE auteur
CREATE TABLE auteur(
auteurId INT PRIMARY KEY AUTO_INCREMENT,
pseudo VARCHAR(20)
);
SELECT auteur.auteurId, auteur.pseudo from auteur;
INSERT INTO auteur(pseudo) VALUES ('ProJecTt');



-- TABLE article
CREATE TABLE article (
	articleId INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(25),
    image VARCHAR(255), 
    contenu VARCHAR(255),
    categorieID INT,
    auteurID INT,
    FOREIGN KEY (categorieID) REFERENCES categorieJeu(categorieId),
    FOREIGN KEY (auteurID) REFERENCES auteur(auteurId)
);

SELECT * FROM article;

SELECT article.titre, article.image,article.articleId, auteur.pseudo, categorieJeu.categorie FROM auteur
INNER JOIN article ON auteur.auteurId = article.auteurID
INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID;

CREATE TABLE utilisateur (
utilisateurID INT PRIMARY KEY AUTO_INCREMENT,
nom VARCHAR(20) NOT NULL,
prenom VARCHAR(20) NOT NULL,
pseudo VARCHAR(25) NOT NULL,
email VARCHAR(30) NOT NULL,
motdepasse VARCHAR(255)NOT NULL
)

SELECT * FROM utilisateur;

SELECT COUNT(*) AS cnt from utilisateur WHERE email = "jean@gmail.com";