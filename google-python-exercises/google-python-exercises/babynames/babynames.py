#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

import sys
import re


def extract_year(file):
    f = open(file)
    string = f.read()
    f.close()
    year_string = re.search(r'(<h3 align="center">Popularity in )(\w\w\w\w)(</h3>)', string)
    if year_string:
        year = year_string.group(2)
        #print(year)
        return year


def extract_name(file, year):
    f = open(file)
    string = f.read()
    f.close()
    name_string = re.findall(r'(?:<td>)(\w+)(?:</td><td>)(\w+)(?:</td><td>)(\w+)(?:</td>)', string)
    #print(name_string)
    i = 0
    ranked_list = []
    while i < len(name_string):
        q = str(name_string[i][2]) + " " + str(name_string[i][0])
        r = str(name_string[i][1]) + " " + str(name_string[i][0])
        ranked_list.append(q)
        ranked_list.append(r)
        i += 1
    sort_list = sorted(ranked_list)
    sort_string = '\n'.join(sort_list) + '\n'
    sorted_string = year + '\n' + sort_string
    print(sorted_string)
    return sorted_string


def summary_file(file, string):
    filename = file + '.txt'
    f = open(filename, 'w')
    f.write(string)
    f.close()


def main():
    # This command-line parsing code is provided.
    # Make a list of command line arguments, omitting the [0] element
    # which is the script itself.
    args = sys.argv[1:]

    if not args:
        print('usage: [--summaryfile] file [file ...]')
        sys.exit(1)

    # Notice the summary flag and remove it from args if it is present.
    summary = False
    if args[0] == '--summaryfile':
        summary = True
        del args[0]

    file = args[0]
    year = extract_year(file)
    sorted_string = extract_name(file, year)

    if summary:
        summary_file(file, sorted_string)


if __name__ == '__main__':
    main()
