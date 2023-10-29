from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import time
from typing import Dict
import csv
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder,StandardScaler
import pandas as pd

app = FastAPI()
sys_approch = "NAIVE"
# Enable CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this line
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

from pathlib import Path
from transformers import BertTokenizer, BertModel

import torch
import numpy as np

import re
import sys
import joblib

import tensorflow as tf
sys.path.append('/home/arya/Desktop/personality-prediction/utils')
import gen_utils as utils
import dataset_processors as dataset_processors


parent_dir = os.path.dirname(os.getcwd())
sys.path.insert(0, parent_dir)
sys.path.insert(0, os.getcwd())



if torch.cuda.is_available():
    DEVICE = torch.device("cuda")
    print("GPU found (", torch.cuda.get_device_name(torch.cuda.current_device()), ")")
    torch.cuda.set_device(torch.cuda.current_device())
    print("num device avail: ", torch.cuda.device_count())
else:
    DEVICE = torch.device("cpu")
    print("Running on cpu")


def softmax(x):
    exp_x = np.exp(x)
    return exp_x / np.sum(exp_x)


def get_bert_model(embed):
    if embed == "bert-base":
        tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        model = BertModel.from_pretrained("bert-base-uncased")

    elif embed == "bert-large":
        tokenizer = BertTokenizer.from_pretrained("bert-large-uncased")
        model = BertModel.from_pretrained("bert-large-uncased")

    elif embed == "albert-base":
        tokenizer = BertTokenizer.from_pretrained("albert-base-v2")
        model = BertModel.from_pretrained("albert-base-v2")

    elif embed == "albert-large":
        tokenizer = BertTokenizer.from_pretrained("albert-large-v2")
        model = BertModel.from_pretrained("albert-large-v2")

    else:
        print(f"Unknown pre-trained model: {embed}! Aborting...")
        sys.exit(0)

    return tokenizer, model


def load_finetune_model(op_dir, finetune_model, dataset):
    trait_labels = []

    if dataset == "kaggle":
        trait_labels = ["E", "N", "F", "J"]
    else:
        trait_labels = ["EXT", "NEU", "AGR", "CON", "OPN"]

    path_model = op_dir + "finetune_" + str(finetune_model).lower()
    # path_model = "/home/arya/Desktop/personality-prediction/finetune_models/explogs"
    # path_model = "finetune_models/explogs/expdata.csv"
    if not Path(path_model).is_dir():
        print(f"The directory with the selected model was not found: {path_model}")
        sys.exit(0)

    def abort_if_model_not_exist(model_name):
        if not Path(model_name).is_file():
            print(
                f"Model not found: {model_name}. Either the model was not trained or the model name is incorrect! Aborting..."
            )
            sys.exit(0)

    models = {}
    for trait in trait_labels:
        if re.search(r"MLP_LM", str(finetune_model).upper()):
            model_name = f"{path_model}/MLP_LM_{trait}.h5"
            print(f"Load model: {model_name}")
            abort_if_model_not_exist(model_name)
            model = tf.keras.models.load_model(model_name)

        elif re.search(r"SVM_LM", str(finetune_model).upper()):
            model_name = f"{path_model}/SVM_LM_{trait}.pkl"
            print(f"Load model: {model_name}")
            abort_if_model_not_exist(model_name)
            model = joblib.load(model_name)

        else:
            print(f"Unknown finetune model: {model_name}! Aborting...")
            sys.exit(0)

        models[trait] = model

    return models


def extract_bert_features(text, tokenizer, model, token_length, overlap=256):
    tokens = tokenizer.tokenize(text)
    n_tokens = len(tokens)

    start, segments = 0, []
    while start < n_tokens:
        end = min(start + token_length, n_tokens)
        segment = tokens[start:end]
        segments.append(segment)
        if end == n_tokens:
            break
        start = end - overlap

    embeddings_list = []
    with torch.no_grad():
        for segment in segments:
            inputs = tokenizer(
                " ".join(segment), return_tensors="pt", padding=True, truncation=True
            )
            inputs = inputs.to(DEVICE)
            outputs = model(**inputs)
            embeddings = outputs.last_hidden_state[:, 0, :].cpu().numpy()
            embeddings_list.append(embeddings)

    if len(embeddings_list) > 1:
        embeddings = np.concatenate(embeddings_list, axis=0)
        embeddings = np.mean(embeddings, axis=0, keepdims=True)
    else:
        embeddings = embeddings_list[0]

    return embeddings


