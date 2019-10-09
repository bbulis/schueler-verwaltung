# NodeJS Schülerverwaltung
## Aufgabenstellung
Entwickle eine einfache Webanwendung zur Verwaltung von Schülerinnen und Schülern in node.js, die folgende Funktionen erfüllt:

* Schüler besitzen einen Vornamen, einen Nachnamen, eine Klasse und einen Ausbildungszweig (SYT/MEDT).
* Schüler sollen samt ihren Daten aufgelistet werden können. 
* Schüler sollen neu angelegt und auch gelöscht werden können.

## Verwendete Software
* NodeJS
* ExpressJS für den Server
* Sequelize für die Datenbankverbindung
* dotenv für die Setzung der Umgebungsvariablen

### Setzen der Umgebungsvariablen
Um die Software lauffähig zu machen muss im Root Verzeichnis ein ``.env`` File erstellt werden.
Dieses muss minimum Folgende Variablen beinhalten:
```
DB_DATABASE=<YOUR-DATABASE>
DB_USER=<YOUR-DB-USER>
DB_PASSWORD=<YOUR-DB-PASSWORD>
DB_HOST=<YOUR-DB-HOST>

PORT=<YOUR-PORT>
```

Zu Beachten ist das die MySQL Datenbank extern gehostet wird. Alle Daten werden in einer Datenbank gesichert.
#### Es ist nur MySQL zu verwenden. Verwendung von anderen Datenbank auf eigene Gefahr

Beispiel Konfiguration
```
DB_DATABASE=schuelerverwaltung
DB_USER=schuelerUser
DB_PASSWORD=schuelerUser123
DB_HOST=example.com

PORT=3000
```

## Copyright
* Aufgabenstellung von Prof. Christoph Roschger
* Code von Benjamin Bulis