import os
import csv
import pickle
import collections
import numpy as np
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from keras.utils import pad_sequences
from keras.preprocessing import sequence
from keras.preprocessing import text
from keras.models import load_model
from csv import writer

MODELS_DIR = "models"
DATA_DIR = "unzipped"
TRUMP_TWEETS_PATH = os.path.join(DATA_DIR, "trumptweets.csv")

DIMENSIONS = ["IE", "NS", "FT", "PJ"]
MODEL_BATCH_SIZE = 128
TOP_WORDS = 2500
MAX_POST_LENGTH = 40
EMBEDDING_VECTOR_LENGTH = 20

final = ""

x_test = []
with open(TRUMP_TWEETS_PATH, "r", encoding="ISO-8859-1") as f:
    reader = csv.reader(f)
    for row in f:
        x_test.append(row)

types = [
    "INFJ",
    "ENTP",
    "INTP",
    "INTJ",
    "ENTJ",
    "ENFJ",
    "INFP",
    "ENFP",
    "ISFP",
    "ISTP",
    "ISFJ",
    "ISTJ",
    "ESTP",
    "ESFP",
    "ESTJ",
    "ESFJ",
]
types = [x.lower() for x in types]
lemmatizer = WordNetLemmatizer()
stop_words = stopwords.words("english")


def lemmatize(x):
    lemmatized = []
    for post in x:
        temp = post.lower()
        for type_ in types:
            temp = temp.replace(" " + type_, "")
        temp = " ".join(
            [
                lemmatizer.lemmatize(word)
                for word in temp.split(" ")
                if (word not in stop_words)
            ]
        )
        lemmatized.append(temp)
    return np.array(lemmatized)


for k in range(len(DIMENSIONS)):
    model = load_model(
        os.path.join(MODELS_DIR, "rnn_model_{}.h5".format(DIMENSIONS[k]))
    )
    tokenizer = None
    with open(
        os.path.join(MODELS_DIR, "rnn_tokenizer_{}.pkl".format(DIMENSIONS[k])), "rb"
    ) as f:
        tokenizer = pickle.load(f)

    def preprocess(x):
        lemmatized = lemmatize(x)
        tokenized = tokenizer.texts_to_sequences(lemmatized)
        return pad_sequences(tokenized, maxlen=MAX_POST_LENGTH)

    predictions = model.predict(preprocess(x_test))
    prediction = float(sum(predictions) / len(predictions))
    print(DIMENSIONS[k])
    print(prediction)
    if prediction >= 0.5:
        final += DIMENSIONS[k][1]
    else:
        final += DIMENSIONS[k][0]


with open('trait.csv', 'w') as f_object:
    # Pass this file object to csv.writer()
    # and get a writer object
    writer_object = writer(f_object)
    print("")
    print("Final prediction: {}".format(final))
    # final = "ESFJ"  # Replace with the actual final prediction value

    writer_object.writerow(["Final prediction:", "Traits"]) 
    # writer_object.writerow(["Final prediction:", final])  # Use a list
    DATA_DIR = "data"
    csv_file = os.path.join(DATA_DIR, "profession.csv")

    # Input the personality type you want to search for
    desired_type = final

    # Open the CSV file and search for the desired type
    with open(csv_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row["type"] == desired_type:
                traits = row["traits"]
                career = row["career"]
                personalities = row["eminent personalities"]
                # personalities = row["personalities"]
                print(f"Traits for {desired_type}: {traits}")
                print(f"Career you can look into : {career}")
                print(f"Personalities you match : {personalities}")
                writer_object.writerow([f"Traits for {desired_type}:", traits])  # Use a list
                writer_object.writerow([f"Career options for {desired_type}:", career])  
                writer_object.writerow([f"Similar famous personalities for {desired_type}:", personalities])  
                break
        else:
            print(f"Personality type {desired_type} not found in the CSV file.")
            writer_object.writerow([f"Personality type {desired_type} not found in the CSV file."])  # Use a list
