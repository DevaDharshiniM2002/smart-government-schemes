import json
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from models.ml_model import predict_eligibility

def get_recommendations(age, income, gender, state='all', top_n=5):
    with open('data/schemes.json', 'r') as f:
        schemes = json.load(f)
    
    recommendations = []
    
    for scheme in schemes:
        if scheme['state'] != 'all' and scheme['state'] != state:
            continue
        
        if scheme['gender'] != 'all' and scheme['gender'] != gender:
            continue
        
        if age < scheme['age_min'] or age > scheme['age_max']:
            continue
        
        if income < scheme['min_income'] or income > scheme['max_income']:
            continue
        
        probability = predict_eligibility(age, income, gender, scheme['category'])
        
        recommendations.append({
            'scheme': scheme,
            'probability': probability,
            'confidence': 'High' if probability > 0.7 else 'Medium' if probability > 0.4 else 'Low'
        })
    
    recommendations.sort(key=lambda x: x['probability'], reverse=True)
    return recommendations[:top_n]

def get_missed_benefits(age, income, gender, applied_schemes, state='all'):
    with open('data/schemes.json', 'r') as f:
        schemes = json.load(f)
    
    applied_ids = [s['id'] for s in applied_schemes]
    missed = []
    
    for scheme in schemes:
        if scheme['id'] in applied_ids:
            continue
        
        if scheme['state'] != 'all' and scheme['state'] != state:
            continue
        
        if scheme['gender'] != 'all' and scheme['gender'] != gender:
            continue
        
        if age >= scheme['age_min'] and age <= scheme['age_max']:
            if income >= scheme['min_income'] and income <= scheme['max_income']:
                probability = predict_eligibility(age, income, gender, scheme['category'])
                if probability > 0.5:
                    missed.append({
                        'scheme': scheme,
                        'probability': probability
                    })
    
    return missed
