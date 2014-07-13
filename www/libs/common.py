pageTitle = "Schools Environment Explorer."
startLat = -34.929
startLon = 138.612

import psycopg2

# This is very quick and very dirty and very ugly.
# We should at least make an object and cache the connection.

# What I was going to do:
#
# Calculate Distance form school to nearest recycle center using Postgis
# Return lat lon of recycle center
# Display on map
# And a whole lot of other stuff
#
# But that did not happen as too many other things needed to be done, including helping other people :-)
# 


def dbTestConnection():
  conn = psycopg2.connect(database="seeudb", user="seeu", password="seeme", host="localhost")
  cur = conn.cursor()

  # Query the database and obtain data as Python objects
  cur.execute("select name from schools")
  return cur.fetchone()[0]

def dbGetSchoolsNames():
  conn = psycopg2.connect(database="seeudb", user="seeu", password="seeme", host="localhost")

  # Download the rows under our control
  cur = conn.cursor()
  cur.execute("select name from schools")

  # This is a little tedious, I haven't had time to find the 'proper' way 
  return [x[0] for x in cur.fetchall()]

def dbGetSchoolsRows():
  conn = psycopg2.connect(database="seeudb", user="seeu", password="seeme", host="localhost")

  # Download the rows under our control
  cur = conn.cursor()
  cur.execute("select * from schools")

  # This is a little tedious, I haven't had time to find the 'proper' way 
  return cur.fetchall()

def dbGetSchoolFromId(schoolId):
  conn = psycopg2.connect(database="seeudb", user="seeu", password="seeme", host="localhost")

  # This is a real hack because we are out of time
  # This violates properly forming python psycopg queries
  # We dont check errors in input and a multitude of other things
  cur = conn.cursor()
  cur.execute("select * from schools where id='%s'" % schoolId)

  # This is a little tedious, I haven't had time to find the 'proper' way 
  return cur.fetchone()


# More copy and paste quick hacks
# These should use postgis but I ran out of time to learn it
def dbGetSchoolLatFromSchool(schoolId):
  conn = psycopg2.connect(database="seeudb", user="seeu", password="seeme", host="localhost")
  cur = conn.cursor()
  cur.execute("select lat from schools where id='%s'" % schoolId)
  return cur.fetchone()

def dbGetSchoolLonFromSchool(schoolId):
  conn = psycopg2.connect(database="seeudb", user="seeu", password="seeme", host="localhost")
  cur = conn.cursor()
  cur.execute("select lon from schools where id='%s'" % schoolId)
  return cur.fetchone()

