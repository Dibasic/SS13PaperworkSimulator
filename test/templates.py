import json, os

DATA = {}

with open('../templates/index.json') as json_data:
    DATA = json.load(json_data)

def is_valid(obj):
    if isinstance(obj, dict):
        valid = True
        for i in obj.keys():
            valid = valid and is_valid(obj[i])
        return valid
    elif isinstance(obj, str):
        return file_exists(obj)
        
def file_exists(path):
    print(path, os.path.isfile(f'../templates/{path}'))
    return os.path.isfile(f'../templates/{path}')

exit_code = 0

if not is_valid(DATA):
    exit_code = 1

exit(exit_code)