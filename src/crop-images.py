import os
from PIL import Image

src_path = "/Users/apple/.gemini/antigravity-ide/brain/3f6ff3a2-1629-4621-b703-1ebc5d4a5dfb/media__1785052705502.jpg"
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
alt_src_path = os.path.join(project_root, "public", "images", "about", "factory_grid.jpg")
dest_dir = os.path.join(project_root, "public", "images", "about")

os.makedirs(dest_dir, exist_ok=True)

try:
    if os.path.exists(src_path):
        img = Image.open(src_path)
        print("Successfully opened direct source")
    elif os.path.exists(alt_src_path):
        img = Image.open(alt_src_path)
        print("Successfully opened alternative source")
    else:
        raise Exception("Source image not found. Please copy the screenshot first.")

    w, h = img.size
    # Crop into 4 equal quadrants
    # Quadrant 1 (Top Left)
    q1 = img.crop((0, 0, w//2, h//2))
    q1.save(os.path.join(dest_dir, "factory1.png"))
    # Quadrant 2 (Top Right)
    q2 = img.crop((w//2, 0, w, h//2))
    q2.save(os.path.join(dest_dir, "factory2.png"))
    # Quadrant 3 (Bottom Left)
    q3 = img.crop((0, h//2, w//2, h))
    q3.save(os.path.join(dest_dir, "factory3.png"))
    # Quadrant 4 (Bottom Right)
    q4 = img.crop((w//2, h//2, w, h))
    q4.save(os.path.join(dest_dir, "factory4.png"))
    print("Successfully cropped all 4 images")
except Exception as e:
    print("Error during crop:", str(e))
