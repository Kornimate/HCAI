from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.openapi.utils import get_openapi
from model import *
from service import *
from constants import *
import logging
import time
import json
import uvicorn

logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="Image Generation API",
    description="An API for generating images using image-to-image and text-to-image generative models.",
    version="1.0.0"
)

model = ModelFactory()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(
    "/img-to-img",
    summary="Generate image from an input image and prompt",
    description="Takes an input image and a prompt, then returns a generated image based on the input using img2img diffusion.",
    response_description="A JPEG image stream of the generated image"
)
async def generate_image(
    prompt: str = Form(..., description="Special json converted text prompt to guide the image generation"),
    image: UploadFile = File(..., description="Input image file (JPEG or PNG)")
):
    promptData = json.loads(prompt)
    logging.info("Model started to generate img-to-img")
    start = time.time()
    input_image = load_image(await image.read(), INPUT_IMG_SIZE)
    result = model.generate_from_image(promptData, input_image)
    generated_img = image_to_byte_array(result)
    end = time.time()
    logging.info(f"Model generation finished, elapsed time: {end-start}")
    return StreamingResponse(generated_img, media_type="image/jpeg")


@app.post(
    "/txt-to-img",
    summary="Generate image from text prompt",
    description="Generates a new image entirely from a text prompt using text-to-image diffusion.",
    response_description="A JPEG image stream of the generated image"
)
async def generate_image(
    prompt: str = Form(..., description="Text prompt to guide image generation")
):
    logging.info("Model started to generate txt-to-img")
    start = time.time()
    result = model.generate_from_text(prompt)
    generated_img = image_to_byte_array(result)
    end = time.time()
    logging.info(f"Model generation finished, elapsed time: {end-start}")
    return StreamingResponse(generated_img, media_type="image/jpeg")


@app.get("/alive", summary="Check API health")
def alive():
    return {"success": True, "message": "API is OK!"}


@app.get("/", summary="API root status")
def root():
    return {"success": True, "message": "API is running!"}


# Uncomment to run standalone
# if __name__ == "__main__":
#     uvicorn.run("app:app", host="0.0.0.0", port=7860, timeout_keep_alive=600)
