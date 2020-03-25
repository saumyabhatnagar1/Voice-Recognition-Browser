# import libraries
import requests
from bs4 import BeautifulSoup as bs


app_url = 'https://www.iiitnr.ac.in/content/fractal-academics'

# crawling the page. This might take a few seconds
page = requests.get( app_url ).text




soup = bs(page, 'lxml')

#print(soup.prettify())

div = soup.find('div',class_='leftcontent justify')

#print(div.text)

data = div.text

print(data)


