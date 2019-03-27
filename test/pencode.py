import json, io, os

PEN_TAGS = 'b', 'i', 'u', 'h1', 'h2', 'h3', 'large', 'small', 'list', 'table', 'grid'

def child_values(obj):
    if isinstance(obj, dict):
        children = []
        for i in obj.keys():
            children += child_values(obj[i])
        return children
    elif isinstance(obj, str):
        return [obj]

def text(filename):
    with open(filename, 'r') as file:
        return '[br]'.join(file.readlines())

def is_valid(items):
    valid = True
    for file in items:
        print(f'> checking {file}')
        value = valid and text_is_valid(items[file])

def text_is_valid(text):
    valid = True
    for tag in PEN_TAGS:
        check = is_matching(text, tag)
        valid = valid and check
        if not check:
            print(f'> > Tag [{tag}] is mismatched!')
    return valid

def is_matching(text, tag):
    return text.count(f'[{tag}]') == text.count(f'[/{tag}]')

def main():
    # Make sure we're in the expected directory
    # Ubuntu and Windows act differently here
    if os.getcwd().upper().endswith('SS13PAPERWORKSIMULATOR'):
        os.chdir('test')

    data = {}
    with open('../templates/index.json') as json_data:
        data = json.load(json_data)

    files = {file: text('../templates/' + file) for file in child_values(data)}

    return 0 if is_valid(files) else 1

exit_code = main()

exit(exit_code)