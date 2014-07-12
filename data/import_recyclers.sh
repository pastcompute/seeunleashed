#!/bin/bash
#
# Second stage ETL (extract, transform, load) Script to convert Zero Waste recycler data to GIS form
#
# Unfortunately this needs to be run as
#
#   cd data
#   sudo su postgresql bash import_recyclers.sh

bash raw_import_1.sh recyclers zwsa-recyclers-6-12-12.csv

psql seeudb <<EOF
select count(*) from recyclers_raw;
drop table if exists recyclers;
create table recyclers as 
select
    id, title, postcode, suburb, street_address, 
    postal_address, telephone, alt_telephone, fax, email, website, description, 
    GeomFromEWKT('SRID=4326; point('||longitude||' '||latitude||')') as geom, 
    can_drop_off, epa_licence 
from
    recyclers_raw;
select count(*) from recyclers;
grant all privileges on table recyclers to seeu;
EOF
