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

    valid = valid and check(DATA[0], 'credits[0]', dict)
    valid = valid and check(DATA[0]['title'], 'credits[0]["title"]', str)
    valid = valid and check(DATA[0]['columns'], 'credits[0]["columns"]', int)
    valid = valid and check(DATA[0]['credits'], 'credits[0]["credits"]', list)

    for credit in DATA[0]['credits']:
        valid = valid and check(credit, 'dev credit', dict, indents=2)
        is_valid = valid_credit(credit)
        valid = valid and is_valid
        print(f'> > > dev credit is properly formed : {is_valid}')

    valid = valid and check(DATA[1], 'credits[1]', dict)
    valid = valid and check(DATA[1]['title'], 'credits[1]["title"]', str)
    valid = valid and check(DATA[1]['columns'], 'credits[1]["columns"]', int)
    valid = valid and check(DATA[1]['credits'], 'credits[1]["credits"]', list)

    for credit in DATA[1]['credits']:
        valid = valid and check(credit, '{:24}'.format(str(credit)), str, indents=2)

    valid = valid and check(DATA[2], 'credits[2]', dict)
    valid = valid and check(DATA[2]['title'], 'credits[2]["title"]', str)
    valid = valid and check(DATA[2]['columns'], 'credits[2]["columns"]', int)
    valid = valid and check(DATA[2]['credits'], 'credits[2]["credits"]', list)

    for credit in DATA[2]['credits']:
        valid = valid and check(credit, f'credit "{str(credit)[:24]}..."', str, indents=2)
    return valid

def valid_credit(obj):
    valid = True
    valid = valid and check(obj['_name'], '_name', str, indents=2)
    for key in [key for key in obj.keys() if not key.startswith('_')]:
        valid = valid and check(obj[key], f'{obj["_name"]}["{key}""]', str, indents=3)
    return valid

def check(obj, name, t, indents = 1):
    check = isinstance(obj, t)
    print(f'{"> "*indents}{name} exists and is type {t.__name__}: {check}')
    return check

exit_code = 0

if not is_valid(DATA):
    exit_code = 1

exit(exit_code)