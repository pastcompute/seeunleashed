pageTitle = "Schools Environment Explorer."
startLat = -34.929
startLon = 138.612

import psycopg2

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

  # Download the rows under our control
  cur = conn.cursor()
  cur.execute("select * from schools where id=%d" % schoolId)

  # This is a little tedious, I haven't had time to find the 'proper' way 
  return cur.fetchone()
