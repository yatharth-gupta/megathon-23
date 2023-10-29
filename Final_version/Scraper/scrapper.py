# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service

# options = webdriver.ChromeOptions()
# options.add_argument("/home/user/Desktop/MEGATHON")
# options.add_argument("--disable-extensions")
# options.add_argument("--enable-javascript")
# # Path to the ChromeDriver executable
# chromedriver_path = '/home/user/Downloads/chromedriver'

# # Create a Service object with the ChromeDriver path
# service = Service(chromedriver_path)

# # Start the WebDriver with the configured Service
# driver = webdriver.Chrome(service=service,options=options)
# # Replace 'YOUR_DRIVER_PATH' with the path to the driver executable you downloaded
# # driver = webdriver.Chrome(executable_path='/home/user/Downloads/chromedriver', options=options)

# # Replace 'URL_HERE' with the URL of the page you want to scrape
# url = 'https://twitter.com/narendramodi'

# # Open the webpage
# driver.get(url)

# # Wait for a few seconds to let the page load (you may need to adjust the timing)
# driver.implicitly_wait(5)

# # Extract the text content from the page
# page_content = driver.page_source

# # Close the browser
# driver.quit()

# # Now, you can use Beautiful Soup to parse the page conten
# 
# t
# from bs4 import BeautifulSoup

# soup = BeautifulSoup(page_content, 'html.parser')

# # Extract specific elements, e.g., all paragraph (<p>) tags
# paragraphs = soup.find_all('p')

# # Print the text within the paragraphs
# for paragraph in paragraphs:
#     print(paragraph.get_text())

# Import Dependencies
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from time import sleep

PATH = "/home/user/Downloads/chromedriver"
driver = webdriver.Chrome(PATH)
driver.get("https://twitter.com/login")
driver.maximize_window()
subject = "Elon Musk"


# Setup the log in
sleep(3)
username = driver.find_element(By.XPATH,"//input[@name='text']")
username.send_keys("Yathart11575899")
next_button = driver.find_element(By.XPATH,"//span[contains(text(),'Next')]")
next_button.click()

sleep(3)
password = driver.find_element(By.XPATH,"//input[@name='password']")
password.send_keys('yatharth_gupta')
log_in = driver.find_element(By.XPATH,"//span[contains(text(),'Log in')]")
log_in.click()

# Search item and fetch it
sleep(3)
search_box = driver.find_element(By.XPATH,"//input[@data-testid='SearchBox_Search_Input']")
search_box.send_keys(subject)
search_box.send_keys(Keys.ENTER)

sleep(3)
people = driver.find_element(By.XPATH,"//span[contains(text(),'People')]")
people.click()

sleep(3)
profile = driver.find_element(By.XPATH,"//*[@id='react-root']/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/section/div/div/div[1]/div/div/div/div/div[2]/div/div[1]/div/div[1]/a/div/div[1]/span/span[1]")
profile.click()



# UserTag = driver.find_element(By.XPATH,"//div[@data-testid='User-Names']").text
# TimeStamp = driver.find_element(By.XPATH,"//time").get_attribute('datetime')
# Tweet = driver.find_element(By.XPATH,"//div[@data-testid='tweetText']").text
# Reply = driver.find_element(By.XPATH,"//div[@data-testid='reply']").text
# reTweet = driver.find_element(By.XPATH,"//div[@data-testid='retweet']").text
# Like = driver.find_element(By.XPATH,"//div[@data-testid='like']").text


UserTags=[]
TimeStamps=[]
Tweets=[]
Replys=[]
reTweets=[]
Likes=[]

articles = driver.find_elements(By.XPATH,"//article[@data-testid='tweet']")
print(articles)
while True:
    for article in articles:
        UserTag = driver.find_element(By.XPATH,".//div[@data-testid='User-Name']").text
        UserTags.append(UserTag)
        
        TimeStamp = driver.find_element(By.XPATH,".//time").get_attribute('datetime')
        TimeStamps.append(TimeStamp)
        
        Tweet = driver.find_element(By.XPATH,".//div[@data-testid='tweetText']").text
        Tweets.append(Tweet)
        
        Reply = driver.find_element(By.XPATH,".//div[@data-testid='reply']").text
        Replys.append(Reply)
        
        reTweet = driver.find_element(By.XPATH,".//div[@data-testid='retweet']").text
        reTweets.append(reTweet)
        
        Like = driver.find_element(By.XPATH,".//div[@data-testid='like']").text
        Likes.append(Like)
    driver.execute_script('window.scrollTo(0,document.body.scrollHeight);')
    sleep(3)
    articles = driver.find_elements(By.XPATH,"//article[@data-testid='tweet']")
    Tweets2 = list(set(Tweets))
    if len(Tweets2) > 5:
        break


print(len(UserTags),
len(TimeStamps),
len(Tweets),
len(Replys),
len(reTweets),
len(Likes))
print(Tweets)


import pandas as pd

df = pd.DataFrame(zip(UserTags,TimeStamps,Tweets,Replys,reTweets,Likes)
                  ,columns=['UserTags','TimeStamps','Tweets','Replys','reTweets','Likes'])

df.head()
