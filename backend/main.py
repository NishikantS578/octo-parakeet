from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
import uvicorn

app = FastAPI()

origins=["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods="*", allow_headers="*")

class UserData(BaseModel):
    id: str | None = None
    firstName: str = ""
    lastName: str = ""
    dob: date = None
    dialCode: str = ""
    phoneNo: str = ""
    email: str = ""

db:list[UserData]=[]

@app.get("/", response_model=UserData)
def getUser(userId: int):
    if userId >= len(db):
        raise HTTPException(status_code=500, detail=[{"msg": "user does not exist"}])
    return db[userId]

@app.post("/", response_model=UserData, status_code=201)
def createUser(user_data:UserData):
    if user_data.firstName == "" or user_data.lastName == "" or user_data.dialCode == "" or user_data.phoneNo == "" or user_data.email == "":
        raise HTTPException(status_code=500, detail=[{"msg": "invalid data"}])

    if any(user.phoneNo == user_data.phoneNo for user in db):
        raise HTTPException(status_code=500, detail=[{"msg": "user already exists"}])

    user_data.id = str(len(db))
    db.append(user_data)
    return db[-1]

if __name__ == "__main__":
    uvicorn.run(app="main:app", host="0.0.0.0", port=8001, reload=True)