#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="$PROJECT_DIR/public/data"
VERSION="4.2.3"
URL="https://github.com/EmulatorJS/EmulatorJS/releases/download/v${VERSION}/${VERSION}.7z"
TMP_DIR=$(mktemp -d)

echo "→ Downloading EmulatorJS v${VERSION} (~290 MB)..."
curl -L --progress-bar -o "$TMP_DIR/${VERSION}.7z" "$URL"

echo "→ Extracting to public/data/..."
mkdir -p "$DATA_DIR"

if command -v 7z &>/dev/null; then
  7z x "$TMP_DIR/${VERSION}.7z" -o"$TMP_DIR/extracted" -y
elif command -v 7za &>/dev/null; then
  7za x "$TMP_DIR/${VERSION}.7z" -o"$TMP_DIR/extracted" -y
else
  echo "Error: install 7z first — brew install sevenzip"
  rm -rf "$TMP_DIR"
  exit 1
fi

if [ -d "$TMP_DIR/extracted/data" ]; then
  cp -R "$TMP_DIR/extracted/data/"* "$DATA_DIR/"
else
  cp -R "$TMP_DIR/extracted/"* "$DATA_DIR/"
fi

rm -rf "$TMP_DIR"
echo "✓ EmulatorJS installed — offline play ready."