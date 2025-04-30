from diffusers import StableDiffusionPipeline, StableDiffusionImg2ImgPipeline
from pathlib import Path
from PIL import Image
import torch
import uuid

class ModelFactory():

    def __init__(self):
        self.model_id = "CompVis/stable-diffusion-v1-4"
        self.cache_dir = "./model_cache"  # path where model is saved
        self.save_path = "./generated_images"
        self.dtype = torch.float16 if torch.cuda.is_available() else torch.float32
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.pipe = StableDiffusionPipeline.from_pretrained(
            self.model_id,
            torch_dtype=self.dtype,
            cache_dir=self.cache_dir
        ).to(self.device)

        self.pipe_txt2img = self.pipe

        self.pipe_img2img = StableDiffusionImg2ImgPipeline(
            vae=self.pipe.vae,
            text_encoder=self.pipe.text_encoder,
            tokenizer=self.pipe.tokenizer,
            unet=self.pipe.unet,
            scheduler=self.pipe.scheduler,
            safety_checker=self.pipe.safety_checker,
            feature_extractor=self.pipe.feature_extractor,
            requires_safety_checker=self.pipe.requires_safety_checker
        ).to(self.device)

    def __save_image(self, image):
        id = uuid.uuid4()
        Path(self.save_path).mkdir(parents=True, exist_ok=True)
        image.save(f"{self.save_path}/{id}.jpg")
        print(f"Saved as: {id}")

    def generate_from_text(self, prompt):
        image = self.pipe_txt2img(prompt=prompt, height=400, width=400, strength=0.9, num_inference_steps=100).images[0]
        self.__save_image(image)
        torch.cuda.empty_cache()
        return image

    def generate_from_image(self, prompt, init_image_path, strength=0.7):
        init_image = Image.open(init_image_path).convert("RGB").resize((256, 256))
        image = self.pipe_img2img(prompt=prompt, image=init_image, strength=strength).images[0]
        self.__save_image(image)
        torch.cuda.empty_cache()
        return image
    
