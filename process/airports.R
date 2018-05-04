library("jsonlite")

# Import dataset

airports <- read.csv2("../csv/DataViz_APT.csv",header=TRUE);

airports_FR <- airports[airports$APT_ISO2 == "FR"];

tojson(airports_FR[,c("APT_OACI", "APT_IATA", "APT_NOM", "APT_LAT", "APT_LONG")]);
# Pollution: sum by airport, do that for each year then merge data for all years

# Traffic: get 10 most popular airports by airport by number of passengers
