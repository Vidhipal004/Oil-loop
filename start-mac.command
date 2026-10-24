#!/bin/bash
cd "$(dirname "$0")"
echo "OilLoop prototype setup"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node.js 20 LTS from https://nodejs.org and run this file again."
  read -r -p "Press Enter to close..."
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "Installing app dependencies (internet connection required on first run)..."
  npm install || { echo "Dependency installation failed. Run npm install in VS Code Terminal to see details."; read -r -p "Press Enter to close..."; exit 1; }
fi
echo "Starting OilLoop. Leave this window open while using the app."
npm run dev
