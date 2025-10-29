@echo off
echo ============================================================
echo CONVERSION RYTHME CAR GAME - VERSION WEB
echo ============================================================
echo.

cd "%~dp0.."

echo Etape 1/2 : Conversion avec Pygbag (Python 3.11)...
python3.11 -m pygbag --build "public\assets\projects\Rythme_Car_Game"

if errorlevel 1 (
    echo ERREUR lors de la conversion!
    pause
    exit /b 1
)

echo.
echo Etape 2/2 : Copie des fichiers vers public/games...
robocopy "public\assets\projects\Rythme_Car_Game\build\web" "public\games\rythme-car-game" /E /IS /NFL /NDL /NJH /NJS

echo.
echo ============================================================
echo CONVERSION TERMINEE AVEC SUCCES!
echo ============================================================
echo.
echo Fichiers web disponibles dans: public\games\rythme-car-game
echo.
echo PROCHAINES ETAPES:
echo 1. Redemarre ton serveur Next.js (Ctrl+C puis npm run dev)
echo 2. Va sur: http://localhost:3000/projects/rythme-car-game
echo 3. Clique sur "Jouer dans le navigateur"
echo.
echo Le jeu devrait se lancer!
echo ============================================================
pause

