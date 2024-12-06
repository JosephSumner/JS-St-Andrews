#--------------------------------------------------------------------------------------
# IMPORTS
#--------------------------------------------------------------------------------------
# Used to check if the "personalDetails" file exists and if not creates it
import os
# Used to hash the users password
import hashlib

#--------------------------------------------------------------------------------------
# CLASSES
#--------------------------------------------------------------------------------------
# Class for the text colours
class tcolours:
    PINK = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLACK = '\033[37m'

#--------------------------------------------------------------------------------------
# FUNCTIONS
#--------------------------------------------------------------------------------------

# Gets the account details stored in the "PersonalDetails.txt" file
def getAccountDetails():
    accountDetailsDictionary = {}
    accountBalanceDictionary = {}
    with open("personalDetails.txt", "r") as f:
        details = [line.rstrip() for line in f]
    
    for accounts in details:
        tempDetails = accounts.replace("Username=", "")
        tempDetails = tempDetails.replace("Password=", "")
        tempDetails = tempDetails.replace("balance=", "").split()
        accountDetailsDictionary[tempDetails[0]] = tempDetails[1]
        accountBalanceDictionary[tempDetails[0]] = tempDetails[2]
    return accountDetailsDictionary, accountBalanceDictionary

# Asks the user to login or register
def loginOrRegisterFunction():
    valid = False
    while not valid:
        errors = 0
        loginOrRegister = str(input(tcolours.BLACK + "Do you want to login or register: ")).lower()
        if loginOrRegister != "login" and loginOrRegister != "register":
            errors += 1
            print(tcolours.RED + "Invalid option entered\n")
            
        if errors == 0:
            valid = True
            return loginOrRegister

# Checks if all the needed files exist
def checkFiles():
    currentDirectory = os.path.dirname(__file__)
    filePath = os.path.join(currentDirectory, "personalDetails.txt")
    if not os.path.isfile(filePath):
        with open("personalDetails.txt", 'w') as file:
            pass

# Checks if the username entered is valid and returns whether or not it is
def usernameCheckerFunction():
    accountDetailsDictionary, accountBalanceDictionary = getAccountDetails()
    valid = False
    while not valid:
        errors = 0
        username = str(input(tcolours.BLACK + "Please enter your username: "))
        
        if username == "cancel":
            return username
        
        if username == "cancel":
            break
            
        if len(username) == 0:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a username")
        
        if " " in username:
            errors += 1
            print(tcolours.RED + "- Error because your username has a space in it")
        
        if username not in accountDetailsDictionary:
            errors += 1
            print(tcolours.RED + "- This account username has not been registered")
        
        if errors == 0:
            valid = True
            return username
        else:
            print("")

# Asks the user to enter the username they want for their new account
def usernameMakerFunction():
    accountDetailsDictionary, accountBalanceDictionary = getAccountDetails()
    valid = False
    while not valid:
        errors = 0
        username = str(input(tcolours.BLACK + "Please enter your username: ")).lower()
        
        if username == "cancel":
            return username
        
        if username == "cancel":
            break
            
        if len(username) == 0:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a username")
        
        if " " in username:
            errors += 1
            print(tcolours.RED + "- Error because your username has a space in it")
        
        if username in accountDetailsDictionary:
            errors += 1
            print(tcolours.RED + "- This account username is already taken")
        
        if errors == 0:
            valid = True
            return username
        else:
            print("")

# Checks if the password is valid and returns whether or not it is
def passwordCheckerFunction():
    accountDetailsDictionary, accountBalanceDictionary = getAccountDetails()
    valid = False
    while not valid:
        errors = 0
        password = str(input(tcolours.BLACK + "Please enter your password: "))
        
        if password == "cancel":
            return password
        
        if password == "cancel":
            break
        
        if len(password) == 0:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a password")
        
        if " " in password:
            errors += 1
            print(tcolours.RED + "- Error because your password has a space in it")
        
        if hashPassword(password) != accountDetailsDictionary.get(username):
            errors += 1
            print(tcolours.RED + "- Incorrect password")
        
        if errors == 0:
            valid = True
            return password
        else:
            print("")

