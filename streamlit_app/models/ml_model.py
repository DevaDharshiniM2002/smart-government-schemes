import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import json

def train_model():
    with open('data/schemes.json', 'r') as f:
        schemes = json.load(f)
    
    # Generate training data
    data = []
    for scheme in schemes:
        for _ in range(50):
            age = np.random.randint(scheme['age_min'], scheme['age_max'] + 1)
            income = np.random.randint(scheme['min_income'], scheme['max_income'] + 1)
            gender = scheme['gender'] if scheme['gender'] != 'all' else np.random.choice(['male', 'female', 'transgender'])
            eligible = 1
            data.append({
                'age': age,
                'income': income,
                'gender': gender,
                'category': scheme['category'],
                'eligible': eligible,
                'scheme_id': scheme['id']
            })
        
        for _ in range(30):
            age = np.random.randint(18, 100)
            income = np.random.randint(0, 2000000)
            gender = np.random.choice(['male', 'female', 'transgender'])
            eligible = 0
            data.append({
                'age': age,
                'income': income,
                'gender': gender,
                'category': scheme['category'],
                'eligible': eligible,
                'scheme_id': scheme['id']
            })
    
    df = pd.DataFrame(data)
    
    # Encode categorical variables
    le_gender = LabelEncoder()
    le_category = LabelEncoder()
    
    df['gender_encoded'] = le_gender.fit_transform(df['gender'])
    df['category_encoded'] = le_category.fit_transform(df['category'])
    
    X = df[['age', 'income', 'gender_encoded', 'category_encoded']]
    y = df['eligible']
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    joblib.dump(model, 'models/eligibility_model.pkl')
    joblib.dump(le_gender, 'models/gender_encoder.pkl')
    joblib.dump(le_category, 'models/category_encoder.pkl')
    
    return model, le_gender, le_category

def predict_eligibility(age, income, gender, category):
    try:
        model = joblib.load('models/eligibility_model.pkl')
        le_gender = joblib.load('models/gender_encoder.pkl')
        le_category = joblib.load('models/category_encoder.pkl')
    except:
        model, le_gender, le_category = train_model()
    
    gender_encoded = le_gender.transform([gender])[0]
    category_encoded = le_category.transform([category])[0]
    
    X = np.array([[age, income, gender_encoded, category_encoded]])
    probability = model.predict_proba(X)[0][1]
    
    return probability

if __name__ == '__main__':
    train_model()
    print("Model trained successfully!")
