#----------------------------------------------------------------
# ENTER THIS
#----------------------------------------------------------------
# Enter the bbc bitesize url you want to make notes for
url = ""

# Enter your ChatGPT token
# To do this:
#   1) Right click on the ChatGPT website
#   2) Press inspect
#   3) Press on the application tab on the inspect window
#   4) Under the Cookies column you will see something called "__Secure-next-auth.session-token"
#   5) To the right under the Value column this is your ChatGPT token
#   6) Simply copy and paste this into python! 
sessionToken = ""

#----------------------------------------------------------------
# IMPORTS
#----------------------------------------------------------------
# Imports request module which is needed to get the text from the page
import requests
# Imports the bs4 module which is needed to get the specific text needed from the request
from bs4 import BeautifulSoup
# Imports ChatGPT module which is used for making the notes
from pyChatGPT import ChatGPT


#----------------------------------------------------------------
# FUNCTIONS
#----------------------------------------------------------------
# Gets the url in the correct format
def formatUrl(url):
    url = url.split('/')
    del url[-1]
    url = "/".join(url) + "/"
    return url

# Gets the contents from the bbc bitesize pages
def getPageContents(url):
    siteContent = []
    for i in range(999):
        result = requests.get(url + str(i))
        doc = BeautifulSoup(result.text, "html.parser")
        contentDivs = doc.find_all("div", class_="isite-content")
        if not contentDivs and i != 0:
            break
        pageContent = []
        for contentDiv in contentDivs:
            pageContent.append(contentDiv.text)
        siteContent.append("".join(pageContent))
    del siteContent[0]
    return siteContent

# Uses ChatGPT to make notes for the transcripts
def chatGpt(sessionToken, siteContent):
    notes = []
    if sessionToken:
        api = ChatGPT(sessionToken)
        for content in siteContent:
            message = "Can you summarise in bullet points with headings", content
            resp = api.send_message(message)
            notes.append(resp["message"])
    else:
        print("- Error because you didn't enter your ChatGPT session token")
        exit()
        
    return notes

# Writes the notes to a text file
def writeToFile(notes):
    for note in notes:
        with open("notes.txt", "a") as f:
            f.write("----------------------------------------------------------------------------------------\n")
            f.write(note)
            if note == notes[-1]:
                f.write("----------------------------------------------------------------------------------------\n\n")

#----------------------------------------------------------------
# MAIN PROGRAM
#----------------------------------------------------------------
# Enter the bbc bitesize url you want to make notes for
url = ""
url = formatUrl(url)
siteContent = getPageContents(url)
notes = chatGpt(sessionToken, siteContent)
writeToFile(notes)