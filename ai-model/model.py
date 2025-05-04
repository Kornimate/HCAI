from diffusers import StableDiffusionPipeline, StableDiffusionInpaintPipeline
from pathlib import Path
from PIL import Image, ImageDraw
import torch
import uuid

#stabilityai/stable-diffusion-2-inpainting
#runwayml/stable-diffusion-inpainting

class ModelFactory():

    def __init__(self):
        self.model_id = "CompVis/stable-diffusion-v1-4"
        self.cache_dir = "./model_cache"  # path where model is saved
        self.model_id_inpaiting = "CompVis/stable-diffusion-v1-4"
        self.cache_dir_inpainting = "./model_cache_inpainting"  # path where inpainting model is saved
        self.save_path = "./generated_images"
        self.dtype = torch.float16 if torch.cuda.is_available() else torch.float32
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.pipe = StableDiffusionPipeline.from_pretrained(
            self.model_id,
            torch_dtype=self.dtype,
            cache_dir=self.cache_dir
        ).to(self.device)

        self.pipe_txt2img = self.pipe

        self.pipe_img2img = StableDiffusionInpaintPipeline.from_pretrained(
            self.model_id_inpaiting,
            torch_dtype=self.dtype,
            cache_dir=self.cache_dir_inpainting
        ).to(self.device)

    def __save_image(self, image, prefix=""):
        id = uuid.uuid4()
        Path(self.save_path).mkdir(parents=True, exist_ok=True)
        image.save(f"{self.save_path}/{prefix}{id}.jpg")
        print(f"Saved as: {id}")
    
    def __truncate_prompt(self, prompt, max_tokens=77):
        inputs = self.pipe.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=max_tokens)
        return self.pipe.tokenizer.batch_decode(inputs["input_ids"], skip_special_tokens=True)[0]
    
    def __create_img_mask(self, rectangleData, imgSize):
        mask = Image.new("L", imgSize, 0)
        draw = ImageDraw.Draw(mask)
        draw.rectangle([int(rectangleData['x']), int(rectangleData['y']), int(rectangleData['x'] + rectangleData['width']), int(rectangleData['y']+ rectangleData['height'])], fill=255)
        # self.__save_image(mask, "mask-")
        return mask

    def generate_from_text(self, prompt):
        prompt = self.__truncate_prompt(prompt)
        image = self.pipe_txt2img(prompt=prompt, height=400, width=400, strength=0.9, num_inference_steps=100).images[0]
        # self.__save_image(image)
        torch.cuda.empty_cache()
        return image

    def generate_from_image(self, promptData, init_image, strength=0.8):
        for promptInstance in list(zip(promptData['instructions'], promptData['positions'])):
            prompt = self.__truncate_prompt(promptInstance[0])
            mask = self.__create_img_mask(promptInstance[1], init_image.size)
            init_image = self.pipe_img2img(prompt=prompt, image=init_image, strength=strength,mask_image = mask, num_inference_steps=103).images[0]
        # self.__save_image(init_image)
        torch.cuda.empty_cache()
        return init_image
    
