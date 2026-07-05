import os
import urllib.request
from PIL import Image

# Map of slug to Unsplash image ID
IMAGES = {
    "how-to-write-quiz-questions": "photo-1454165804606-c3d57bc86b40",
    "10-ways-teachers-saving-hours-ai": "photo-1488590528505-98d2b5aba04b",
    "turn-any-pdf-into-practice-quiz": "photo-1516321497487-e288fb19713f",
    "create-quiz-in-minutes": "photo-1543269865-cbf427effbad",
    "best-question-types-assessing-understanding": "photo-1434030216411-0b793f4b4173",
    "how-to-write-good-multiple-choice-questions": "photo-1456513080510-7bf3a84b82f8",
    "how-to-assess-reading-comprehension": "photo-1506880018603-83d5b814b5a6",
    "formative-vs-summative-assessment-explained": "photo-1503676260728-1c00da094a0b",
    "make-worksheet-that-helps-learning": "photo-1588072432836-e10032774350",
    "time-saving-tips-for-grading": "photo-1484480974693-6ca0a78fb36b",
    "how-to-differentiate-quizzes": "photo-1516321318423-f06f85e504b3"
}

def main():
    output_dir = os.path.join("public", "blog")
    os.makedirs(output_dir, exist_ok=True)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    
    for slug, photo_id in IMAGES.items():
        dest_path = os.path.join(output_dir, f"{slug}.webp")
        if os.path.exists(dest_path):
            print(f"Skipping {slug}, already exists.")
            continue
            
        url = f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=1000&q=80"
        temp_raw = f"temp_{slug}.jpg"
        
        print(f"Downloading {slug} from Unsplash ID {photo_id}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response, open(temp_raw, 'wb') as out_file:
                out_file.write(response.read())
            
            # Process with Pillow
            with Image.open(temp_raw) as img:
                # Target: 16:9 ratio, 800x450
                target_w = 800
                target_h = 450
                
                # Resize and crop to 16:9
                img_ratio = img.width / img.height
                target_ratio = target_w / target_h
                
                if img_ratio > target_ratio:
                    # Image is wider than 16:9: height is limiting
                    new_height = img.height
                    new_width = int(new_height * target_ratio)
                    offset = (img.width - new_width) // 2
                    img_cropped = img.crop((offset, 0, offset + new_width, new_height))
                else:
                    # Image is taller than 16:9: width is limiting
                    new_width = img.width
                    new_height = int(new_width / target_ratio)
                    offset = (img.height - new_height) // 2
                    img_cropped = img.crop((0, offset, new_width, offset + new_height))
                
                img_resized = img_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
                img_resized.save(dest_path, "WEBP", quality=80)
                
            file_size_kb = os.path.getsize(dest_path) / 1024
            print(f"Saved {dest_path} ({file_size_kb:.1f} KB)")
            
        except Exception as e:
            print(f"Error processing {slug}: {e}")
        finally:
            if os.path.exists(temp_raw):
                os.remove(temp_raw)

if __name__ == "__main__":
    main()
