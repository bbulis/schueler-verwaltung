// Import von ExpressJS
const express = require('express');
const partials = require('express-partials');
// Import von Sequelize (Datenbankverbinungssystem)
const Sequelize = require('sequelize');
// Import der Umgebungsvariablen
require('dotenv').config();

// TODO Implementing EJS for Rendering

// Erstellen von einem ExpressJS Server
const app = express();

// Set View Engine to EJS Rendering
app.set('view engine', 'ejs');
app.set(partials());

/**
 * Aufbau einer Datenbankverbindung
 * Das Objekt kann zum erstellen von Models verwendet werden
 * Dokumentation https://sequelize.org/master/
 */
const sequelize = new Sequelize(process.env.DB_DATABASE,
                                process.env.DB_USER,
                                process.env.DB_PASSWORD,
                                {
                                    host: process.env.DB_HOST,
                                    dialect: 'mysql'
                                }
    );

/**
 * Erstellen eines Schueler Objektes
 * 4 Felder ( vorname, nachname, klasse, ausbildungszweig )
 * Das erste Argument bei sequelize.define ist der Table-Name. So wird dieser Später in der Datenbank lauten
 */
const User = sequelize.define('schueler', {
    vorname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nachname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    klasse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ausbilungszweig: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// Testen der Datenbankverbindung
app.get('/db', (req, res) => {
    sequelize.authenticate().then(() => {
        console.log('DB Works')
    }).catch((err) => {
        console.log('Error: ' + err.toString())
    });
    res.send();
});

app.get('/error', (req, res) => {
    res.render('error', {error: 'Test Error'})
});

/**
 * Wird dieser Endpoint angefragt so wird der Table gelöscht und neu gesetzt.
 * force: true - Table löschen und neu setzten
 * force: false - Table neu setzten. Gelöscht wird nicht. Kann zu Errors führen
 */
app.get('/db/destroy', async (req, res) => {
     try {
         await User.sync({force: true})
     } catch (e) {
         // TODO Render Error when deleting Table
     }
});

/**
 * Home route
 * Eintrittspunkt wenn man auf die Seite kommt. Dies wird am Client angezeigt
 */
app.get('/', async (req, res) => {
    try {
        let schueler = await User.findAll();
    } catch (e) {
        // TODO Render Error when fetching schueler
    }

    res.render('index');

    // TODO Render Table with schueler
    // TODO Render Home Page
});

/**
 * Erstellungs Route für einen neuen Schueler
 */
app.get('/schueler/create', async (req, res) => {
    // Aus dem Request Objekt die notwendigen Informationen herausholen
    let vorname = req.body.vorname;
    let nachname = req.body.nachname;
    let klasse = req.body.klasse;
    let ausbildungszweig = req.body.ausbildungszweig;
    /**
     * Pürfen ob ein Schueler schon vorhanden ist
     * Ist dieser Vorhanden so wird der created auf False gesetzt und kein User zurückgegeben
     */
    try {
        let [user, created] = await User.findOrCreate({where: {vorname: vorname, nachname: nachname}, defaults: {klasse: klasse, ausbildungszweig: ausbildungszweig}})
    } catch (e) {
        // TODO Render Error for creating
    }

    // TODO return Statment for Validating if Schueler existst and rendering File
});

/**
 * Endpoint zum löschen eines Schuelers
 */
app.delete('/schueler/delete', async (req, res) => {
    let vorname = req.body.vorname;
    let nachname = req.body.nachname;
    let klasse = req.body.klasse;

    try {
        await User.destroy({
            where: {
                vorname: vorname,
                nachname: nachname,
                klasse: klasse
            }
        })
    } catch (e) {
        // TODO Render Error for deleting
    }

    // TODO Render for Deleting Schueler
});

// Setzen des Ports für den ExpressJS Server
const port = process.env.PORT;

// Hier wird dem Server gesagt auf welchen Port er arbeiten soll und was er als bestätigung ausgeben soll
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
});