# Asks the user to enter the username they want for their new account
def passwordMakerFunction():
    valid = False
    while not valid:
        errors = 0
        password = str(input(tcolours.BLACK + "Please enter your password: "))
        
        if password == "cancel":
            return password
        
        if password == "cancel":
            break
        
        if len(password) == 0:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a password")
        
        if " " in password:
            errors += 1
            print(tcolours.RED + "- Error because your password has a space in it")

        if errors == 0:
            valid = True
            return password
        else:
            print("")

# Hashes the users password
def hashPassword(password):
    sha = hashlib.sha256()
    sha.update(password.encode('utf-8'))
    return sha.hexdigest()

# Lets the user know they are logged in and logs them in
def loginFunction():
    print(tcolours.GREEN + "You are logged in!")
    loggedIn = True
    registered = True
    return loggedIn, registered

# Creates the users new account based of their username and password
def registerFunction():
    with open("personalDetails.txt", "a") as f:
        f.write("Username=" + username)
        f.write(" Password=" + password)
        f.write(" balance=" + str(0))
        f.write("\n")
    
    fName = username + "TransactionHistory.txt"    
    f = open(fName, "x")
    with open(fName, "a") as f:
        f.write("Username=" + username)
        
    registered = True
    return registered

# Asks the user to select an option from a list of options, and if the user selects an option that is not in the list, it will ask the user to select an option again
def userOptionSelectCheckerFunction():
    valid = False
    while not valid:
        errors = 0
        userOptionSelect = str(input(tcolours.BLACK + "What option do you want to select (" + tcolours.BLUE + "1" + tcolours.BLACK + "/" + tcolours.CYAN + "2" + tcolours.BLACK + "/" + tcolours.PINK + "3" + tcolours.BLACK + "/" + tcolours.YELLOW + "4" + tcolours.BLACK + "/" + tcolours.RED + "5" + tcolours.BLACK + "): "  ))
        
        if userOptionSelect == "cancel":
            return userOptionSelect
        
        if userOptionSelect  == "cancel":
            break

        if userOptionSelect != "1" and userOptionSelect != "2" and userOptionSelect != "3" and userOptionSelect != "4" and userOptionSelect != "5":
            errors += 1
            print(tcolours.RED + "- Error because you did not select one of the options")
            
        if len(userOptionSelect) == 0:
            errors += 1
            print(tcolours.RED + "- Error because nothing was entered")
        
        if errors == 0:
            return userOptionSelect
        else:
            print("")

# Asks the user to enter a transaction name, and if the user doesn't enter anything, it will ask the user to enter a transaction name again            
def transactionNameMakerFunction():
    valid = False
    while not valid:
        errors = 0
        transactionName = str(input(tcolours.BLACK + "Please enter the name for the transaction: "))
        if len(transactionName) == 0:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a transaction name\n")
        
        if errors == 0:
            return transactionName
      
# It gets the account details and prints the balance of the user  
def viewBalanceFunction():
    accountDetailsDictionary, accountBalanceDictionary  = getAccountDetails()
    print(tcolours.BLUE + "Balance = £" + str(accountBalanceDictionary.get(username)))

# It takes the amount the user wants to withdraw from their account, checks if it's valid, and if it is, it withdraws the amount from their account
def withdrawCashFunction():
    accountDetailsDictionary, accountBalanceDictionary  = getAccountDetails()
    valid = False
    while not valid:
        errors = 0
        amount = input(tcolours.CYAN + "Please enter how much money you want to withdraw from your account: ")
        
        if str(amount) == "cancel":
            return processRunning == False
        
        if str(amount) == "cancel":
            break
        
        try:
            if int(amount) < 1:
                errors += 1
                print(tcolours.RED + "- Error because your withdrawal was not larger than £1\n")
            
            if int(accountBalanceDictionary.get(username)) - int(amount) < 0:
                errors += 1
                print(tcolours.RED + "- Error because you do not have enough money in your account to withdraw this amount\n")
                
        except:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a number\n")
            
        if errors == 0:
            valid = True 
    
    with open("personalDetails.txt", "r") as f:
        details = [line.rstrip() for line in f]
    
    open('personalDetails.txt', 'w').close()
    for accounts in details:
        tempDetails = accounts.replace("Username=", "")
        tempDetails = tempDetails.replace("Password=", "")
        tempDetails = tempDetails.replace("balance=", "").split()
        tempUsername = tempDetails[0]
        tempPassword = tempDetails[1]
        tempBalance = tempDetails[2]
        if username == tempUsername:
            tempBalance = int(accountBalanceDictionary.get(username)) - int(amount)
            
        with open("personalDetails.txt", "a") as f:
            f.write("Username=" + tempUsername)
            f.write(" Password=" + tempPassword)
            f.write(" balance=" + str(tempBalance))
            f.write("\n")
    
    transactionName = transactionNameMakerFunction()        
    fName = username + "TransactionHistory.txt"    
    with open(fName, "a") as f:
        f.write("\n--------------------------------------------------------\n" + "Transaction type = Withdrawal\n" + "Transaction name = " + transactionName + " \nAmount = " + str(amount))

