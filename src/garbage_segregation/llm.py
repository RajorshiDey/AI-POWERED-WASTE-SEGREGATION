from langchain_groq import ChatGroq
from dotenv import load_dotenv
from .schemas import AIResponse, Response

load_dotenv()


model=ChatGroq(
    model="qwen/qwen3.8-27b"
)

def llm_call(query: str) -> Response:
    structured_model = model.with_structured_output(AIResponse)
    result = structured_model.invoke(
        f"""
        You are a waste segregation classifier.

        Your task is to classify the provided waste description.

        You MUST return a valid structured response.

        Rules:

        1. If the item is garbage, identify the appropriate dustbin.
        2. Return the dustbin name in the `bin` field.
        3. Return the exact hexadecimal color in the `color` field.
        4. Explain the classification in the `reason` field.
        5. Return confidence as a number between 0 and 1.
        6. If the input is clearly not a waste item or is not garbage,
        set:
        bin = "not a garbage"

        7. Never leave required fields undefined.
        8. Never return markdown.
        9. Never return an empty response.

        Classify the following waste item:

        {query}
        """
    )

    result = result.model_dump()
    COLOUR_MAP = {
        "wet": "green",
        "dry": "blue",
        "sanitary": "yellow",
        "special-care": "red",
        "Not a gargbage": "grey"
    }

    result["dustbin_colour"] = COLOUR_MAP[result["category"]] 

    return result

# while (True):
#     query = input("Enter the waste item: ")
#     if query == "quit":
#         break
#     print(llm_call(query))
    