#!/bin/bash
#
# First stage (extract, transform, load) script to grab data.sa.gov.au data CSV set such as from Zero Waste and convert into
# postgresql and transform into PopstgresGIS
#
# $1 - table name
# $2 - input CSV file with headers
#
# Creates table name_raw, need to then do more to get it in GIS form
#
# Unfortunately this needs to be run as
#
#   cd data
#   sudo su postgresql bash raw_import_1.sh
#

TABLE="$1"
CSV="$2"

# Make sure filename and table have no spaces or this will probably fail


psql seeudb <<EOF 
drop table if exists ${TABLE}_raw; 
create table ${TABLE}_raw ( `head -1 $CSV | sed -e 's/\?//g' -e 's/ /_/g' -e 's/,/ text,/g' -e 's/$/ text/'`);
copy ${TABLE}_raw from '`pwd`/$CSV' csv header;
grant all privileges on table ${TABLE}_raw to seeu;
EOF
 
# We now have a table that can be converted to an actual table with GIS data
