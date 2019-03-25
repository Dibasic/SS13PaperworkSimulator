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
    check = isinstance(DATA[0], dict)
    valid = valid and check
    print(f'> credits[0], dict : {check}')
    check = isinstance(DATA[0]['title'], str)
    valid = valid and check
    print(f'> credits[0]["title"], str : {check}')
    check = isinstance(DATA[0]['columns'], int)
    valid = valid and check
    print(f'> credits[0]["columns"], int : {check}')
    check = isinstance(DATA[0]['credits'], list)
    valid = valid and check
    print(f'> credits[0]["credits"], list : {check}')
    for credit in DATA[0]['credits']:
        check = valid_credit(credit)
        valid = valid and check
        print(f'> credit : {check}')
    check = isinstance(DATA[1], dict)
    valid = valid and check
    print(f'> credits[1], dict : {check}')
    check = isinstance(DATA[1]['title'], str)
    valid = valid and check
    print(f'> credits[1]["title"], str : {check}')
    check = isinstance(DATA[1]['columns'], int)
    valid = valid and check
    print(f'> credits[1]["columns"], int : {check}')
    check = isinstance(DATA[1]['credits'], list)
    valid = valid and check
    print(f'> credits[1]["credits"], list : {check}')
    for credit in DATA[1]['credits']:
        check = isinstance(credit, str)
        valid = valid and check
        print(f'> credit, str : {check}')
    check = isinstance(DATA[2], dict)
    valid = valid and check
    print(f'> credits[2], dict : {check}')
    check = isinstance(DATA[2]['title'], str)
    valid = valid and check
    print(f'> credits[2]["title"], str : {check}')
    check = isinstance(DATA[2]['columns'], int)
    valid = valid and check
    print(f'> credits[2]["columns"], int : {check}')
    check = isinstance(DATA[2]['credits'], list)
    valid = valid and check
    print(f'> credits[2]["credits"], list : {check}')
    for credit in DATA[2]['credits']:
        check = isinstance(credit, str)
        valid = valid and check
        print(f'> credit, str : {check}')
    return valid

def valid_credit(obj):
    valid = True
    check = isinstance(obj['_name'], str)
    valid = valid and check
    print(f'> obj["_name"], str : {check}')
    for key in [key for key in obj.keys() if key is not '_name']:
        check = isinstance(obj[key], str)
        valid = valid and check
        print(f'> obj[key], str : {check}')
    return valid
exit_code = 0

if not is_valid(DATA):
    exit_code = 1

exit(exit_code)