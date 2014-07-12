create table recyclers as select id,title,postcode,suburb,street_address,postal_address,telephone,alt_telephone, fax,email,website,description,GeomFromEWKT('SRID=4326; point('||longitude||' '||latitude||')') as geom, can_drop_off,epa_licence from raw_zwsa_recyclers;

