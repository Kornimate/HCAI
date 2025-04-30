from fastapi import FastAPI, File, UploadFile, Form
from model import *
from service import *
import logging
import time

logging.basicConfig(level=logging.INFO)

app = FastAPI()
model = ModelFactory()

@app.post("/img-to-img")
async def generate_image(
    prompt: str = Form(...), 
    image: UploadFile = File(...),
    strength: float = Form(0.5), 
    size: int = Form(256)
):
    logging.info("Model started to genearte img-to-img")
    start = time.time()
    input_image = load_image(await image.read(), size)
    result = model.generate_from_image(prompt, image, strength)
    generated_img = image_to_base64(result)
    end = time.time()
    logging.info(f"Model generation finished, elapsed time: {end-start}")

    return {"success":True , "message": "Image generated", "img": generated_img}

@app.post("/txt-to-img")
async def generate_image(
    prompt: str = Form(...), 
    size: int = Form(256)
):
    logging.info("Model started to genearte txt-to-img")
    start = time.time()
    result = model.generate_from_text(prompt)
    generated_img = image_to_base64(result)
    end = time.time()
    logging.info(f"Model generation finished, elapsed time: {end-start}")

    return {"success":True , "message": "Image generated", "img": generated_img}

@app.get("/alive")
def alive():
    return {"success":True, "message": "API is OK!"}

@app.get("/")
def root():
    return {"success":True ,"message": "API is running!"}
