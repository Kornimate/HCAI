from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from model import *
from service import *
from constants import *
import logging
import time
import uvicorn

logging.basicConfig(level=logging.INFO)

app = FastAPI()
model = ModelFactory()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/img-to-img")
async def generate_image(
    prompt: str = Form(...), 
    image: UploadFile = File(...),
    strength: float = Form(0.5)
):
    logging.info("Model started to genearte img-to-img")
    start = time.time()
    input_image = load_image(await image.read(), INPUT_IMG_SIZE)
    result = model.generate_from_image(prompt, input_image, strength)
    generated_img = image_to_byte_array(result)
    end = time.time()
    logging.info(f"Model generation finished, elapsed time: {end-start}")

    return StreamingResponse(generated_img, media_type="image/jpeg")

@app.post("/txt-to-img")
async def generate_image(
    prompt: str = Form(...), 
):
    logging.info("Model started to genearte txt-to-img")
    start = time.time()
    result = model.generate_from_text(prompt)
    generated_img = image_to_byte_array(result)
    end = time.time()
    logging.info(f"Model generation finished, elapsed time: {end-start}")

    return StreamingResponse(generate_image, media_type="image/jpeg")

@app.get("/alive")
def alive():
    return {"success":True, "message": "API is OK!"}

@app.get("/")
def root():
    return {"success":True ,"message": "API is running!"}

# if __name__ == "__main__":
#     uvicorn.run("app:app", host="0.0.0.0", port=7860, timeout_keep_alive=600)
