library("jsonlite")

year_max <- 2018;
hauls <- c("CC","MC","LC");
pollutants <- c("CO2","NOX","COVNM","TSP");

setwd("/home/loial/code/dataviz-ata/process");

# Import dataset

airports <- read.csv2("../csv/DataViz2_APT.csv",header=TRUE,na.strings="", stringsAsFactors=FALSE);

airports_FR <- airports[airports$APT_ISO2 == "FR" & airports$APT_IATA != "_nd", ];
airports_FR<- airports_FR[!is.na(airports_FR$APT_ISO2), ];
names(airports_FR) <- c("oaci","iata","name","country","country_name", "zone", "haul", "lat", "long");
airports_FR$nb_destinations <- 0;
# Remove - from airporks names so we can use Angular titlecase pipe
airports_FR$name <- gsub("-"," ",airports_FR$name,fixed=TRUE);

airports_FR_codes <- unique(airports_FR$oaci, na.rm=TRUE);

# Prepare result dataframes
traffics <- data.frame(name=airports_FR_codes);
flights <- data.frame(name=airports_FR_codes);
emissions <- data.frame(name=airports_FR_codes);
for(haul in hauls) {
  for(p in pollutants) {
    emissions[paste0(p,"_",haul)] <- 0;
  }
}

# Pollution: sum by airport, by haul
current_poll <- read.csv2(paste0("../csv/DataViz2_EMI_", year_max, ".csv"),header=TRUE);
for(airport in airports_FR_codes) {
    for(p in pollutants) {
	  for(h in hauls) {
        emissions[emissions$name == airport, paste0(p,"_",h)] <- sum(current_poll[current_poll$APT == airport & current_poll$FSC == h, p], na.rm=TRUE);  
	  }
	}
}
  
top10 <- data.frame(name = airports_FR_codes, dest_1 = '', pax_1 = 0, dest_2 = '', pax_2 = 0,
           dest_3 = '', pax_3 = 0, dest_4 = '', pax_4 = 0, dest_5 = '', pax_5 = 0, dest_6 = '', pax_6 = 0,
		   dest_7 = '', pax_7 = 0, dest_8 = '', pax_8 = 0,dest_9 = '', pax_9 = 0, dest_10 = '', pax_10 = 0, stringsAsFactors=FALSE); 
for(i in c(1:10)) {
 levels(top10[paste0("dest_",i)]) <- levels(airports$APT_NOM);
}

for(i in c(1990:year_max)) {
# Traffic: get 10 most popular airports by airport by number of passengers
  # Also get total passenger number per airport per year, broken down by flight haul
  traffics[paste0("LC_",i)] <- 0;
  traffics[paste0("MC_",i)] <- 0;
  traffics[paste0("CC_",i)] <- 0;
  flights[paste0("LC_",i)] <- 0;
  flights[paste0("MC_",i)] <- 0;
  flights[paste0("CC_",i)] <- 0;
  
  current_traffic <- read.csv2(paste0("../csv/DataViz2_TRA_",i,".csv"),header = TRUE);
  for(airport in airports_FR_codes) {
	  for(haul in hauls) {
	    traffics[traffics$name == airport, paste0(haul,"_",i)] <- sum(current_traffic[current_traffic$DEP == airport & current_traffic$FSC == haul, "PAX_FS"], na.rm = TRUE);
		flights[flights$name == airport, paste0(haul,"_",i)] <- sum(current_traffic[current_traffic$DEP == airport & current_traffic$FSC == haul, "NVOLS"], na.rm = TRUE);
	  }
  
  
    # 2016: special treatment
	if(i == year_max) {
	# Count number of destinations
	  arrival_airports <- unique(current_traffic[current_traffic$DEP == airport, "ARR"], na.rm = TRUE);
      airports_FR[airports_FR$oaci == airport, "nb_destinations"] <- length(arrival_airports);
	  
	  # Make a top10
	   if(length(arrival_airports) > 0) {
	   top10_df <- data.frame(name = arrival_airports);
	   top10_df$pax <- 0;
	   for(arr in arrival_airports) {
	     top10_df[top10_df$name == arr, "pax"] <- sum(current_traffic[current_traffic$DEP == airport & current_traffic$ARR == arr, "PAX_FS"], na.rm = TRUE);
	   }
	   top10_df <- top10_df[order(-top10_df$pax), ];
	   for(j in c(1:10) ) {
	   if(j <= nrow(top10_df)) { # Because some airports may have less than 10 destinations... 
	    top10[top10$name == airport, paste0("dest_",j)] = airports[as.character(airports$APT_OACI) == as.character(top10_df[j,"name"]), "APT_NOM"];
        top10[top10$name == airport, paste0("pax_",j)] = top10_df[j,"pax"];
		}
	  }
    }
    }
  }  
  
}


## Final step: export files
writeLines(toJSON(airports_FR),"airports2.ts");

writeLines(toJSON(top10),"top102.ts");
writeLines(toJSON(traffics),"passengers2.ts");
writeLines(toJSON(emissions),"emissions2.ts");
writeLines(toJSON(flights),"flights2.ts");

## Utility functions from Rosetta Code, covered by GNU FDL

dms_to_rad <- function(d, m, s) (d + m / 60 + s / 3600) * pi / 180
 
great_circle_distance <- function(lat1, long1, lat2, long2) {
   a <- sin(0.5 * (lat2 - lat1))
   b <- sin(0.5 * (long2 - long1))
   12742 * asin(sqrt(a * a + cos(lat1) * cos(lat2) * b * b))
}
