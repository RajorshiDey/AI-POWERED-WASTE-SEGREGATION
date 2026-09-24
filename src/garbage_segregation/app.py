from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import Request
from .llm import llm_call

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status" : "success"
    }

@app.post("/classify")
def classify_waste(request: Request):

    if not request.description.strip():
        raise HTTPException(
            status_code=400,
            detail="Waste description cannot be empty"
        )

    try:
        response = llm_call(request.description)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error classifying waste: {str(e)}"
        )