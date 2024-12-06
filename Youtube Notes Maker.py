#----------------------------------------------------------------
# ENTER THESE
#----------------------------------------------------------------
# Enter the playlist you want to make notes for
playlist = ""

# Enter your ChatGPT token to do this:
#   1) Right click on the ChatGPT website
#   2) Press inspect
#   3) Press on the application tab on the inspect window
#   4) Under the Name column you will see something called "__Secure-next-auth.session-token"
#   5) To the right under the Value column this is your ChatGPT token
#   6) Simply copy and paste this into python! 
sessionToken = ""

#----------------------------------------------------------------
# IMPORTS
#----------------------------------------------------------------
# Imports pytube module which is needed to get the urls in the playlist
import pytube
# Imports ChatGPT module which is used for making the notes
from pyChatGPT import ChatGPT
# Imports YouTubeTranscriptApi which is needed to get the transcript for the video
from youtube_transcript_api import YouTubeTranscriptApi as yta


#----------------------------------------------------------------
# FUNCTIONS
#----------------------------------------------------------------
# Gets all of the video urls in the playlist
def getPlaylist(playlist):
    urls = []
    if playlist:
        playlist = pytube.Playlist(playlist)
        for url in playlist.video_urls:
            urls.append(url)
        return urls
    else:
        print("- Error because you didn't enter a playlist")
        exit()
    
# Gets the video's ID and name from the list of video urls in the playlist
def getVideoIdAndName(urls):
    urlsID = []
    videoNames = []
    for url in urls:
        try:
            videoId = pytube.extract.video_id(url)
            urlsID.append(videoId)
            videoData = pytube.YouTube(url)
            videoNames.append(videoData.title)
            
        except:
            pass
    return urlsID, videoNames
    
# Gets the transcriptions (subtitles) from the videos
def transcribeVideo(videoIds):
    plTranscripts = []
    for videoId in videoIds:
        try:
            data = yta.get_transcript(videoId)
            transcript = []
            for value in data:
                transcript.append(value["text"] + " ")
            
            transcript = " ".join(transcript)
            plTranscripts.append(transcript)
            
        except:
            data = yta.get_transcript(videoId, languages=['en-GB'])
            transcript = []
            for value in data:
                transcript.append(value["text"] + " ")
            
            transcript = " ".join(transcript)
            plTranscripts.append(transcript)      
    return plTranscripts

# Uses ChatGPT to make notes for the transcripts
def chatGpt(sessionToken, plTranscripts):
    notes = []
    if sessionToken:
        api = ChatGPT(sessionToken)
        for transcript in plTranscripts:
            message = "Can you sumarise this in bullet points and add headings:\n ", transcript
            resp = api.send_message(message)
            notes.append(resp["message"])
        return notes
    else:
        print("- Error because you didn't enter your CharGPT session token")
        exit()

# Writes the notes to a text file
def writeToFile(plUrls, notes, videoNames):
    for url, note, videoName in zip(plUrls, notes, videoNames):
        with open("notes.txt", "a") as f:
            f.write("----------------------------------------------------------------------------------------")
            f.write("\nVideo URL = " + url)
            f.write("\nVideo Title = " + videoName)
            f.write("\n----------------------------------------------------------------------------------------\n")
            f.write(note)
            if note == notes[-1]:
                f.write("----------------------------------------------------------------------------------------\n\n")

#----------------------------------------------------------------
# MAIN PROGRAM
#----------------------------------------------------------------
plUrls = getPlaylist(playlist)
videoIds, videoNames = getVideoIdAndName(plUrls)
plTranscripts = transcribeVideo(videoIds)
notes = chatGpt(sessionToken, plTranscripts)
writeToFile(plUrls, notes, videoNames)