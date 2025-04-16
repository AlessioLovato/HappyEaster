#!/bin/bash

# Script per costruire la versione statica del sito per GitHub Pages

echo "👋 Preparando il sito statico per GitHub Pages..."

# Verificare che la cartella delle immagini esista
if [ ! -d "images" ]; then
  echo "❌ Errore: La cartella 'images' non esiste!"
  exit 1
fi

# Verificare che l'SVG del coniglio esista
if [ ! -f "client/src/assets/easter-bunny.svg" ]; then
  echo "❌ Errore: Il file 'client/src/assets/easter-bunny.svg' non esiste!"
  exit 1
fi

echo "🔄 Aggiornando i percorsi delle risorse..."

# Salvare stato originale dei file
cp client/src/components/PopupAds.tsx client/src/components/PopupAds.tsx.backup
cp client/src/components/WatchdogsOverlay.tsx client/src/components/WatchdogsOverlay.tsx.backup

# Aggiornare i percorsi delle immagini
sed -i 's|/images/|./images/|g' client/src/components/PopupAds.tsx
sed -i 's|/src/assets/easter-bunny.svg|./easter-bunny.svg|g' client/src/components/WatchdogsOverlay.tsx

echo "🔨 Costruendo il sito..."
NODE_ENV=production npx vite build --base=/

# Verificare che il build sia andato a buon fine
if [ $? -ne 0 ]; then
  echo "❌ Errore nella build! Ripristino dei file originali..."
  mv client/src/components/PopupAds.tsx.backup client/src/components/PopupAds.tsx
  mv client/src/components/WatchdogsOverlay.tsx.backup client/src/components/WatchdogsOverlay.tsx
  exit 1
fi

echo "📦 Copiando le risorse statiche..."
mkdir -p dist/public/images
cp -r images/* dist/public/images/ || echo "⚠️ Attenzione: Problemi nel copiare le immagini!"
cp client/src/assets/easter-bunny.svg dist/public/ || echo "⚠️ Attenzione: Problemi nel copiare l'SVG del coniglio!"

# Ripristinare i file originali
mv client/src/components/PopupAds.tsx.backup client/src/components/PopupAds.tsx
mv client/src/components/WatchdogsOverlay.tsx.backup client/src/components/WatchdogsOverlay.tsx

# Mostrare struttura della cartella dist
echo "📂 Struttura della build:"
find dist/public -type f | grep -v "node_modules" | sort

echo "✅ Build completata! I file statici sono nella cartella dist/public"
echo "🚀 Per pubblicare su GitHub Pages, carica i contenuti della cartella dist/public nel tuo repository."