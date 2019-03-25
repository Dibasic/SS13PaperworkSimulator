import os, subprocess

FAILED = False

# Make sure we're in the expected directory
# Ubuntu and Windows act differently here
if os.getcwd().upper().endswith('SS13PAPERWORKSIMULATOR'):
    os.chdir('test')

tests = [t for t in os.listdir() if t.endswith('.py') and not t.startswith('.')]

print(f'Found these tests: {tests}')

for test in tests:
    result = subprocess.call(['python', test])
    if result != 0 and not FAILED:
        FAILED = True
    print(f'{test} returned {result}')

exit_code = 0

if FAILED:
    exit_code = 1

print(exit_code)
exit(exit_code)