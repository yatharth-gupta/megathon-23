from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
app = FastAPI()
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder,StandardScaler
import json

origins = ["http://localhost:3000", "http://192.168.198.7:3000"]
 # Replace with the actual frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def calculate_ocean_scores(x, age, gender):
    ocean = {'E':0,'N':0,'A':0,'C':0,'O':0}
    mapping = {0:'E',1:'N',2:'A',3:'C',4:'O'}
    print(ocean['E'])
    for i in range(50):
        ocean[mapping[int((i)/10)]] += x[i]
    for i in ocean.keys():
        print(i)
        ocean[i] = ocean[i]/10
    return ocean,age, gender



@app.post("/receive-data")
async def receive_data(data1 : dict):
    # Process the received data here
    # return {"age": age, "gender": gender, "selectedValues": selectedValues}
    try: 
        print("Data received")
        
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
        # api_output = calling_api()
        unstringify = json.loads(data1.get("selectedValues"))
        print(unstringify)
        v,a,g = calculate_ocean_scores(unstringify, data1.get("age"), data1.get("gender"))
        # convert v dictionary data to list
        v = list(v.values())
        if g == "Male":
            g = 1
        else:
            g = 0
        decision_scores = model.decision_function([[g,a,v[0],v[1],v[2],v[3],v[4]]])

        print(decision_scores)
        decision_scores = decision_scores[0]
        # bar plot with x-axis as the personality and y-axis as the decision scores
        plt.bar(inverse_transformations,decision_scores)
        plt.xlabel('Personality')
        plt.ylabel('Decision Scores')
        plt.show()
    except Exception as e:
        print("Error: ", str(e))
    



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=3001)
