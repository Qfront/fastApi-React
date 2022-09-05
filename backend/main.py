from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from mongo_db import *
import random
import time


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Return Notes with sorting by time
@app.get("/notes")
async def getNotes():
    notes = db.find().sort("time", pymongo.DESCENDING)
    return list(notes)


# Creates a Note and sends it to the DB
@app.post("/notes")
def addNote(data=Body()):
    db.insert_one({
        "_id": f"{random.randint(10000, 100000000000000)}",
        "body": data['body'],
        "time": int(str(time.time()).split(".")[0])
         })
    return list(db.find())


# Get a Note by id
@app.get("/notes/{pk}")
def getNote(pk: str):
    notes = db.find({"_id": pk})
    return notes[0]


# Update a Note by id
@app.put("/notes/{pk}")
def updateNote(pk: str, data=Body()):
    db.update_one({"_id": pk}, {"$set": {
        "body": data["body"],
        "time": int(str(time.time()).split(".")[0])
    }})
    return list(db.find())


# Delete a Note by id
@app.delete("/notes/{pk}")
def deleteNote(pk: str):
    db.delete_one({"_id": pk})
    return list(db.find())
