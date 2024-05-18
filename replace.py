import os
import sys

def replace_in_file(file_path, old_string, new_string):
    with open(file_path, 'r', encoding='utf-8') as file:
        filedata = file.read()

    filedata = filedata.replace(old_string, new_string)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(filedata)

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 replace.py <go_online|go_offline>")
        sys.exit(1)

    command = sys.argv[1]
    if command == "go_online":
        old_string = "localhost"
        new_string = "uniportal.sytes.net"
    elif command == "go_offline":
        old_string = "uniportal.sytes.net"
        new_string = "localhost"
    else:
        print("Invalid command.")
        sys.exit(1)

    target_extensions = {'.html', '.js', '.py'}
    target_directory = './front-end/src'

    for root, dirs, files in os.walk(target_directory):
        for file in files:
            if file.endswith(tuple(target_extensions)):
                file_path = os.path.join(root, file)
                replace_in_file(file_path, old_string, new_string)

if __name__ == "__main__":
    main()
