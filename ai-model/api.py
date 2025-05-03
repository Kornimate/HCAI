import PIL.Image
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from service import *
from constants import *
import logging
import time
import uvicorn
import PIL

logging.basicConfig(level=logging.INFO)

app = FastAPI()

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
    result = PIL.Image.open("./generated_images/d18b9a56-eaa3-4c16-b3a8-99a6ea5bf542.jpg")
    generated_img = image_to_byte_array(result)
    end = time.time()
    time.sleep(3)
    logging.info(f"Model generation finished, elapsed time: {end-start}")

    return StreamingResponse(generated_img, media_type="image/jpeg")

@app.post("/txt-to-img")
async def generate_image(
    prompt: str = Form(...), 
):
    logging.info("Model started to genearte txt-to-img")
    start = time.time()
    result = PIL.Image.open("./generated_images/6c470ab1-2d2d-4408-9cdb-613cd28f003f.jpg")
    generated_img = image_to_byte_array(result)
    end = time.time()
    time.sleep(3)
    logging.info(f"Model generation finished, elapsed time: {end-start}")

    return StreamingResponse(generated_img, media_type="image/jpeg")

@app.get("/alive")
def alive():
    return {"success":True, "message": "API is OK!"}

@app.get("/")
def root():
    return {"success":True ,"message": "API is running!"}

# if __name__ == "__main__":
#     uvicorn.run("app:app", host="0.0.0.0", port=7860, timeout_keep_alive=600)
