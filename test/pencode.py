import colors, datetime, json, io, os, regex

PEN_TAGS = 'b', 'i', 'u', 'h1', 'h2', 'h3', 'large', 'small', 'list', 'table', 'grid', 'center'

# https://stackoverflow.com/a/55392411/11015366
# https://regex101.com/r/9two3F/1
REGEX_OUTER_TAGS = regex.compile(
    r'\[(' + '|'.join(PEN_TAGS) + r')](?:(?!\[\/?\1(?:\s[^]]*)?]).|(?R))*\[\/\1]'
)

# Returns the value of each string-type key-value pair in index.json
def all_file_paths(obj):
    if isinstance(obj, dict):
        children = []
        for i in obj.keys():
            children += all_file_paths(obj[i])
        return children
    elif isinstance(obj, str):
        return [obj]

# Returns the contents of each file as a single line
def file_content(filename):
    with open('../templates/' + filename, 'r') as file:
        return '[br]'.join([line.strip('\n') for line in file.readlines()])

def all_files_are_valid(files):
    valid = True
    for f in files:
        print(f'>     checking {f} ...')
        content = file_content(f)
        if all_tag_counts_match(content):
            print('> >   Tag counts look good. Beginning recursive search...')
            start = datetime.datetime.now()
            for t in all_matching_tags(file_content(f)):
                value = valid and all_tag_counts_match(t)
            end = datetime.datetime.now()
            print(f'> >   Recursive search completed for {f} in {(end - start).total_seconds()}s')
        else:
            print('> >   Not continuing with recursive search.')

def all_tag_counts_match(text):
    # This function should just substring_is_valid on the whole string and on each matching tag pair.
    valid = True
    for tag in PEN_TAGS:
        check = tag_counts_match(text, tag)
        valid = valid and check
    return valid

#
# returns each matching tag 'child' of the text given to it. for example:
#
# this pencode:
# [b]bold[i]bold-italic[u]bold-italic-underline[/u][/i][small]but strong[/small][/b]plain[large]big[b]and bold[/b][/large]
#
# returns a list with all of these:
# [b]bold[i]bold-italic[u]bold-italic-underline[/u][/i][small]but strong[/small][/b]
#   [i]bold-italic[u]bold-italic-underline[/u][/i]
#       [u]bold-italic-underline[/u]
#   [small]but strong[/small]
#   [large]big[b]and bold[/b][/large]
#       [b]and bold[/b]
#
def all_matching_tags(pencode):
    # print('> > checking', '{:60}'.format(pencode[:60]), '...')
    result = []
    # https://stackoverflow.com/q/55400898/11015366
    for match in REGEX_OUTER_TAGS.finditer(pencode):
        matching_text = match.group()
        matching_tag = match.group(1)
        matching_text = matching_text[len(matching_tag) + 2 : -3 - len(matching_tag)]
        result += [matching_text]
        if REGEX_OUTER_TAGS.search(matching_text):
            result += all_matching_tags(matching_text)
    return result

def substring_is_valid(text):
    valid = True
    for tag in PEN_TAGS:
        valid = valid and tag_counts_match(text, tag)

TEST = '[b]bold[i]bold-italic[u]bold-italic-underline[/u][/i][small]but strong[/small][/b]plain[large]big[b]and bold[/b][/large]'
def test():
    return all_matching_tags(file_content('../templates/command/sitrep.txt'))

def tag_counts_match(text, tag):
    opening = text.count(f'[{tag}]')
    closing = text.count(f'[/{tag}]')
    check = opening == closing
    if not check:
        print(f'{colors.color("! ! ! ", fg="red")}This pencode has {opening} [{tag}] and {closing} [/{tag}]: {text}')
    return check

def main():
    # Make sure we're in the expected directory
    # Ubuntu and Windows act differently here
    if os.getcwd().upper().endswith('SS13PAPERWORKSIMULATOR'):
        os.chdir('test')

    data = {}
    with open('../templates/index.json') as json_data:
        data = json.load(json_data)

    files = all_file_paths(data)

    return 0 if all_files_are_valid(files) else 1

exit_code = main()

exit(exit_code)
