import streamlit as st
import json
import pandas as pd
import sys
import os
sys.path.append(os.path.dirname(__file__))
from utils.recommender import get_recommendations, get_missed_benefits
from models.ml_model import train_model
from utils.auth import show_auth_page, logout
from utils.voice_search import show_voice_search, add_voice_search_styles

# Page config
st.set_page_config(
    page_title="Namma Schemes - Government Portal",
    page_icon="🏛️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for Official Government Portal Theme
st.markdown("""
<style>
    /* Government Color Palette */
    :root {
        --primary-blue: #1B5E9E;
        --dark-blue: #0F3C6E;
        --light-bg: #F4F7FB;
        --saffron: #FF9933;
        --green: #138808;
        --text-dark: #222222;
    }
    
    /* Remove Streamlit default padding */
    .main .block-container {
        padding-top: 0rem;
        padding-bottom: 0rem;
        max-width: 100%;
    }
    
    /* Top Government Strip */
    .gov-strip {
        background: var(--dark-blue);
        color: white;
        padding: 8px 24px;
        font-size: 0.85rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    /* Main Header */
    .main-header {
        background: white;
        padding: 20px 24px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-bottom: 3px solid var(--primary-blue);
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .logo-section h1 {
        color: var(--primary-blue);
        font-size: 1.8rem;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0;
    }
    
    .logo-section p {
        color: #666;
        font-size: 0.9rem;
        margin: 4px 0 0 0;
    }
    
    /* Navigation Bar */
    .nav-bar {
        background: var(--primary-blue);
        padding: 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .nav-menu {
        display: flex;
        justify-content: center;
        gap: 0;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    .nav-item {
        color: white;
        padding: 14px 20px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        border-bottom: 3px solid transparent;
    }
    
    .nav-item:hover {
        background: rgba(255,255,255,0.1);
        border-bottom-color: white;
    }
    
    .nav-item.active {
        background: rgba(255,255,255,0.15);
        border-bottom-color: white;
    }
    
    /* Hero Section */
    .hero-section {
        background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
        padding: 60px 24px;
        text-align: center;
        color: white;
    }
    
    .hero-section h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 16px;
    }
    
    .hero-section p {
        font-size: 1.2rem;
        margin-bottom: 32px;
        opacity: 0.95;
    }
    
    /* Buttons */
    .btn-primary {
        background: var(--primary-blue);
        color: white;
        padding: 12px 28px;
        border-radius: 6px;
        border: none;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
    }
    
    .btn-primary:hover {
        background: var(--dark-blue);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    .btn-secondary {
        background: white;
        color: var(--primary-blue);
        padding: 12px 28px;
        border-radius: 6px;
        border: 2px solid white;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
    }
    
    .btn-secondary:hover {
        background: transparent;
        color: white;
    }
    
    /* Category Cards */
    .category-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin: 40px 0;
    }
    
    .category-card {
        background: white;
        padding: 30px 20px;
        text-align: center;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        transition: all 0.3s;
        cursor: pointer;
    }
    
    .category-card:hover {
        border-color: var(--primary-blue);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-4px);
    }
    
    .category-icon {
        font-size: 3rem;
        margin-bottom: 16px;
    }
    
    .category-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 12px;
    }
    
    .view-schemes-btn {
        background: var(--light-bg);
        color: var(--primary-blue);
        padding: 8px 20px;
        border-radius: 4px;
        border: 1px solid var(--primary-blue);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .view-schemes-btn:hover {
        background: var(--primary-blue);
        color: white;
    }
    
    /* Scheme Cards */
    .scheme-card {
        background: white;
        padding: 24px;
        border: 1px solid #E0E0E0;
        border-left: 4px solid var(--primary-blue);
        margin: 16px 0;
        border-radius: 4px;
    }
    
    .scheme-title {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--primary-blue);
        margin-bottom: 12px;
    }
    
    /* AI Highlight Section */
    .ai-section {
        background: #FFF9E6;
        border: 2px solid var(--saffron);
        padding: 40px;
        border-radius: 8px;
        text-align: center;
        margin: 40px 0;
    }
    
    .ai-section h2 {
        color: var(--primary-blue);
        font-size: 1.8rem;
        margin-bottom: 16px;
    }
    
    /* Footer */
    .footer {
        background: var(--dark-blue);
        color: white;
        padding: 40px 24px 20px;
        margin-top: 60px;
    }
    
    .footer-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        margin-bottom: 30px;
    }
    
    .footer h3 {
        font-size: 1.1rem;
        margin-bottom: 16px;
        color: white;
    }
    
    .footer a {
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        display: block;
        margin: 8px 0;
    }
    
    .footer a:hover {
        color: white;
    }
    
    .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.2);
        padding-top: 20px;
        text-align: center;
        color: rgba(255,255,255,0.8);
    }
    
    /* Streamlit Button Override */
    .stButton>button {
        background: var(--primary-blue);
        color: white;
        font-weight: 600;
        border: none;
        padding: 12px 28px;
        border-radius: 6px;
        text-transform: uppercase;
    }
    
    .stButton>button:hover {
        background: var(--dark-blue);
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False
if 'user' not in st.session_state:
    st.session_state.user = None
if 'user_profile' not in st.session_state:
    st.session_state.user_profile = None
if 'show_auth' not in st.session_state:
    st.session_state.show_auth = False

# Check authentication
if st.session_state.show_auth:
    show_auth_page()
    st.stop()

# Load schemes
@st.cache_data
def load_schemes():
    with open('data/schemes.json', 'r') as f:
        return json.load(f)

schemes = load_schemes()
add_voice_search_styles()

# Top Government Strip
st.markdown("""
<div class="gov-strip">
    <div>🇮🇳 Government of India | भारत सरकार</div>
    <div>A+ A A- | English | तमिऴ | Skip to main content</div>
</div>
""", unsafe_allow_html=True)

# Login/Signup buttons
if not st.session_state.logged_in:
    col1, col2, col3 = st.columns([7, 1, 1])
    with col2:
        if st.button("🔑 LOGIN", key="login_top", use_container_width=True):
            st.session_state.show_auth = True
            st.rerun()
    with col3:
        if st.button("📝 REGISTER", key="signup_top", use_container_width=True):
            st.session_state.show_auth = True
            st.rerun()
else:
    col1, col2 = st.columns([8, 1])
    with col2:
        if st.button("🚪 LOGOUT", use_container_width=True):
            logout()

# Main Header
st.markdown("""
<div class="main-header">
    <div class="header-content">
        <div class="logo-section">
            <h1>🏛️ NAMMA SCHEMES</h1>
            <p>Unified Government Welfare Portal | அரசாங்க நலன் திட்டங்கள்</p>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Navigation Bar
st.markdown("""
<div class="nav-bar">
    <div class="nav-menu">
        <div class="nav-item active">🏠 HOME</div>
        <div class="nav-item">📜 SCHEMES</div>
        <div class="nav-item">✅ CHECK ELIGIBILITY</div>
        <div class="nav-item">🎯 RECOMMENDATIONS</div>
        <div class="nav-item">🎤 VOICE SEARCH</div>
        <div class="nav-item">ℹ️ ABOUT</div>
    </div>
</div>
""", unsafe_allow_html=True)

# Hero Section
st.markdown("""
<div class="hero-section">
    <h1>Find Your Government Benefits</h1>
    <p>AI-Powered Eligibility Checker | Personalized Scheme Recommendations</p>
</div>
""", unsafe_allow_html=True)

# Hero Buttons
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    subcol1, subcol2 = st.columns(2)
    with subcol1:
        if st.button("EXPLORE SCHEMES", key="hero_explore", use_container_width=True):
            pass
    with subcol2:
        if st.button("CHECK ELIGIBILITY", key="hero_check", use_container_width=True):
            pass

# Navigation Menu
st.markdown("""
<div class="nav-menu">
    <div class="nav-button">🏠 Home</div>
    <div class="nav-button">🔍 Browse Schemes</div>
    <div class="nav-button">✅ Check Eligibility</div>
    <div class="nav-button">🎯 Recommendations</div>
    <div class="nav-button">⚠️ Missed Benefits</div>
    <div class="nav-button">ℹ️ About</div>
</div>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image("https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg", width=100)
    st.title("Navigation")
    
    # User info
    if st.session_state.logged_in and st.session_state.user:
        st.success(f"Welcome, {st.session_state.user['name']}!")
    
    page = st.radio("Go to", ["🏠 Home", "🔍 Browse Schemes", "✅ Check Eligibility", "🎯 Recommendations", "⚠️ Missed Benefits", "🎤 Voice Search", "ℹ️ About"])
    
    st.markdown("---")
    st.markdown("### Language")
    lang = st.selectbox("Select Language", ["English", "தமிழ் (Tamil)"])

# Home Page
if page == "🏠 Home":
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Schemes", len(schemes))
    with col2:
        st.metric("Categories", len(set(s['category'] for s in schemes)))
    with col3:
        st.metric("States Covered", "All India")
    
    st.markdown("### 📋 Popular Categories")
    categories = {
        "education": "📚 Education & Scholarships",
        "health": "🏥 Health & Insurance",
        "agriculture": "🌾 Agriculture & Farming",
        "housing": "🏠 Housing & Urban",
        "women": "👶 Women & Children",
        "pensions": "💰 Pensions & Social Security",
        "employment": "💼 Employment & Skills",
        "disabled": "♿ Disabled Persons",
        "senior": "👴 Senior Citizens",
        "widow": "🤝 Widow Welfare",
        "transgender": "🏳️‍⚧️ Transgender Support",
        "minority": "🕌 Minority Welfare"
    }
    
    cols = st.columns(4)
    for idx, (key, label) in enumerate(categories.items()):
        with cols[idx % 4]:
            if st.button(label, key=key):
                st.session_state.selected_category = key

# Browse Schemes
elif page == "🔍 Browse Schemes":
    st.header("Browse All Schemes")
    
    category_filter = st.selectbox("Filter by Category", ["All"] + list(set(s['category'] for s in schemes)))
    search_query = st.text_input("🔍 Search schemes")
    
    filtered_schemes = schemes
    if category_filter != "All":
        filtered_schemes = [s for s in schemes if s['category'] == category_filter]
    if search_query:
        filtered_schemes = [s for s in filtered_schemes if search_query.lower() in s['scheme_name'].lower() or search_query.lower() in s['description'].lower()]
    
    st.write(f"Found {len(filtered_schemes)} schemes")
    
    for scheme in filtered_schemes:
        st.markdown(f"""
        <div class="scheme-card">
            <h3>{scheme['scheme_name']}</h3>
            <span class="category-badge">{scheme['category'].upper()}</span>
            <p><strong>Benefits:</strong> {scheme['benefits']}</p>
            <p>{scheme['description']}</p>
            <p><strong>Eligibility:</strong> {scheme['eligibility_criteria']}</p>
            <p><strong>Age:</strong> {scheme['age_min']}-{scheme['age_max']} years | <strong>Income:</strong> ₹{scheme['min_income']:,} - ₹{scheme['max_income']:,}</p>
        </div>
        """, unsafe_allow_html=True)

# Check Eligibility
elif page == "✅ Check Eligibility":
    st.header("Check Your Eligibility")
    
    col1, col2 = st.columns(2)
    with col1:
        age = st.number_input("Age", min_value=0, max_value=100, value=25)
        gender = st.selectbox("Gender", ["male", "female", "transgender"])
    with col2:
        income = st.number_input("Annual Income (₹)", min_value=0, max_value=10000000, value=300000, step=10000)
        state = st.selectbox("State", ["all", "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra"])
    
    if st.button("Check Eligibility"):
        recommendations = get_recommendations(age, income, gender, state, top_n=10)
        
        if recommendations:
            st.success(f"✅ Found {len(recommendations)} schemes you may be eligible for!")
            
            for rec in recommendations:
                scheme = rec['scheme']
                prob = rec['probability']
                conf = rec['confidence']
                
                conf_class = f"confidence-{conf.lower()}"
                
                st.markdown(f"""
                <div class="scheme-card">
                    <h3>{scheme['scheme_name']}</h3>
                    <span class="{conf_class}">Confidence: {conf} ({prob*100:.1f}%)</span>
                    <span class="category-badge">{scheme['category'].upper()}</span>
                    <p><strong>Benefits:</strong> {scheme['benefits']}</p>
                    <p>{scheme['description']}</p>
                    <p><strong>Documents Required:</strong> {', '.join(scheme['documents_required'])}</p>
                    <a href="{scheme['apply_url']}" target="_blank">Apply Now →</a>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.warning("No matching schemes found. Try adjusting your criteria.")

# Recommendations
elif page == "🎯 Recommendations":
    st.header("Personalized Recommendations")
    st.info("Get AI-powered scheme recommendations based on your profile")
    
    with st.form("profile_form"):
        col1, col2 = st.columns(2)
        with col1:
            age = st.number_input("Age", min_value=0, max_value=100, value=30)
            gender = st.selectbox("Gender", ["male", "female", "transgender"])
        with col2:
            income = st.number_input("Annual Income (₹)", min_value=0, value=400000, step=10000)
            state = st.selectbox("State", ["all", "Tamil Nadu"])
        
        submitted = st.form_submit_button("Get Recommendations")
    
    if submitted:
        recommendations = get_recommendations(age, income, gender, state, top_n=5)
        
        st.subheader("🎯 Top Recommendations for You")
        for idx, rec in enumerate(recommendations, 1):
            scheme = rec['scheme']
            st.markdown(f"""
            <div class="scheme-card">
                <h3>#{idx} {scheme['scheme_name']}</h3>
                <span class="confidence-high">Match: {rec['probability']*100:.0f}%</span>
                <p><strong>Why recommended:</strong> Based on your age ({age}), income (₹{income:,}), and gender ({gender})</p>
                <p><strong>Benefits:</strong> {scheme['benefits']}</p>
                <a href="{scheme['apply_url']}" target="_blank">Apply Now →</a>
            </div>
            """, unsafe_allow_html=True)

# Missed Benefits
elif page == "⚠️ Missed Benefits":
    st.header("Missed Benefits Alert")
    st.warning("Check if you're missing out on schemes you're eligible for")
    
    age = st.number_input("Your Age", min_value=0, max_value=100, value=35)
    income = st.number_input("Annual Income (₹)", min_value=0, value=500000, step=10000)
    gender = st.selectbox("Gender", ["male", "female", "transgender"])
    
    st.subheader("Schemes you've already applied for:")
    applied = st.multiselect("Select applied schemes", [s['scheme_name'] for s in schemes])
    
    if st.button("Check Missed Benefits"):
        applied_schemes = [s for s in schemes if s['scheme_name'] in applied]
        missed = get_missed_benefits(age, income, gender, applied_schemes)
        
        if missed:
            st.error(f"⚠️ You're missing out on {len(missed)} schemes!")
            for m in missed:
                scheme = m['scheme']
                st.markdown(f"""
                <div class="scheme-card">
                    <h3>⚠️ {scheme['scheme_name']}</h3>
                    <p><strong>You're eligible but haven't applied!</strong></p>
                    <p>{scheme['benefits']}</p>
                    <a href="{scheme['apply_url']}" target="_blank">Apply Now →</a>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.success("✅ You're not missing any benefits!")

# Voice Search
elif page == "🎤 Voice Search":
    show_voice_search()

# About
elif page == "ℹ️ About":
    st.header("About Namma Schemes")
    st.markdown("""
    ### 🎯 Mission
    To make government schemes accessible to every citizen through AI-powered recommendations and simplified eligibility checking.
    
    ### 🌟 Features
    - **AI-Powered Recommendations**: Machine learning model predicts your eligibility
    - **Missed Benefits Alert**: Never miss a scheme you qualify for
    - **Multi-language Support**: Available in English and Tamil
    - **Voice Search**: Search schemes using voice (coming soon)
    - **Comprehensive Database**: 15+ schemes across 12 categories
    
    ### 📊 SDG Alignment
    - SDG 1: No Poverty
    - SDG 10: Reduced Inequalities
    - SDG 16: Peace, Justice and Strong Institutions
    
    ### 👥 Contact
    For queries: support@nammaschemes.gov.in
    """)

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666;">
    <p>© 2024 Namma Schemes - Government of India Initiative</p>
    <p>Developed for Digital India | Data Privacy Protected</p>
</div>
""", unsafe_allow_html=True)
