set +v
echo Populating weather DB

 echo
 echo Creating cityWeather Collection
 mongoimport --db weather --collection cityWeather --file jsonFiles/cityFacts.json --type json --jsonArray

echo
sleep