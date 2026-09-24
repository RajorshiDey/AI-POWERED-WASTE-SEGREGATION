from pydantic import BaseModel
from typing import Literal

class AIResponse(BaseModel):
    # dustbin_colour: Literal["green","blue","yellow","red"]
    category: Literal["wet","dry","sanitary","special-care"]
    reason: str


class Response(AIResponse):
    dustbin_colour: str
    
    

class Request(BaseModel):
    description:str