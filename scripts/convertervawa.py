#!/usr/bin/python

import json

def isNull(value):
    if value is None or value == 'Null' or value == 'null' or value == '':
        return 0
    else:
        return value

with open('fresh_data/noncampusvawa_old.json') as data_file:
    noncampusvawa = json.load(data_file)

with open('fresh_data/oncampusvawa_old.json') as data_file:
    oncampusvawa = json.load(data_file)

with open('fresh_data/publiccampusvawa_old.json') as data_file:
    publicpropertyvawa = json.load(data_file)

the_keys = ['DOMEST', 'DATING', 'STALK']

ack = {}

for i in noncampusvawa:
  print i
  ack[i] = noncampusvawa[i]
  noncampus_val = noncampusvawa[i]
  oncampus_val = oncampusvawa[i]
  public_val = publicpropertyvawa[i]

  for stat in the_keys:
    for year in ['12', '13', '14']:
      final_stat = stat+year

      valid_noncampus_val = isNull(noncampus_val.get(final_stat,0))
      valid_oncampus_val = isNull(oncampus_val.get(final_stat,0))
      valid_public_val = isNull(public_val.get(final_stat,0))
      ack[i][final_stat] = 0

      ack[i][final_stat] += valid_noncampus_val
      ack[i][final_stat] += valid_oncampus_val
      ack[i][final_stat] += valid_public_val


with open('aggragate_vawa_old.json', 'w') as json_file:
  json.dump(ack, json_file)
