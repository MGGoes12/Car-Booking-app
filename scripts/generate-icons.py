from PIL import Image
import os
os.makedirs('src/assets', exist_ok=True)
for size, path in [(192, 'src/assets/icon-192.png'), (512, 'src/assets/icon-512.png')]:
    img = Image.new('RGBA', (size, size), (47, 133, 90, 255))
    img.save(path)
print('icons created')
