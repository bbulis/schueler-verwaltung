# NodeJS Schülerverwaltung
## Aufgabenstellung
Entwickle eine einfache Webanwendung zur Verwaltung von Schülerinnen und Schülern in node.js, die folgende Funktionen erfüllt:

* Schüler besitzen einen Vornamen, einen Nachnamen, eine Klasse und einen Ausbildungszweig (SYT/MEDT).
* Schüler sollen samt ihren Daten aufgelistet werden können. 
* Schüler sollen neu angelegt und auch gelöscht werden können.

## Verwendete Software
* NodeJS https://nodejs.org/docs/latest-v11.x/api/
* ExpressJS für den Server https://expressjs.com/de/4x/api.html
* Sequelize für die Datenbankverbindung https://sequelize.org/master/
* dotenv für die Setzung der Umgebungsvariablen https://www.npmjs.com/package/dotenv

## Setzen der Umgebungsvariablen
Um die Software lauffähig zu machen muss im Root Verzeichnis ein ``.env`` File erstellt werden.
Dieses muss minimum Folgende Variablen beinhalten:
```
DB_DATABASE=<YOUR-DATABASE>
DB_USER=<YOUR-DB-USER>
DB_PASSWORD=<YOUR-DB-PASSWORD>
DB_HOST=<YOUR-DB-HOST>

PORT=<YOUR-PORT>
```

Zu Beachten ist das die MySQL Datenbank extern gehostet wird. Alle Daten werden in einer Datenbank gesichert. Eine Datenbank ist nicht intergriert.

```
DB_DATABASE=schuelerverwaltung
DB_USER=schuelerUser
DB_PASSWORD=schuelerUser123
DB_HOST=example.com

PORT=3000
```

## Zu beachten

Als Datenbank **MUSS** MySQL verwendet werden. Für andere Datenbanken ist die Verwendung nicht bestimmt. Sollte eine andere Datenbank verwendet werden, so muss die Konfiguration von Sequelize überarbeitet werden. Dies betrifft die Installierten NPM-Pakete und den zu verwendenden Sequelize-Dialect. Hierbei Verweise ich auf die Dokumentation von Sequelize

## Copyright

* Aufgabenstellung von Prof. Christoph Roschger
* Code von Benjamin Bulis