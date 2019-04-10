#!/usr/bin/python

import json
from pymongo import MongoClient

with open('fresh_data/aggragate_arrest.json') as data_file:
    aggragate_arrests = json.load(data_file)

with open('fresh_data/aggragate_vawa.json') as data_file:
    aggragate_vawa = json.load(data_file)

with open('fresh_data/aggragate_crime.json') as data_file:
    aggragate_crime = json.load(data_file)

with open('fresh_data/aggragate_discipline.json') as data_file:
    aggragate_discipline = json.load(data_file)

with open('fresh_data/aggragate_arrest_old.json') as data_file:
    aggragate_arrests_old = json.load(data_file)

with open('fresh_data/aggragate_vawa_old.json') as data_file:
    aggragate_vawa_old = json.load(data_file)

with open('fresh_data/aggragate_crime_old.json') as data_file:
    aggragate_crime_old = json.load(data_file)

with open('fresh_data/aggragate_discipline_old.json') as data_file:
    aggragate_discipline_old = json.load(data_file)

client = MongoClient("ds233581.mlab.com", 33581)
#client = MongoClient("mongodb://admin:HuskyHacks2016@ds033337.mongolab.com:33337/stat-hacks-d")
db = client['seeing-clerly-db']
db.authenticate('admin', 'password2')
coll = db['Locations']

