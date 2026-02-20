@echo off
echo.
echo ========================================
echo   Namma Schemes - Streamlit Version
echo ========================================
echo.
echo Installing dependencies...
cd "smart_government_scheme-main\streamlit_app"
pip install -r requirements.txt

echo.
echo Training ML model...
python models\ml_model.py

echo.
echo Starting Streamlit app...
streamlit run app.py

pause
