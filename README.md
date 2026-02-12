# FunFinder732
An overview of activities that the Monmouth County Park System has to offer.

## Description
Scrapes the Monmouth County Park System website for activities and displays them in a user-friendly format.

## Installation
1. Clone the repository
2. Install the required packages

```bash
npm install
```
3. Run the application
```bash
npm start
```
4. Navigate to the website
```bash
    http://localhost:5173/
```
## Usage
1. Navigate to the website
2. Click on the activity you are interested in
3. View the details of the activity


## log
 The server now has a new endpoint `/events/count` that returns the total number of events and the event count per month.
 Returns a JSON object with the following format:
```json
{
  "totalEvents": 42,
  "monthEventCounts": {
    "1": 0,
    "2": 8,
    "3": 10,
    "4": 12,
    "5": 0,
    "6": 5,
    "7": 7,
    "8": 0,
    "9": 6,
    "10": 4,
    "11": 8,
    "12": 5
  }
}
```