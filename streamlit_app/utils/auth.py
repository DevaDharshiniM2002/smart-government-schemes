import streamlit as st
import json
import os
import hashlib
from datetime import datetime

USER_DB_FILE = 'data/users.json'

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def load_users():
    if os.path.exists(USER_DB_FILE):
        with open(USER_DB_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    os.makedirs(os.path.dirname(USER_DB_FILE), exist_ok=True)
    with open(USER_DB_FILE, 'w') as f:
        json.dump(users, f, indent=2)

def signup(name, email, password):
    users = load_users()
    if email in users:
        return False, "Email already registered"
    
    users[email] = {
        'name': name,
        'password': hash_password(password),
        'created_at': datetime.now().isoformat(),
        'applied_schemes': []
    }
    save_users(users)
    return True, "Account created successfully"

def login(email, password):
    users = load_users()
    if email not in users:
        return False, "Email not found"
    
    if users[email]['password'] != hash_password(password):
        return False, "Incorrect password"
    
    return True, users[email]

def show_auth_page():
    st.markdown("""
    <div style="text-align: center; padding: 40px;">
        <h1>🏛️ Namma Schemes</h1>
        <p style="font-size: 1.2em;">Government Welfare Portal</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Back button
    if st.button("← Back to Home"):
        st.session_state.show_auth = False
        st.rerun()
    
    tab1, tab2 = st.tabs(["🔐 Login", "📝 Sign Up"])
    
    with tab1:
        st.subheader("Login to Your Account")
        email = st.text_input("Email", key="login_email")
        password = st.text_input("Password", type="password", key="login_password")
        
        if st.button("Login", key="login_btn"):
            if email and password:
                success, result = login(email, password)
                if success:
                    st.session_state.logged_in = True
                    st.session_state.user = result
                    st.session_state.user_email = email
                    st.success("Login successful!")
                    st.rerun()
                else:
                    st.error(result)
            else:
                st.warning("Please enter email and password")
    
    with tab2:
        st.subheader("Create New Account")
        name = st.text_input("Full Name", key="signup_name")
        email = st.text_input("Email", key="signup_email")
        password = st.text_input("Password", type="password", key="signup_password")
        confirm_password = st.text_input("Confirm Password", type="password", key="signup_confirm")
        
        if st.button("Sign Up", key="signup_btn"):
            if name and email and password and confirm_password:
                if password != confirm_password:
                    st.error("Passwords do not match")
                elif len(password) < 6:
                    st.error("Password must be at least 6 characters")
                else:
                    success, message = signup(name, email, password)
                    if success:
                        st.success(message)
                        st.info("Please login with your credentials")
                    else:
                        st.error(message)
            else:
                st.warning("Please fill all fields")

def logout():
    st.session_state.logged_in = False
    st.session_state.user = None
    st.session_state.user_email = None
    st.rerun()