# It takes the amount of money the user wants to deposit, adds it to their account balance and then writes it to a file                   
def submitCashFunction():
    accountDetailsDictionary, accountBalanceDictionary  = getAccountDetails()
    valid = False
    while not valid:
        errors = 0
        amount = input(tcolours.PINK + "Please enter how much money you want to deposit to your account: ")
        
        if str(amount) == "cancel":
            return processRunning == False
        
        if str(amount) == "cancel":
            break
        
        try:
            if int(amount) < 1:
                errors += 1
                print(tcolours.RED + "- Error because your transaction was not larger than £1\n")
        except:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a number\n")
            
        if errors == 0:
            valid = True 
    
    with open("personalDetails.txt", "r") as f:
        details = [line.rstrip() for line in f]
    
    open('personalDetails.txt', 'w').close()
    for accounts in details:
        tempDetails = accounts.replace("Username=", "")
        tempDetails = tempDetails.replace("Password=", "")
        tempDetails = tempDetails.replace("balance=", "").split()
        tempUsername = tempDetails[0]
        tempPassword = tempDetails[1]
        tempBalance = tempDetails[2]
        if username == tempUsername:
            tempBalance = int(accountBalanceDictionary.get(username)) + int(amount)
            
        with open("personalDetails.txt", "a") as f:
            f.write("Username=" + tempUsername)
            f.write(" Password=" + tempPassword)
            f.write(" balance=" + str(tempBalance))
            f.write("\n")
            
    transactionName = transactionNameMakerFunction()    
    fName = username + "TransactionHistory.txt"    
    with open(fName, "a") as f:
        f.write("\n--------------------------------------------------------\n" + "Transaction type = Submission\n" + "Transaction name = " + transactionName + " \nAmount = " + str(amount))

