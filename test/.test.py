import os, subprocess

FAILED = False

tests = [t for t in os.listdir() if t.endswith('.py') and not t.startswith('.')]

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