for i in aggragate_crime:
  print i
  aggragate_entry = {'CrimeStats':{}}

  aggragate_vawa_val = aggragate_vawa[i]
  aggragate_arrests_val = aggragate_arrests[i]
  aggragate_crime_val = aggragate_crime[i]
  aggragate_discipline_val = aggragate_discipline[i]

  aggragate_entry['Name'] = aggragate_crime_val['INSTNM'].upper()
  aggragate_entry['GOV_ID'] = i
  aggragate_entry['City'] = aggragate_crime_val['City'].upper()
  aggragate_entry['Population'] = aggragate_crime_val['Total']
  aggragate_entry['Campus'] = aggragate_crime_val['BRANCH'].upper()
  aggragate_entry['State'] = aggragate_crime_val['State'].upper()


  aggragate_entry['CrimeStats']['Murder'] = {}
  aggragate_entry['CrimeStats']['Statutory Rape'] = {}
  aggragate_entry['CrimeStats']['Rape'] = {}
  aggragate_entry['CrimeStats']['Robbery'] = {}
  aggragate_entry['CrimeStats']['Burglary'] = {}
  aggragate_entry['CrimeStats']['Arson'] = {}
  aggragate_entry['CrimeStats']['Motor Vehicle Theft'] = {}
  aggragate_entry['CrimeStats']['Fondling'] = {}
  aggragate_entry['CrimeStats']['Dating Violence'] = {}
  aggragate_entry['CrimeStats']['Incest'] = {}
  aggragate_entry['CrimeStats']['Domestic Violence'] = {}
  aggragate_entry['CrimeStats']['Stalking'] = {}
  aggragate_entry['CrimeStats']['Weapon Referral'] = {}
  aggragate_entry['CrimeStats']['Drug Referral'] = {}
  aggragate_entry['CrimeStats']['Alcohol Referral'] = {}
  aggragate_entry['CrimeStats']['Weapon Arrests'] = {}
  aggragate_entry['CrimeStats']['Drug Arrests'] = {}
  aggragate_entry['CrimeStats']['Alcohol Arrests'] = {}
  aggragate_entry['CrimeStats']['Aggravated Assault'] = {}


  for year in ['15', '16', '17']:
    final_stat = 'MURD'+year
    aggragate_entry['CrimeStats']['Murder']["20" + str(year)] = aggragate_crime_val[final_stat]

    if (year != '12' and year != '13'):
      final_stat = 'STATR'+year
      aggragate_entry['CrimeStats']['Statutory Rape']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'ROBBE'+year
    aggragate_entry['CrimeStats']['Robbery']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'RAPE'+year
    aggragate_entry['CrimeStats']['Rape']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'INCES'+year
    aggragate_entry['CrimeStats']['Incest']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'AGG_A'+year
    aggragate_entry['CrimeStats']['Aggravated Assault']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'BURGLA'+year
    aggragate_entry['CrimeStats']['Burglary']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'ARSON'+year
    aggragate_entry['CrimeStats']['Arson']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'VEHIC'+year
    aggragate_entry['CrimeStats']['Motor Vehicle Theft']["20" + str(year)] = aggragate_crime_val[final_stat]

    if (year != '12' and year != '13'):
      final_stat = 'FONDL'+year
      aggragate_entry['CrimeStats']['Fondling']["20" + str(year)] = aggragate_crime_val[final_stat]

    final_stat = 'DATING'+year
    aggragate_entry['CrimeStats']['Dating Violence']["20" + str(year)] = aggragate_vawa_val[final_stat]

    final_stat = 'DOMEST'+year
    aggragate_entry['CrimeStats']['Domestic Violence']["20" + str(year)] = aggragate_vawa_val[final_stat]

    final_stat = 'STALK'+year
    aggragate_entry['CrimeStats']['Stalking']["20" + str(year)] = aggragate_vawa_val[final_stat]

    final_stat = 'WEAPON'+year
    aggragate_entry['CrimeStats']['Weapon Referral']["20" + str(year)] = aggragate_discipline_val[final_stat]

    final_stat = 'DRUG'+year
    aggragate_entry['CrimeStats']['Drug Referral']["20" + str(year)] = aggragate_discipline_val[final_stat]

    final_stat = 'LIQUOR'+year
    aggragate_entry['CrimeStats']['Alcohol Referral']["20" + str(year)] = aggragate_discipline_val[final_stat]

    final_stat = 'WEAPON'+year
    aggragate_entry['CrimeStats']['Weapon Arrests']["20" + str(year)] = aggragate_arrests_val[final_stat]

    final_stat = 'DRUG'+year
    aggragate_entry['CrimeStats']['Drug Arrests']["20" + str(year)] = aggragate_arrests_val[final_stat]

    final_stat = 'LIQUOR'+year
    aggragate_entry['CrimeStats']['Alcohol Arrests']["20" + str(year)] = aggragate_arrests_val[final_stat]

  aggragate_vawa_val_old = aggragate_vawa_old.get(i, {})
  aggragate_arrests_val_old = aggragate_arrests_old.get(i, {})
  aggragate_crime_val_old = aggragate_crime_old.get(i, {})
  aggragate_discipline_val_old = aggragate_discipline_old.get(i, {})

  if aggragate_vawa_val_old:
    for year in ['12', '13', '14']:
      final_stat = 'MURD'+year
      aggragate_entry['CrimeStats']['Murder']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      if (year != '12' and year != '13'):
        final_stat = 'STATR'+year
        aggragate_entry['CrimeStats']['Statutory Rape']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'ROBBE'+year
      aggragate_entry['CrimeStats']['Robbery']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'RAPE'+year
      aggragate_entry['CrimeStats']['Rape']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'INCES'+year
      aggragate_entry['CrimeStats']['Incest']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'AGG_A'+year
      aggragate_entry['CrimeStats']['Aggravated Assault']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'BURGLA'+year
      aggragate_entry['CrimeStats']['Burglary']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'ARSON'+year
      aggragate_entry['CrimeStats']['Arson']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'VEHIC'+year
      aggragate_entry['CrimeStats']['Motor Vehicle Theft']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      if (year != '12' and year != '13'):
        final_stat = 'FONDL'+year
        aggragate_entry['CrimeStats']['Fondling']["20" + str(year)] = aggragate_crime_val_old[final_stat]

      final_stat = 'DATING'+year
      aggragate_entry['CrimeStats']['Dating Violence']["20" + str(year)] = aggragate_vawa_val_old[final_stat]

      final_stat = 'DOMEST'+year
      aggragate_entry['CrimeStats']['Domestic Violence']["20" + str(year)] = aggragate_vawa_val_old[final_stat]

      final_stat = 'STALK'+year
      aggragate_entry['CrimeStats']['Stalking']["20" + str(year)] = aggragate_vawa_val_old[final_stat]

      final_stat = 'WEAPON'+year
      aggragate_entry['CrimeStats']['Weapon Referral']["20" + str(year)] = aggragate_discipline_val_old[final_stat]

      final_stat = 'DRUG'+year
      aggragate_entry['CrimeStats']['Drug Referral']["20" + str(year)] = aggragate_discipline_val_old[final_stat]

      final_stat = 'LIQUOR'+year
      aggragate_entry['CrimeStats']['Alcohol Referral']["20" + str(year)] = aggragate_discipline_val_old[final_stat]

      final_stat = 'WEAPON'+year
      aggragate_entry['CrimeStats']['Weapon Arrests']["20" + str(year)] = aggragate_arrests_val_old[final_stat]

      final_stat = 'DRUG'+year
      aggragate_entry['CrimeStats']['Drug Arrests']["20" + str(year)] = aggragate_arrests_val_old[final_stat]

      final_stat = 'LIQUOR'+year
      aggragate_entry['CrimeStats']['Alcohol Arrests']["20" + str(year)] = aggragate_arrests_val_old[final_stat]


  print 'sending...'
  result = coll.insert_one(aggragate_entry)
  print result.inserted_id
