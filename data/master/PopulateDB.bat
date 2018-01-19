ECHO OFF
ECHO Initializing weather DB with master data...

 ECHO:
 ECHO "Creating cityWeather Collection..."
 mongoimport --db weather --collection cityWeather --file jsonFiles\cityFacts.json --type json --jsonArray

ECHO:
PAUSE