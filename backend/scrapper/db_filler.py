import requests
import urllib.request
from PIL import Image
import os


def main():
    with open('image_urls.txt') as f:
        urls = f.read().splitlines()

    for url in urls:
        image = Image.open(urllib.request.urlopen(url))

        with open('temp.jpg', 'wb') as f:
            image.save(f)

        files = {'src': open('temp.jpg', 'rb')}
        data = {'title': 'Image'}
        response = requests.post('http://127.0.0.1:8000/api/images/create/', data=data, files=files)

        f.close()
        os.remove('temp.jpg')

        print(response.content)


if __name__ == '__main__':
    main()
