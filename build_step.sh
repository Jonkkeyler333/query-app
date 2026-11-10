#!/usr/bin/env bash
set -e

echo "Initializing dependencies..."
npm install
echo "Dependencies initialized."

echo "Building the project..."
npm run build