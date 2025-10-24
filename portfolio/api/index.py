from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Chemin vers les fichiers du jeu web (Pygbag)
GAME_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public', 'games', 'rythme-car-game'))
print(f"Game directory: {GAME_DIR}")
print(f"Directory exists: {os.path.exists(GAME_DIR)}")

@app.route('/api/game')
def game_index():
    """Sert la page principale du jeu"""
    return send_from_directory(GAME_DIR, 'index.html')

@app.route('/api/game/<path:filename>')
def game_files(filename):
    """Sert tous les fichiers du jeu (JS, WASM, assets, etc.)"""
    return send_from_directory(GAME_DIR, filename)

@app.route('/api/hello')
def hello():
    """Test endpoint"""
    return {"message": "Flask API is running!"}

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5328, debug=True)

