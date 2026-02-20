# Namma Schemes - AI-Powered Government Portal

## 🎯 Overview
National-scale digital governance platform with ML-based eligibility prediction and personalized scheme recommendations.

## ✨ Features

### Core Features
- **AI-Powered Eligibility Prediction**: Machine learning model predicts scheme eligibility with confidence scores
- **Personalized Recommendations**: Top 5 scheme recommendations based on user profile
- **Missed Benefits Alert**: Identifies schemes users are eligible for but haven't applied
- **Multi-language Support**: English and Tamil
- **Government-Style UI**: Inspired by UMANG and National Portal of India
- **Comprehensive Database**: 15+ schemes across 12 categories

### Categories Covered
1. 📚 Education & Scholarships
2. 🏥 Health & Insurance
3. 🌾 Agriculture & Farming
4. 🏠 Housing & Urban
5. 👶 Women & Children
6. 💰 Pensions & Social Security
7. 💼 Employment & Skills
8. ♿ Disabled Persons
9. 👴 Senior Citizens
10. 🤝 Widow Welfare
11. 🏳️⚧️ Transgender Support
12. 🕌 Minority Welfare

## 🚀 Quick Start

### Installation
```bash
cd streamlit_app
pip install -r requirements.txt
```

### Train ML Model
```bash
python models/ml_model.py
```

### Run Application
```bash
streamlit run app.py
```

Or simply double-click `RUN_STREAMLIT.bat`

## 📊 Technical Architecture

### Tech Stack
- **Frontend**: Streamlit
- **ML Model**: Scikit-learn (Random Forest Classifier)
- **Data Processing**: Pandas, NumPy
- **Visualization**: Plotly

### ML Model Details
- **Algorithm**: Random Forest Classifier
- **Features**: Age, Income, Gender, Category
- **Training Data**: Synthetic data generated from scheme eligibility criteria
- **Output**: Probability score (0-1) indicating eligibility likelihood

### File Structure
```
streamlit_app/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── data/
│   └── schemes.json      # Comprehensive schemes database
├── models/
│   ├── ml_model.py       # ML training and prediction
│   ├── eligibility_model.pkl
│   ├── gender_encoder.pkl
│   └── category_encoder.pkl
└── utils/
    └── recommender.py    # Recommendation engine
```

## 🎓 SDG Alignment

This project contributes to:
- **SDG 1**: No Poverty - Connecting citizens to welfare schemes
- **SDG 10**: Reduced Inequalities - Equal access to government benefits
- **SDG 16**: Peace, Justice and Strong Institutions - Transparent governance
- **SDG 9**: Industry, Innovation and Infrastructure - Digital governance platform

## 📈 Scalability

### Current Scale
- 15 schemes
- 12 categories
- All India coverage

### Future Scale
- 500+ central schemes
- 1000+ state schemes
- Real-time API integration with government databases
- Blockchain-based application tracking

## 🔒 Security Features
- No personal data storage
- Privacy-first design
- Secure eligibility checking
- No authentication required for browsing

## 🎯 Use Cases

### For Citizens
- Discover eligible schemes
- Check eligibility instantly
- Get personalized recommendations
- Track missed benefits

### For Government
- Increase scheme awareness
- Improve benefit delivery
- Reduce application errors
- Data-driven policy insights

## 📱 Deployment Options

### Streamlit Cloud (Free)
```bash
streamlit run app.py
```

### Render
1. Connect GitHub repo
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `streamlit run app.py`

### AWS EC2
```bash
sudo apt update
sudo apt install python3-pip
pip3 install -r requirements.txt
streamlit run app.py --server.port 80
```

## 🏆 Competition Ready

This project is suitable for:
- Smart India Hackathon
- National-level hackathons
- University project submissions
- Research paper publication

## 📄 Documentation

Complete documentation includes:
- System architecture
- ML model explanation
- API documentation
- User guide
- Deployment guide

## 🤝 Contributing

This is an academic/competition project. For improvements:
1. Add more schemes to `data/schemes.json`
2. Enhance ML model accuracy
3. Add more languages
4. Improve UI/UX

## 📞 Support

For queries: support@nammaschemes.gov.in

## 📜 License

Educational/Research Use Only

---

**Developed for Digital India Initiative**
**Empowering Citizens Through Technology**
