"""
Serveur Flask simple pour exécuter le jeu Pygame
Lance avec: python server/pygame-server.py
Puis va sur: http://localhost:5000
"""
from flask import Flask, render_template_string, jsonify
import subprocess
import os

app = Flask(__name__)

GAME_PATH = os.path.join('public', 'assets', 'projects', 'Rythme_Car_Game', 'game.py')

@app.route('/')
def index():
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Rythme Car Game - Server</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: #1a1a1a;
                color: white;
            }
            .btn {
                background: #4CAF50;
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 5px;
                font-size: 18px;
                cursor: pointer;
                margin: 10px;
            }
            .btn:hover {
                background: #45a049;
            }
            .info {
                background: #333;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <h1>🎮 Rythme Car Game</h1>
        <div class="info">
            <h2>⚠️ Note importante</h2>
            <p>Ce serveur Flask ne peut pas afficher Pygame dans le navigateur.</p>
            <p>Pygame nécessite une fenêtre graphique native sur ton système.</p>
        </div>
        
        <div class="info">
            <h2>✅ Pour jouer au jeu :</h2>
            <ol>
                <li>Ouvre un terminal</li>
                <li>Va dans: <code>public/assets/projects/Rythme_Car_Game/</code></li>
                <li>Lance: <code>python game.py</code></li>
            </ol>
        </div>

        <div class="info">
            <h2>🌐 Pour jouer dans le navigateur :</h2>
            <p>Utilise Replit.com ou Pygbag (voir GUIDE_JEU_WEB.md)</p>
        </div>
    </body>
    </html>
    ''')

if __name__ == '__main__':
    print("🎮 Serveur Pygame lancé sur http://localhost:5000")
    print("⚠️  Note: Pygame ne peut pas s'afficher dans le navigateur")
    print("📖 Voir GUIDE_JEU_WEB.md pour les solutions web")
    app.run(debug=True, port=5000)

