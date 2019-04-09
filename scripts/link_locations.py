#!/usr/bin/python

import json

with open('fresh_data/aggragate_arrest.json') as data_file:
    aggragate_arrests = json.load(data_file)

with open('fresh_data/old_locations.json') as data_file:
    old_locations = json.load(data_file)

m_id_mapping = {}
location_to_id = {}

for i in aggragate_arrests:
    data = aggragate_arrests[i]
    school = data['INSTNM'].encode('utf-8').lower()
    campus = data['BRANCH'].encode('utf-8').lower()
    if school not in location_to_id:
        location_to_id[school] = { "{0}".format(campus): i }
    else:
        location_to_id[school][campus] = i

missing_campus = 0
missing_school = 0
for data in old_locations:
    m_id = data['_id']['$oid']
    school = data['Name'].encode('utf-8').lower()
    campus = data['Campus'].encode('utf-8').lower()
    if school in location_to_id:
        if campus in location_to_id[school]:
            m_id_mapping[m_id] = location_to_id[school][campus]
        else:
            missing_campus += 1
    else:
        missing_school += 1

print missing_campus, missing_school
