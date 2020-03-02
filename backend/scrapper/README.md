# Image Scrapper
Allows to fill the database with image search result of [pinterest.com]().

## Requirements
1. Python 3
2. Selenium
`pip install selenium`
3. Chrome driver. Download the same version as your Chrome browser [here](https://chromedriver.chromium.org/downloads).
It should be located in this directory
4. [Pinterest](pinterest.com) account

## Usage
1. Scrapping image urls via pinterest:
`
python pinterest_scrapper.py %search_term%
`
2. Posting images via REST API to the server:
`
python db_filler.py
`