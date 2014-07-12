#!/bin/bash
#
# Second stage ETL (extract, transform, load) script to convert school locality data to GIS form
#
# Unfortunately this needs to be run as
#
#   cd data
#   sudo su postgresql bash import_schools.sh

bash raw_import_1.sh schools 002_DECD-Site-Location-Data.csv

psql seeudb <<EOF
select count(*) from schools_raw;
drop table if exists schools;
create table schools as 
select
    id, name, address, suburb, postcode,
    GeomFromEWKT('SRID=4326; point('||lon||' '||lat||')') as geom
from
    schools_raw;
select count(*) from schools;
grant all privileges on table schools to seeu;
;
EOF
