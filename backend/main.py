from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import uvicorn

app = FastAPI()

origins=[
    "http://localhost:5473"
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods="*", allow_headers="*")

class UserData(BaseModel):
    name: str = ""
    email: str = ""
    dob: datetime = None
    phone: str = ""

@app.get("/", response_model=UserData)
def getUser():
    return UserData(name="Hi")

if __name__ == "__main__":
    uvicorn.run(app=app, host="0.0.0.0", port=8001)