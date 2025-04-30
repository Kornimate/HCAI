from io import BytesIO
from PIL import Image
import base64
import torch

def load_image(image_bytes, size): #size can be 256,512,1024
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = image.resize((size, size))
    return image

def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")

def generate_random_noise(size):
    random_noise = torch.randn(3, size, size)  # 3 channels (RGB)
    random_noise = (random_noise - random_noise.min()) / (random_noise.max() - random_noise.min())
    random_noise = (random_noise * 255).byte()
    random_noise = random_noise.permute(1, 2, 0)
    return Image.fromarray(random_noise.numpy())