# It takes the amount of money you want to transfer and the name of the person you want to transfer it to, then it subtracts the amount from your account and adds it to the other persons account
def transferMoneyFunction():
    accountDetailsDictionary, accountBalanceDictionary  = getAccountDetails()
    valid = False
    while not valid:
        errors = 0
        amount = input(tcolours.YELLOW + "Please enter how much money you want to transfer: ")
        
        if str(amount) == "cancel":
            return processRunning == False
        
        if str(amount) == "cancel":
            break
        
        try:
            if int(amount) < 1:
                errors += 1
                print(tcolours.RED + "- Error because your transaction was not larger than £1\n")
        except:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter a number\n")
            
        if errors == 0:
            valid = True 
            
    valid = False    
    while not valid:
        errors = 0
        recipient = str(input(tcolours.YELLOW  + "Please enter the name of the recipient you want to send the money to: "))
        
        if recipient == "cancel":
            return processRunning == False
        
        if recipient == "cancel":
            break
        
        if len(recipient) == 0:
            errors += 1
            print(tcolours.RED + "- Error because you did not enter anyones name\n")
                
        if errors == 0:
            valid = True 
            
    with open("personalDetails.txt", "r") as f:
        details = [line.rstrip() for line in f]
    
    open('personalDetails.txt', 'w').close()
    for accounts in details:
        tempDetails = accounts.replace("Username=", "")
        tempDetails = tempDetails.replace("Password=", "")
        tempDetails = tempDetails.replace("balance=", "").split()
        tempUsername = tempDetails[0]
        tempPassword = tempDetails[1]
        tempBalance = tempDetails[2]
        if username == tempUsername:
            tempBalance = int(accountBalanceDictionary.get(username)) - int(amount)
            accountBalanceDictionary[username] = int(accountBalanceDictionary.get(username)) - int(amount)
            with open("personalDetails.txt", "a") as f:
                f.write("Username=" + tempUsername)
                f.write(" Password=" + tempPassword)
                f.write(" balance=" + str(tempBalance))
                f.write("\n")

        if recipient == tempUsername:
            tempBalance = int(accountBalanceDictionary.get(recipient)) + int(amount)
            accountBalanceDictionary[recipient] = int(accountBalanceDictionary.get(recipient)) + int(amount)
            with open("personalDetails.txt", "a") as f:
                f.write("Username=" + tempUsername)
                f.write(" Password=" + tempPassword)
                f.write(" balance=" + str(tempBalance))
                f.write("\n")
    
    transactionName = transactionNameMakerFunction()        
    fName = username + "TransactionHistory.txt"    
    with open(fName, "a") as f:
        f.write("\n--------------------------------------------------------\n" + "Transaction type = Transfer\n" + "Recipient = " + recipient + "\nTransaction name = " + transactionName + " \nAmount sent = " + str(amount) + "\nBalance after = " + str(accountBalanceDictionary.get(username)))
    
    fName = recipient + "TransactionHistory.txt"    
    with open(fName, "a") as f:
        f.write("\n--------------------------------------------------------\n" + "Transaction type = Transfer\n" + "From = " + username + "\nTransaction name = " + transactionName + " \nAmount received = " + str(amount + "\nBalance after = " + str(accountBalanceDictionary.get(recipient))))

# Displays the transaction history for that user
def transactionHistoryFunction():

    fName = username + "TransactionHistory.txt" 
    with open(fName, "r") as f:
        details = [line.rstrip() for line in f]
    if len(details) > 0:
        del details[0]
        for lines in details:
            print(tcolours.BLACK + lines)
    else:
        print(tcolours.RED + "You have not made any transactions yet")

#--------------------------------------------------------------------------
# MAIN PROGRAM
#--------------------------------------------------------------------------
signedIn = False
loggedIn = False
registered = False
checkFiles()

# Logging in
while not signedIn:
    loginOrRegister = loginOrRegisterFunction()
    
    if loginOrRegister == "login":
        while not loggedIn:
                username = usernameCheckerFunction()
                if username == "cancel":
                    print("")
                    break
                password = passwordCheckerFunction()
                if password == "cancel":
                    print("")
                    break
                loggedIn, registered = loginFunction()
    
    if loginOrRegister == "register":
        while not registered:
            username = usernameMakerFunction()
            if username == "cancel":
                print("")
                break
            password = passwordMakerFunction()
            if password == "cancel":
                print("")

            password = hashPassword(password)
            registered = registerFunction()
            
    if loggedIn and registered:
        signedIn = True

userFinished = False

# Menu
while not userFinished:
    print(tcolours.BLACK + "--------------------------------------------------------")
    print(tcolours.BLUE + "1) View balance")
    print(tcolours.CYAN + "2) Withdraw cash")
    print(tcolours.PINK + "3) Submit cash")
    print(tcolours.YELLOW + "4) Transfer money")
    print(tcolours.RED + "5) Transaction history")
    userOptionSelect = userOptionSelectCheckerFunction()
    if userOptionSelect == "cancel":
        print("Have a nice day!")
        break
    
    if userOptionSelect == "1":
        viewBalanceFunction()
        
    if userOptionSelect == "2":
        processRunning = True
        while processRunning:
            processRunning = withdrawCashFunction()
            
    if userOptionSelect == "3":
        processRunning = True
        while processRunning:
            processRunning = submitCashFunction()
            
    if userOptionSelect == "4":
        processRunning = True
        while processRunning:
            processRunning = transferMoneyFunction()
            
    if userOptionSelect == "5":
        transactionHistoryFunction()