def predict(new_text, embed, op_dir, token_length, finetune_model, dataset):
    new_text_pre = dataset_processors.preprocess_text(new_text)

    tokenizer, model = get_bert_model(embed)

    model.to(DEVICE)

    new_embeddings = extract_bert_features(new_text_pre, tokenizer, model, token_length)
    print("finetune model: ", finetune_model)
    models, predictions = load_finetune_model(op_dir, finetune_model, dataset), {}

    for trait, model in models.items():
        try:
            prediction = model.predict(new_embeddings)
            prediction = softmax(prediction)
            prediction = prediction[0][1]

            # find the index of the highest probability (predicted class)
            predictions[trait] = prediction  # get the probability of yes

        except BaseException as e:
            print(f"Failed to make prediction: {e}")

    print(f"\nPersonality predictions using {str(finetune_model).upper()}:")
    a = []
    for trait, prediction in predictions.items():
        binary_prediction = "Yes" if prediction > 0.5 else "No"
        print(f"{trait}: {binary_prediction}: {prediction:.3f}")
        # print(prediction)
        a.append(prediction)
    return np.array(a)


import matplotlib.pyplot as plt

def create_bar_chart(values, categories, title):
   
    if len(values) != len(categories):
        raise ValueError("The number of values and categories must be the same.")

    # Create a bar chart
    plt.figure(figsize=(8, 4))  # Set the figure size (width, height)
    plt.bar(categories, values, color='skyblue')
    plt.xlabel("Categories")
    plt.ylabel("Values")
    plt.title(title)

    # Show the chart
    plt.show()


dataset = "essays"
token_length = 512
batch_size = 32
embed = 'bert-base'
op_dir = 'finetune_models/pkl_data/'
mode = ""
embed_mode = ""
finetune_model = "MLP_LM"

class QuestionData(BaseModel):
    question1: str
    question2: str
    question3: str
    question4: str
    question5: str

@app.post("/submit-questions/")
async def submit_questions(questions: QuestionData):
    # Here, you can process and store the received questions as needed
    # For example, you can print them to the console
    print(f"Question 1: {questions.question1}")
    print(f"Question 2: {questions.question2}")
    print(f"Question 3: {questions.question3}")
    print(f"Question 4: {questions.question4}")
    print(f"Question 5: {questions.question5}")
    
    a1 = predict(questions.question1, embed, op_dir, token_length, finetune_model, dataset)
    a2 = predict(questions.question2, embed, op_dir, token_length, finetune_model, dataset)
    a3 = predict(questions.question3, embed, op_dir, token_length, finetune_model, dataset)
    a4 = predict(questions.question4, embed, op_dir, token_length, finetune_model, dataset)
    a5 = predict(questions.question5, embed, op_dir, token_length, finetune_model, dataset)
    
    a = (a1+a2+a3+a4+a5)/5
    b  =a*6
    # You can also save the data to a database, file, or perform any other required actions.
    categories = ["EXT", "NEU", "AGR", "CON", "OPN"]
    # create_bar_chart(a1, categories, "Bar chart after O")
    # create_bar_chart(a2, categories, "Bar chart after C")
    # create_bar_chart(a3, categories, "Bar chart after E")
    # create_bar_chart(a4, categories, "Bar chart after A")
    # create_bar_chart(a5, categories, "Bar chart after N")
    create_bar_chart(a, categories, "Final Bar chart after avergae")

    train = pd.read_csv('train.csv')
    test = pd.read_csv('test.csv')

    # change the last column name
    train = train.rename(columns={'Personality (Class label)':'Personality'})
    test = test.rename(columns={'Personality (class label)':'Personality'})

    # concat train and test
    data = pd.concat([train,test],axis=0)

    # label encoder
    label_encoder = LabelEncoder()
    data['Gender'] = label_encoder.fit_transform(data['Gender'])
    data['Personality'] = label_encoder.fit_transform(data['Personality'])
    inverse_transformations = label_encoder.inverse_transform([0,1,2,3,4])

    data = np.array(data)
    data[:,2:7][data[:,2:7] > 7] = 7
    # subtract 1 from column 2 to 6
    data[:,2:7] = data[:,2:7]-1
    print(max(data[:,2:7].flatten()))
    # standardize the data
    scaler = StandardScaler()
    data[:,:-1] = scaler.fit_transform(data[:,:-1])


    x_data = data[:,:-1]
    y_data = data[:,-1]

    model = LogisticRegression(multi_class='multinomial', solver='newton-cg',max_iter=1000)
    model.fit(x_data, y_data)
    decision_scores = model.decision_function([[1,20,b[4],b[1],b[3],b[2],b[0]]])
    print(decision_scores)
    decision_scores = decision_scores[0]
    # bar plot with x-axis as the personality and y-axis as the decision scores
    plt.bar(inverse_transformations,decision_scores)
    plt.xlabel('Personality')
    plt.ylabel('Decision Scores')
    plt.show()
    return {"message": "Questions submitted successfully"}
    

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=3001)