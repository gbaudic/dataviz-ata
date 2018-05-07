library("jsonlite")

year_max <- 2016;
hauls <- c("CC","MC","LC");
pollutants <- c("CO2","NOX","COVNM","TSP");

# Import dataset

airports <- read.csv2("../csv/DataViz_APT.csv",header=TRUE);

airports_FR <- airports[airports$APT_ISO2 == "FR" && airports$APT_IATA != "_nd"];
names(airports_FR) <- c("oaci","iata","name","country","country_name", "zone", "haul", "lat", "long");
airports_FR$nb_destinations <- 0;
# Remove - from airporks names so we can use Angular titlecase pipe
airports_FR$name <- gsub("-"," ",airports_FR$name,fixed=TRUE);

airports_FR_codes <- unique(airports_FR["oaci"]);

# Prepare result dataframes
traffics <- data.frame(name=airports_FR_codes);
flights <- data.frame(name=airports_FR_codes);
emissions <- data.frame(name=airports_FR_codes);
for(haul in hauls) {
  for(p in pollutants) {
    emissions[paste0("CO2_",haul)] <- 0;
  }
}

# Pollution: sum by airport, by haul
  current_poll <- read.csv2(paste0("../csv/DataViz_EMI_",year_max,".csv"),header=TRUE);
  for(airport in airports_FR_codes) {
    for(p in pollutants) {
	  for(h in hauls) {
	  emissions[paste0(p,"_",h)][emissions$name == airport] <- sum(current_poll[p][current_poll$APT == airport && current_poll$FSC == h], na.rm=TRUE);
	  
	  }
	}
  }
  
top10 <- data.frame(name = airports_FR_codes, dest_1 = '', pax_1 = 0, dest_2 = '', pax_2 = 0,
           dest_3 = '', pax_3 = 0, dest_4 = '', pax_4 = 0, dest_5 = '', pax_5 = 0, dest_6 = '', pax_6 = 0,
		   dest_7 = '', pax_7 = 0, dest_8 = '', pax_8 = 0,dest_9 = '', pax_9 = 0, dest_10 = '', pax_10 = 0); 

for(i in c(1990:year_max)) {
# Traffic: get 10 most popular airports by airport by number of passengers
  # Also get total passenger number per airport per year, broken down by flight haul
  traffics[paste0("LC_",i)] <- 0;
  traffics[paste0("MC_",i)] <- 0;
  traffics[paste0("CC_",i)] <- 0;
  flights[paste0("LC_",i)] <- 0;
  flights[paste0("MC_",i)] <- 0;
  flights[paste0("CC_",i)] <- 0;
  
  current_traffic <- read.csv2(paste0("../csv/DataViz_TRA_",i,".csv"),header = TRUE);
  for(airport in airports_FR_codes) {
	  for(haul in hauls) {
	    traffics[paste0(haul,"_",i)][traffics$name == airport] <- sum(current_traffic$PAX_FS[current_traffic$DEP == airport && current_traffic$FSC == haul], na.rm = TRUE);
		flights[paste0(haul,"_",i)][flights$name == airport] <- sum(current_traffic$NVOLS[current_traffic$DEP == airport && current_traffic$FSC == haul], na.rm = TRUE);
	  }
  
  
    # 2016: special treatment
	if(i == year_max) {
	# Count number of destinations
      airports_FR$nb_destinations[airports_FR$oaci == airport] <- length(unique(current_traffic$ARR[current_traffic$DEP == airport]));
	  
	  # Make a top10
	  my_destinations <- current_traffic[current_traffic$DEP == airport];
	  my_destinations <- current_traffic[order(-my_destinations$PAX_FS), ];
	  for(j in c(1:10) ) {
	  if(j <= length(my_destinations)) { # Because some airports may have less than 10 destinations... 
	    top10[paste0("dest_",j)][top10$name == airport] = airports_FR$name[airports_FR$oaci == my_destinations$ARR[j]];
		top10[paste0("pax_",j)][top10$name == airport] = my_destinations$PAX_FS[j];
		}
	  }
    }
  }
  
  
}


## Final step: export files
print(tojson(airports_FR));

print(tojson(top10));
print(tojson(traffics));
print(tojson(emissions));
print(tojson(flights));

## Utility functions from Rosetta Code, covered by GNU FDL

dms_to_rad <- function(d, m, s) (d + m / 60 + s / 3600) * pi / 180
 
great_circle_distance <- function(lat1, long1, lat2, long2) {
   a <- sin(0.5 * (lat2 - lat1))
   b <- sin(0.5 * (long2 - long1))
   12742 * asin(sqrt(a * a + cos(lat1) * cos(lat2) * b * b))
}
