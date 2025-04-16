#!/bin/bash

# Script per costruire la versione statica del sito per GitHub Pages

echo "Costruendo la versione statica del sito..."

# Aggiornare i percorsi delle immagini nel file dei popup 
cd client/src/components
sed -i 's|/images/|./images/|g' PopupAds.tsx

# Costruire il sito
cd ../../..
NODE_ENV=production npx vite build --base=/

# Copiare la cartella delle immagini
echo "Copiando le immagini nella cartella di build..."
mkdir -p dist/public/images
cp -r images/* dist/public/images/

# Copiare il video nella cartella di build
echo "Copiando altre risorse..."
mkdir -p dist/public/videos
cp client/src/assets/easter-bunny.svg dist/public/

echo "Build completata! I file statici sono nella cartella dist/public"