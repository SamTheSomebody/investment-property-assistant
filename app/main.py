from fastapi import FastAPI
from app.api.property import router as property_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(property_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}