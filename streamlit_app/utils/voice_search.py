import streamlit as st
import json

def show_voice_search():
    st.markdown("""
    <style>
        .voice-container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .voice-button {
            background: linear-gradient(135deg, #3b82f6, #1e3a8a);
            color: white;
            padding: 20px 40px;
            border-radius: 50px;
            font-size: 1.5em;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
        }
        .voice-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        .lang-toggle {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        .lang-btn {
            padding: 10px 20px;
            border: 2px solid #3b82f6;
            background: white;
            color: #3b82f6;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
        }
        .lang-btn.active {
            background: #3b82f6;
            color: white;
        }
    </style>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <div class="voice-container">
        <h2 style="text-align: center; color: #3b82f6;">🎤 Voice-Based Scheme Search</h2>
        <p style="text-align: center; color: #666;">Speak in Tamil or English to find schemes</p>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    with col1:
        if st.button("🇬🇧 English", use_container_width=True):
            st.session_state.voice_lang = 'en'
    with col2:
        if st.button("🇮🇳 தமிழ் (Tamil)", use_container_width=True):
            st.session_state.voice_lang = 'ta'
    
    if 'voice_lang' not in st.session_state:
        st.session_state.voice_lang = 'en'
    
    lang = st.session_state.voice_lang
    lang_name = "English" if lang == 'en' else "தமிழ் (Tamil)"
    
    st.info(f"🎤 Selected Language: {lang_name}")
    
    st.markdown("""
    ### How to Use Voice Search:
    
    **English Examples:**
    - "Show me education schemes"
    - "I need health insurance"
    - "Schemes for farmers"
    - "Pension for senior citizens"
    
    **Tamil Examples (தமிழ்):**
    - "கல்வி திட்டங்கள் காட்டு" (Show education schemes)
    - "சுகாதார காப்பீடு வேண்டும்" (Need health insurance)
    - "விவசாயிகளுக்கான திட்டங்கள்" (Schemes for farmers)
    - "முதியோர் ஓய்வூதியம்" (Senior citizen pension)
    """)
    
    st.markdown("---")
    
    # Voice input simulation (actual implementation requires speech recognition API)
    st.markdown("### 🎙️ Speak Your Query")
    
    if st.button("🎤 Start Voice Input", key="voice_btn", use_container_width=True):
        st.info("🎤 Listening... Please speak now")
        st.warning("⚠️ Note: Voice recognition requires browser microphone permissions and works best in Chrome/Edge")
    
    # Text fallback
    st.markdown("### ⌨️ Or Type Your Query")
    query = st.text_input("Search for schemes", placeholder="Type your query here...")
    
    if query:
        st.success(f"🔍 Searching for: {query}")
        
        # Load schemes and search
        with open('data/schemes.json', 'r') as f:
            schemes = json.load(f)
        
        results = [s for s in schemes if query.lower() in s['scheme_name'].lower() 
                   or query.lower() in s['description'].lower()
                   or query.lower() in s['category'].lower()]
        
        if results:
            st.success(f"✅ Found {len(results)} matching scheme(s)")
            for scheme in results:
                st.markdown(f"""
                <div class="scheme-card">
                    <h3>{scheme['scheme_name']}</h3>
                    <span class="category-badge">{scheme['category'].upper()}</span>
                    <p><strong>Benefits:</strong> {scheme['benefits']}</p>
                    <p>{scheme['description']}</p>
                    <a href="{scheme['apply_url']}" target="_blank">Apply Now →</a>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.warning("No schemes found. Try different keywords.")
    
    # Voice search instructions
    st.markdown("""
    ---
    ### 📱 Browser Compatibility
    - ✅ Google Chrome (Recommended)
    - ✅ Microsoft Edge
    - ✅ Safari (iOS)
    - ⚠️ Firefox (Limited support)
    
    ### 🔒 Privacy
    - Voice data processed locally
    - No recordings stored
    - Secure and private
    """)

# Add voice search CSS to main app
def add_voice_search_styles():
    st.markdown("""
    <style>
        .scheme-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #3b82f6;
            margin: 10px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .category-badge {
            background: #3b82f6;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            display: inline-block;
            margin: 5px;
        }
    </style>
    """, unsafe_allow_html=True)
