create table raw_zwsa_recyclers ( ID text,Title text,PostCode text,Suburb text,Street_Address text,Postal_Address text,Telephone text,Alt_Telephone text,Fax text,Email text,Website text,Description text,Longitude text,Latitude text,Can_drop_off text,EPA_licence text);
copy raw_zwsa_recyclers from '/home/ubuntu/seeunleashed/data/zwsa-recyclers-6-12-12.csv' header csv;
grant all privileges on table raw_zwsa_recyclers to seeu;
