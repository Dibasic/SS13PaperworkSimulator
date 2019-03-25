import json, os

# Make sure we're in the expected directory
# Ubuntu and Windows act differently here
if os.getcwd().upper().endswith('SS13PAPERWORKSIMULATOR'):
    os.chdir('test')

DATA = {}

with open('../credits.json') as json_data:
    DATA = json.load(json_data)

def is_valid(obj):
    valid = True
    valid = valid and isinstance(DATA[0], dict)
    valid = valid and isinstance(DATA[0]['title'], str)
    valid = valid and isinstance(DATA[0]['columns'], int)
    valid = valid and isinstance(DATA[0]['credits'], list)
    for credit in DATA[0]['credits']:
        valid = valid and valid_credit(credit)
    valid = valid and isinstance(DATA[1], dict)
    valid = valid and isinstance(DATA[1]['title'], str)
    valid = valid and isinstance(DATA[1]['columns'], int)
    valid = valid and isinstance(DATA[1]['credits'], list)
    for credit in DATA[1]['credits']:
        valid = valid and isinstance(credit, str)
    valid = valid and isinstance(DATA[2], dict)
    valid = valid and isinstance(DATA[2]['title'], str)
    valid = valid and isinstance(DATA[2]['columns'], int)
    valid = valid and isinstance(DATA[2]['credits'], list)
    for credit in DATA[2]['credits']:
        valid = valid and isinstance(credit, str)
    return valid

def valid_credit(obj):
    valid = True
    valid = valid and isinstance(obj['_name'], str)
    for key in [key for key in obj.keys() if key is not '_name']:
        valid = valid and isinstance(obj[key], str)
    return valid

exit_code = 0

if not is_valid(DATA):
    exit_code = 1

exit(exit_code)