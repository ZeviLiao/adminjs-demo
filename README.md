# AdminJS Demo

一個基於 AdminJS v7 和 Prisma 的管理後台應用程式。

## 功能特色

- ✅ AdminJS v7 管理介面
- ✅ Prisma ORM 整合
- ✅ MySQL 資料庫支援
- ✅ Docker 容器化部署
- ✅ 自動資料庫遷移
- ✅ 中文化介面

## 快速開始

### 本地開發

```bash
# 安裝依賴
yarn install

# 設置環境變數
cp .env.example .env

# 生成 Prisma client
yarn db:generate

# 推送資料庫結構
yarn db:push

# 啟動開發伺服器
yarn start
```

### Docker 部署

```bash
# 準備環境變數（請編輯 .env.docker，設定 ADMIN_EMAIL/ADMIN_PASSWORD/COOKIE_SECRET）
vi .env.docker

# 使用部署腳本（推薦）
./deploy.sh

# 或手動部署
docker compose up --build -d
```

## 服務架構

### Docker Compose 服務

1. **mysql**: MySQL 8.0 資料庫
2. **db-migrate**: 資料庫遷移服務
3. **adminjs-app**: AdminJS 應用程式

### 啟動順序

1. MySQL 啟動並等待健康檢查
2. 資料庫遷移服務執行 Prisma 遷移
3. AdminJS 應用程式啟動

## 環境變數

### 開發環境 (.env)

```env
DATABASE_URL=mysql://root:P@ssw0rd@localhost:3306/adminjs_db
NODE_ENV=development
PORT=3000
```

### 生產環境 (Docker)

```env
MYSQL_ROOT_PASSWORD=P@ssw0rd
MYSQL_DATABASE=adminjs_db
DATABASE_URL=mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:3306/${MYSQL_DATABASE}
NODE_ENV=production
PORT=3000
COOKIE_SECRET=change_this_secret
```

## 資料庫模型

- **User**: 用戶管理
- **Post**: 文章管理
- **Comment**: 評論管理
- **Tag**: 標籤管理
- **Category**: 分類管理

## 管理介面

- **URL**: http://localhost:3000/admin
- **帳號**: admin@example.com
- **密碼**: password

## 常用指令

```bash
# 開發
yarn start              # 啟動開發伺服器
yarn build              # 建置專案
yarn lint               # 程式碼檢查

# 資料庫
yarn db:generate        # 生成 Prisma client
yarn db:push            # 推送資料庫結構
yarn db:migrate         # 開發環境遷移
yarn db:deploy          # 生產環境遷移
yarn db:studio          # 開啟 Prisma Studio

# Docker
docker-compose up -d    # 啟動所有服務
docker-compose down     # 停止所有服務
docker-compose logs     # 查看日誌
./deploy.sh            # 一鍵部署
```

## 故障排除

### 常見問題

1. **端口被占用**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **資料庫連接失敗**
   ```bash
   docker-compose logs mysql
   ```

3. **遷移失敗**
   ```bash
   docker-compose logs db-migrate
   ```

### 重新部署

```bash
# 完全重新部署
docker-compose down -v
docker-compose up --build -d
```

## 技術棧

- **後端**: Node.js, Express, AdminJS v7
- **資料庫**: MySQL 8.0, Prisma ORM
- **容器化**: Docker, Docker Compose
- **語言**: TypeScript
- **套件管理**: Yarn