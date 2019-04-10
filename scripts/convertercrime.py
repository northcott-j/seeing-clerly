#!/usr/bin/python

import json

def isNull(value):
    if value is None or value == 'Null' or value == 'null' or value == '':
        return 0
    else:
        return value

with open('fresh_data/noncampusarrest_old.json') as data_file:
    noncampuscrime = json.load(data_file)

with open('fresh_data/oncampusarrest_old.json') as data_file:
    oncampuscrime = json.load(data_file)

with open('fresh_data/publiccampusarrest_old.json') as data_file:
    publicpropertycrime = json.load(data_file)

# crime
#the_keys = ['MURD','STATR', 'ROBBE', 'AGG_A', 'BURGLA', 'ARSON', 'VEHIC', 'FONDL', 'RAPE', 'INCES']
# arrest + discipline
the_keys = ['WEAPON', 'DRUG', 'LIQUOR']

ack = {}

for i in noncampuscrime:
  print i
  ack[i] = noncampuscrime[i]
  noncampus_val = noncampuscrime[i]
  oncampus_val = oncampuscrime[i]
  public_val = publicpropertycrime[i]

  for stat in the_keys:
    for year in ['12', '13', '14']:
      final_stat = stat+year

      noncampus_stat = noncampus_val.get(final_stat,0)
      oncampus_stat = oncampus_val.get(final_stat,0)
      public_stat = public_val.get(final_stat,0)
      ack[i][final_stat] = 0

      valid_noncampus_val = isNull(noncampus_stat)
      valid_oncampus_val = isNull(oncampus_stat)
      valid_public_val = isNull(public_stat)

      ack[i][final_stat] += valid_noncampus_val
      ack[i][final_stat] += valid_oncampus_val
      ack[i][final_stat] += valid_public_val


with open('aggragate_arrest_old.json', 'w') as json_file:
  json.dump(ack, json_file)
