// Import von ExpressJS
const express = require('express');
// Import von Sequelize (Datenbankverbinungssystem)
const Sequelize = require('sequelize');
// Import der Umgebungsvariablen
require('dotenv').config();

// Erstellen von einem ExpressJS Server
const app = express();

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

// Testen der Datenbankverbindung
app.get('/db', (req, res) => {
    sequelize.authenticate().then(() => {
        console.log('DB Works')
    }).catch((err) => {
        console.log('Error: ' + err.toString())
    });
    res.send();
});

/**
 * Erstellen eines Schueler Objektes
 * 4 Felder ( vorname, nachname, klasse, ausbildungszweig )
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

/**
 * Home route
 * Eintrittspunkt wenn man auf die Seite kommt. Dies wird am Client angezeigt
 */
app.get('/', (req, res) => {
    // TODO Render Home Page
});

// Erstellungs route für einen neuen Schueler
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
    let [user, created] = await User.findOrCreate({where: {vorname: vorname, nachname: nachname}, defaults: {klasse: klasse, ausbildungszweig: ausbildungszweig}})

    // TODO return Statment for Validating if Schueler existst and rendering File
});

// Setzen des Ports für den ExpressJS Server
const port = process.env.PORT;

// Hier wird dem Server gesagt auf welchen Port er arbeiten soll und was er als bestätigung ausgeben soll
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
});