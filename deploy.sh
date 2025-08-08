#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting deployment for AdminJS app..."

compose() {
  # 兼容 docker compose 與 docker-compose
  if command -v docker compose >/dev/null 2>&1; then
    docker compose "$@"
  else
    docker-compose "$@"
  fi
}

echo "📦 Stopping existing containers..."
compose down --remove-orphans

echo "🔨 Building and starting services..."

# 確保外部網路存在（若 docker-compose.yml 需要）
if grep -q "jeinn-network" docker-compose.yml; then
  if ! docker network inspect jeinn-network >/dev/null 2>&1; then
    echo "🕸️  Creating external network 'jeinn-network'..."
    docker network create jeinn-network >/dev/null
  fi
fi

# 使用 docker compose 時可加上 --wait，docker-compose 則不支援
WAIT_FLAG=""
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  WAIT_FLAG="--wait"
fi

compose up --build -d $WAIT_FLAG

echo "⏳ Waiting for services to be ready..."
# 主動輪詢應用健康檢查端點
max_retry=30
for i in $(seq 1 $max_retry); do
  if compose exec -T adminjs-app wget --no-verbose --tries=1 --spider http://localhost:3000/admin 2>/dev/null; then
    ready=1; break
  fi
  sleep 2
done

echo "🔍 Listing service status..."
compose ps

if [[ "${ready:-0}" -ne 1 ]]; then
  echo "⚠️ App failed health check. Showing recent logs:"
  compose logs --no-log-prefix adminjs-app | tail -n 100
  exit 1
fi

echo "✅ Deployment completed!"
echo "🌐 URL: http://localhost:3000/admin"
echo "👤 Login: (set via ADMIN_EMAIL)"
echo "🔑 Password: (set via ADMIN_PASSWORD)"

