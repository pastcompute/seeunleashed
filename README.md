seeunleashed
============

Licenses of mashed up software:

YUI - https://yuilibrary.com/ - BSD License
leaflet - http://leafletjs.com/ - a generic BSD-like open license - redistribution permitted with retention of notice

Licenses of data:

* zerowaste SA recycle locations from data.sa.gov.au
* school locations derived from xxx.PDF from www.sa.gov.au with CC License at bottom of page 

To use on a ubuntu system e.g. a micro AWS instance:

```
sudo apt-get update
sudo apt-get install postgresql-9.3-postgis-2.1 apache2 git vim php5 unzip libapache2-mod-python pgadmin3 python-psycopg2
```

Configure Apache as per http://webpython.codepoint.net/mod_python_psp_apache_configuration.

Copy the following into ```/etc/apache2/site-available/000-default.conf```

```
<Directory />
Options Indexes FollowSymLinks MultiViews
AllowOverride All
Order allow,deny
allow from all
AddHandler mod_python .py
PythonHandler mod_python.publisher | .py
AddHandler mod_python .psp .psp_
PythonHandler mod_python.psp | .psp .psp_
PythonDebug On
PythonAutoReload On
PythonPath "sys.path+['/var/www/html/seeu/libs']"
</Directory>
```

Run
```
sudo a2enmod python
sudo apache2ctl restart

```

I havent had time to sort out the "proper", secure way to install all the Python PSP stuff.
Amongst other outstanding bugs, I couldnt get the PSP and PythonPath directives to work in .htaccess.
Remember, this is just a prototype!


Do the following to setup the database:
```
sudo su postgres
createuser seeu
createdb -O seeu seeudb
psql
alter user seeu with password 'x';
exit
psql seeudb
create extension postgis;
create extension postgis_topology;
create type JSON;
alter table spatial_ref_sys owner to seeu;
grant all privileges on database seeudb to seeu;
```

Do the following to import the base data:
```
cd path-git-working-copy
cd data
sudo su postgres -c bash
import_schools.sh
import_recyclers.sh


Some important notes on Python PSP at http://helpful.knobs-dials.com/index.php/Mod_python_notes#mod_python_and_importing
