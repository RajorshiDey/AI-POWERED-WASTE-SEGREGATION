from langchain_groq import ChatGroq
from dotenv import load_dotenv
from src.garbage_segregation.schemas import AIResponse, Response

load_dotenv()


model=ChatGroq(
    model="qwen/qwen3.8-27b"
)

def llm_call(query: str) -> Response:
    structured_model = model.with_structured_output(AIResponse)
    result = structured_model.invoke(
        f"""
        Classify the following waste item:

        {query}
        """
    )

    result = result.model_dump()
    COLOUR_MAP = {
        "wet": "green",
        "dry": "blue",
        "sanitary": "yellow",
        "special-care": "red"
    }

    result["dustbin_colour"] = COLOUR_MAP[result["category"]] 

    return result

# while (True):
#     query = input("Enter the waste item: ")
#     if query == "quit":
#         break
#     print(llm_call(query))
    