import pandas as pd
import re
import emoji
from nltk.tokenize import TweetTokenizer

def clean(text):
    # Remove hyperlinks, hashtags, smileys, and emojis
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'#\w+', '', text)
    text = re.sub(r':[)(]', '', text)
    # text = ''.join(c for c in text if c not in emoji.UNICODE_EMOJI)
    return text