library("jsonlite")

year_max <- 2016;

# Import dataset

airports <- read.csv2("../csv/DataViz_APT.csv",header=TRUE);

airports_FR <- airports[airports$APT_ISO2 == "FR"];

tojson(airports_FR[,c("APT_OACI", "APT_IATA", "APT_NOM", "APT_LAT", "APT_LONG")]);

airports_FR_codes <- unique(airports_FR["APT_OACI"]);

for(i in c(2000:year_max)) {
# Pollution: sum by airport, do that for each year then merge data for all years
  current_poll <- read.csv2(paste0("../csv/DataViz_EMI_",i,".csv"),header=TRUE);

}

for(i in c(1990:year_max)) {
# Traffic: get 10 most popular airports by airport by number of passengers
  # Also get total passenger number per airport per year, broken down by flight haul
  current_traffic <- read.csv2(paste0("../csv/DataViz_TRA_",i,".csv"),header=TRUE);
  
}

