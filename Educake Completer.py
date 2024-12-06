#----------------------------------------------------------------
# ENTER THESE
#----------------------------------------------------------------
# Enter your educake username
username = 
# Enter your educake password
password = 

# Enter the number of questions for the educake
numQuestions = 

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
# Imports time module giving time for the user to select their chosen educake to complete
import time
# Imports the urllib.request module which is needed to download the image from the educake question
import urllib.request
# Imports pytesseract which is needed to convert the image to text
import pytesseract
# Imports pyChatGPT which is needed to answer the educake questions
from pyChatGPT import ChatGPT
# Imports selenium which is used to control chrome
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
# Imports warnings to disable chromedriver from displaying useless text in console
# import warnings

#----------------------------------------------------------------
# FUNCTIONS 
#----------------------------------------------------------------
# Opens chrome and then logs into educake
def openAndLogin():
    # Create a new instance of the Chrome driver
    driver = webdriver.Chrome()

    # Navigate to the website
    driver.get("https://www.educake.co.uk")

    # Accept the cookies
    driver.find_element(By.XPATH, '//button[text()="Yes, allow all"]').click()

    # Click on the "Student Login" button
    driver.find_element(By.XPATH, '//span[text()="Student login"]').click()

    # Enter the username and password
    driver.find_element(By.XPATH, '//input[@name="username"]').send_keys(username)
    driver.find_element(By.XPATH, '//input[@name="password"]').send_keys(password)

    # Click the "Login" button
    driver.find_element(By.XPATH, '//button[text()=" Log in "]').click()
    time.sleep(10)
    
    return driver

# Finds any images that are with the question and uses an image to text converter so it can be inputted into chatgpt
def findImages(question):
    photo = False
    try:
        imageUrl = driver.find_element(By.CLASS_NAME, "mw-100").get_attribute("src")
        pytesseract.pytesseract.tesseract_cmd = "C:\Program Files\Tesseract-OCR\Tesseract"
        urllib.request.urlretrieve(imageUrl, 'image.jpg')
        imageText = pytesseract.image_to_string("image.jpg")
        question = question + str(imageText)
        photo = True
    except:
        pass
    
    return question, photo

# Finds the buttons and gets the text along with them
def findButtons():
    button = False
    buttonTexts = []
    for i in range(10):
        try:
            buttonId = "choice" + str(i)
            buttonTexts.append(" ".join(driver.find_element(By.ID, buttonId).get_attribute('aria-label')))
            button = True
        except:
            break
    print(buttonTexts)

    return buttonTexts, button

# Sends the question to chatgpt and gets the answer
def getResponse(button, question, buttonTexts):
    api = ChatGPT(sessionToken)

    if not button:
        message = "Can you answer this question in one word: " + str(question)

    if button:
        message = "Which of these is the correct answer and can you only answer with the number: ", buttonTexts, "\nFor this question: ", question

    resp = api.send_message(message)
    resp = resp["message"]
    
    return resp

# Gets the answer chatgpt gave and input it into educake
def sendAnswer(button, resp):
    # Enters the answer given by ChatGPT if no button was found
    if not button:
        if "." in resp:
            resp = resp.replace(".", "")
        
        if ")" in resp:
            resp = resp.replace(")", "")

        driver.find_element(By.NAME("answer")).send_keys(resp, Keys.ENTER)
        time.sleep(3)
        driver.find_element(By.XPATH, '//button[text()=" Next question "]').click()

    # Presses the correct button given by ChatGPT
    if button:
        resp = "".join([x for x in resp if x.isdigit()])
        buttonId = "choice" + str(resp)
        buttonInput = driver.find_element_by_id(buttonId)
        buttonInput.click()
        buttonInput.send_keys(Keys.ENTER)
    
# Answers the questions to the educake
def answerQuestions():
    # For loop to answer amount of questions entered by user
    for i in range(numQuestions):
        # Gets the question's text
        question = driver.find_element(By.CLASS_NAME, "pre-line").text

        # Tests to see if there is an image for the question
        question, photo = findImages(question)
        
        # Tests to see if there is a button for the question
        buttonTexts, button = findButtons()
        
        # If the user has entered their session token then the question will be entered into ChatGPT and the answer will be recieved
        if sessionToken:
            resp = getResponse(button, question, buttonTexts)
        
        # If the session token was not entered then the program will quit
        else:
            print("- Error because you didn't enter your ChatGPT session token")
            quit()
        
        # Enters the answer given by ChatGPT if no button was found
        sendAnswer(button, resp)
            
#----------------------------------------------------------------
# MAIN PROGRAM
#----------------------------------------------------------------
driver = openAndLogin()
answerQuestions()