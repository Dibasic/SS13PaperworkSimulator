import io, re, os

# Make sure we're in the expected directory
# Ubuntu and Windows act differently here
if os.getcwd().upper().endswith('SS13PAPERWORKSIMULATOR'):
    os.chdir('test')

images = []
pattern = r'^\s+\.replaceAll\(\'\[.*?\]\', ?\'<img src ?= ?(.*?)>'

with open('../script/pen.js') as file:
    for line in file:
        match = re.match(pattern, line)
        if match:
            images.append(match.group(1))

images = ['../' + i.lstrip('./') for i in images]

FAILED = False

if len(images) < 4:
    print('> Detecting fewer than 4 image calls in pen.js - not likely!')
    FAILED = True
else:
    for i in images:
        exists = os.path.isfile(i)
        print(f'{i} exists : {exists}')
        FAILED = FAILED or not exists

exit_code = 0

if FAILED:
    exit_code = 1
    
exit(exit_code)