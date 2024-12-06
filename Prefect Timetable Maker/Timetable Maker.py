#----------------------------------------------------------------
# HOW TO USE THE PROGRAM
#----------------------------------------------------------------
# 1) In the same directory as the "Timetable Maker.py" create two folders called "prefectTimetables" and "prefectRota"
# 2) In the "prefectTimetables" folder place all the timetables of the prefects as different CSV files
# 3) Each CSV file should be the name of the student and should be in the format:
#    Day,Period 1,Period 2,Period 3,Period 4,Period 5
#    Monday,B Block,A Block,A Block,Grange,A Block
#    Tuesday,A Block,A Block,A Block,Grange,A Block
#    Wednesday,B Block,C Block,B Block,Grange,C Block
#    Thursday,Grange,Grange,Grange,B Block,B Block
#    Friday,B Block,Grange,C Block,C Block,C Block
# 4) Then run the program and it will display the prefect timetable and store it as a CSV file in the "prefectRota" folder

#----------------------------------------------------------------
# IMPORTS
#----------------------------------------------------------------
# Imports pandas module used for reading the Google form responses which has been saved as a CSV file and also export the timetable to a CSV file
import pandas as pd
# Imports random module which is used to randomly pick a prefect
import random
# Imports math module which is used for general calculations
import math
# Used to get all the CSV files in the directory
import os
import glob
# Used to display the timetable in a nice format
from tabulate import tabulate

#----------------------------------------------------------------
# FUNCTIONS
#----------------------------------------------------------------
# Creates the Prefect timetable
def createBlankTimetable():
    timetable = {
        "Break": {
            "Monday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Tuesday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Wednesday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Thursday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Friday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []}
        },
        "Lunch": {
            "Monday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Tuesday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Wednesday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Thursday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []},
            "Friday": {"Canteen": [], "A Block": [], "B Block": [], "C Block": []}
        }
    }

    return timetable

# Checks all the needed folders are created
def checkFolders():
    currentDirectory = os.path.dirname(os.path.abspath(__file__))
    folders = ["prefectTimetables", "prefectRota"]
    for folder in folders:
        folderPath = os.path.join(currentDirectory, folder)
        if not os.path.exists(folderPath):
            os.makedirs(folderPath)

# Gets all the CSV files in the current directory
def getCsvFiles():
    currentDirectory = os.path.dirname(os.path.abspath(__file__))
    folderPath = os.path.join(currentDirectory, "prefectTimetables")
    csvFiles = glob.glob(os.path.join(folderPath, "*.csv"))

    return csvFiles

# Creates a dictionary of all the Prefects and has their name, desired placements and how many break/lunch duties they will have
def getPrefects(csvFiles):
    prefects = {}
    for file in csvFiles:
        tempTimetable = pd.read_csv(file)
        prefects[os.path.basename(file).strip(".csv")] = {
            "p2Locations": tempTimetable["Period 2"].tolist(),
            "p4Locations": tempTimetable["Period 4"].tolist(),
            "Break": math.ceil(50 / len(csvFiles)),
            "Lunch": math.ceil(50 / len(csvFiles)),
            "Duties": math.ceil(100 / len(csvFiles))
        }

    return prefects

# Calculates how many Prefects will need to be on duty in that location
def calculatePlacements(location):
    if location == "Canteen":
        return 4
    else:
        return 2

# Weights the different locations which will be used to decide has top priority
def weightLocations():
    locationWeights = {"A Block": ["A Block", "Grange", "B Block", "C Block"],
                       "B Block": ["B Block", "Grange", "C Block", "A Block"],
                       "C Block": ["C Block", "Grange", "B Block", "A Block"],
                       "Canteen": ["C Block", "Grange", "B Block", "A Block"]
                       }

    return locationWeights

# Chooses a prefect based on how they ranked where they wanted to be and if they have any breaks/lunches remaining
def choosePrefect(prefects, time, day, location, timetable, locationWeights):
    dayConnotation = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4
    }

    weights = [[], [], [], []]
    for prefect in prefects.keys():
        if prefects[prefect][time] > 0 and prefects[prefect]["Duties"] > 1:
            if prefect in timetable[time][day][location]:
                continue  # Skip this prefect

            relevantTime = "p2Locations" if time == "Break" else "p4Locations"
            locationWeight = locationWeights[location].index(prefects[prefect][relevantTime][dayConnotation[day]])
            weights[locationWeight].append(prefect)

    for weight in weights:
        if weight:
            randomPrefect = random.choices(weight)[0]
            break
    else:
        for prefect in prefects.keys():
            if prefects[prefect]["Duties"] > 0:
                weights[0].append(prefect)
        randomPrefect = random.choices(weights[0])[0]

    prefects[randomPrefect][time] -= 1
    prefects[randomPrefect]["Duties"] -= 1

    return randomPrefect

# Correctly formats the timetable so it can be displayed
def formatTimetable(timetable, timeSlot):
    blocks = ["Canteen", "A Block", "B Block", "C Block"]
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    data = {"Block": blocks}
    for day in days:
        data[day] = []
        for block in blocks:
            joined = "\n".join(timetable[timeSlot][day][block])
            data[day].append(joined)

    # Convert to a Pandas DataFrame
    dataFrame = pd.DataFrame(data)
    return dataFrame

#----------------------------------------------------------------
# MAIN PROGRAM
#----------------------------------------------------------------
# Creates a blank timetable
timetable = createBlankTimetable()
# Checks if all the necessary folders are present
checkFolders()
# Gets all the CSV files which are in the same location as the program
csvFiles = getCsvFiles()
# If there are no CSV files in the "prefectTimetables" folder then the program will stop
if not csvFiles:
    print("No prefect timetables found")
    exit()
# Will get all the prefects and their timetables which are stored in CSV files
prefects = getPrefects(csvFiles)
# The different weights of the locations and will decide who has top priority at a certain location
locationWeights = weightLocations()

# Makes the timetable
for time, days in timetable.items():
    for day, locations in days.items():
        for location in locations.keys():
            placementsNeeded = calculatePlacements(location)
            for i in range(placementsNeeded):
                prefect = choosePrefect(prefects, time, day, location, timetable, locationWeights)
                timetable[time][day][location].append(prefect)

# Displays the timetables
breakDuties = formatTimetable(timetable, "Break")
lunchDuties = formatTimetable(timetable, "Lunch")

print("Break Duties:")
print(tabulate(breakDuties, headers="keys", tablefmt="grid", showindex=False))

print("\nLunch Duties:")
print(tabulate(lunchDuties, headers="keys", tablefmt="grid", showindex=False))

# Exports to two different CSV files
currentDirectory = os.path.dirname(os.path.abspath(__file__))
folderPath = os.path.join(currentDirectory, "prefectRota")

breakDuties.to_csv(os.path.join(folderPath, "breakDuties.csv"), index=False, encoding="utf-8")
lunchDuties.to_csv(os.path.join(folderPath, "lunchDuties.csv"), index=False, encoding="utf-8")