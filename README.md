# AdminJS Demo

一個使用 AdminJS + Prisma + MySQL 的管理後台範例專案。

## Tech Stack

- **Backend Framework**: Express.js
- **Admin Panel**: AdminJS
- **Database ORM**: Prisma
- **Database**: MySQL
- **Language**: TypeScript
- **Package Manager**: Yarn

## 功能特色

- 📊 自動生成的管理界面
- 🔐 簡單的身份驗證
- 🗄️ 完整的 CRUD 操作
- 🌐 中文本地化界面
- 🔗 關聯數據管理

## 數據模型

- **User**: 用戶管理（角色：一般用戶/管理員/版主）
- **Post**: 文章管理
- **Comment**: 評論管理
- **Tag**: 標籤管理
- **Category**: 分類管理

## 快速開始

### 1. 安裝依賴

```bash
yarn install
```

### 2. 環境配置

複製環境變數範例文件：

```bash
cp .env.example .env
```

編輯 `.env` 文件，設置你的資料庫連接字串：

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

### 3. 數據庫設置

初始化數據庫和生成 Prisma Client：

```bash
# 執行數據庫遷移
npx prisma migrate dev

# 生成 Prisma Client
npx prisma generate
```

### 4. 編譯專案

```bash
yarn build
```

### 5. 啟動服務

```bash
yarn start
```

## 訪問管理後台

開啟瀏覽器前往：http://localhost:3000/admin

**登入資訊：**
- 帳號：`admin@example.com`
- 密碼：`password`

## 可用指令

| 指令 | 說明 |
|------|------|
| `yarn install` | 安裝依賴套件 |
| `yarn build` | 編譯 TypeScript |
| `yarn start` | 啟動生產服務器 |
| `yarn lint` | 執行程式碼檢查 |
| `npx prisma studio` | 開啟 Prisma Studio |
| `npx prisma migrate dev` | 執行資料庫遷移 |
| `npx prisma generate` | 生成 Prisma Client |

## 專案結構

```
├── src/
│   └── app.ts          # 主要應用程式檔案
├── prisma/
│   └── schema.prisma   # 數據庫 Schema
├── dist/               # 編譯後的 JavaScript 檔案
├── package.json        # 專案配置
├── tsconfig.json       # TypeScript 配置
└── .env                # 環境變數（需自行創建）
```

## 開發說明

### 新增功能

參考 [createNewFunc.md](./createNewFunc.md) 了解如何添加新的 CRUD 功能。

### 自定義管理界面

AdminJS 提供豐富的配置選項來自定義管理界面：

- 欄位顯示/隱藏
- 欄位類型設定
- 操作權限控制
- 自定義組件

更多詳細資訊請參考 [AdminJS 官方文檔](https://docs.adminjs.co/)。

## 注意事項

⚠️ **安全提醒**：
- 本範例使用硬編碼的身份驗證，生產環境請使用更安全的認證方式
- 確保 `.env` 文件不要提交到版本控制系統
- 定期更新依賴套件以修復安全漏洞

## 授權

此專案僅供學習和開發參考使用。