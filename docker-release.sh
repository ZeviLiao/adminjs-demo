#!/usr/bin/env bash
set -euo pipefail

# Simple Docker build & push script for adminjs-demo
# Usage:
#   ./docker-release.sh [TAG] [REPO]
# Defaults:
#   TAG  = latest
#   REPO = ${DOCKER_REPO:-zevi/adminjs-demo}
#   PLATFORM = ${PLATFORM:-linux/amd64}

TAG="${1:-latest}"
REPO="${2:-${DOCKER_REPO:-zevi/adminjs-demo}}"
PLATFORM="${PLATFORM:-linux/amd64}"

echo "🚀 Docker release"
echo "   REPO    : $REPO"
echo "   TAG     : $TAG"
echo "   PLATFORM: $PLATFORM"

echo "🔨 Building image..."
docker build --platform "$PLATFORM" -t "$REPO:$TAG" -f Dockerfile .

echo "📤 Pushing image..."
docker push "$REPO:$TAG"

echo "✅ Done: $REPO:$TAG"


