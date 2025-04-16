# YouTube Clone con Virus di Pasqua

Un clone statico di YouTube che riproduce automaticamente un video e visualizza popup in stile virus anni '80 con un coniglio pasquale che emerge da un uovo.

## Caratteristiche

- Interfaccia simile a YouTube con tema scuro
- Animazione stile Watchdogs con coniglio pasquale grigio ed uova colorate
- Popup casuali di virus che riempiono lo schermo
- Un popup finale centrato (immagine '10.jpeg')
- Ritardo di 500ms tra ogni popup
- Completamente in italiano
- Ottimizzato per dispositivi mobili

## Istruzioni per il Deployment su GitHub Pages

1. Clona questo repository sul tuo computer
2. Assicurati di avere Node.js installato (versione 18+)
3. Installa le dipendenze con `npm install`
4. Esegui lo script di build statico:
   ```
   ./build-static.sh
   ```
5. I file statici pronti per il deployment saranno nella cartella `dist/public`
6. Puoi utilizzare GitHub Pages per ospitare il sito:
   - Crea un nuovo repository su GitHub
   - Carica i file dalla cartella `dist/public`
   - Configura GitHub Pages nelle impostazioni del repository per servire i file dalla radice

## Struttura del Progetto

- `images/`: Contiene le immagini utilizzate per i popup del virus
- `client/src/assets/`: Contiene l'SVG del coniglio pasquale
- `client/src/components/`: Componenti React principali
  - `VideoPlayer.tsx`: Riproduttore video principale
  - `WatchdogsOverlay.tsx`: Animazione del coniglio pasquale
  - `PopupAds.tsx`: Gestisce i popup del virus

## Tecnologie Utilizzate

- React
- TypeScript
- Tailwind CSS
- Framer Motion (per animazioni)
- Vite (per build e bundling)