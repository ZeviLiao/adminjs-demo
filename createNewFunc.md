# Post CRUD 實現步驟

本文檔記錄如何在 AdminJS + Prisma 專案中實現 Post 的 CRUD 功能。

## 實現步驟

### 1. Prisma Schema 定義
在 `prisma/schema.prisma` 中定義 Post model：

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?  @db.Text
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  comments  Comment[]
  tags      Tag[]    @relation("PostTags")
}
```

### 2. 數據庫遷移
執行 Prisma 遷移以更新數據庫 schema：

```bash
npx prisma migrate dev --name add_post_model
```

### 3. 生成 Prisma Client
更新 Prisma Client：

```bash
npx prisma generate
```

### 4. AdminJS 配置
在 `src/app.ts` 中添加 Post 資源：

```typescript
import { getModelByName } from '@adminjs/prisma';

const adminJS = new AdminJS({
  resources: [
    // 其他資源...
    {
      resource: { model: getModelByName('Post'), client: prisma },
      options: {
        properties: {
          id: {
            isVisible: { list: true, show: true, edit: false, filter: true },
          },
          title: {
            type: 'string',
            isRequired: true,
            isVisible: { list: true, show: true, edit: true, filter: true },
          },
          content: {
            type: 'textarea',
            isVisible: { list: false, show: true, edit: true, filter: false },
          },
          published: {
            type: 'boolean',
            isVisible: { list: true, show: true, edit: true, filter: true },
          },
          authorId: {
            isVisible: { list: true, show: true, edit: true, filter: true },
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true },
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false },
          },
        },
        actions: {
          new: {
            isVisible: true,
          },
          edit: {
            isVisible: true,
          },
          delete: {
            isVisible: true,
          },
          bulkDelete: {
            isVisible: true,
          },
        },
      },
    },
  ],
  // 其他配置...
});
```

### 5. 重新編譯和啟動
編譯 TypeScript 並啟動服務器：

```bash
yarn build
yarn start
```

### 6. 驗證功能
在瀏覽器中訪問 `http://localhost:3000/admin`，應該能看到：

- **Post 管理頁面**：在左側導航欄中
- **CRUD 操作**：
  - **Create**：點擊 "新增" 按鈕創建新文章
  - **Read**：在列表中查看文章，點擊查看詳情
  - **Update**：點擊 "編輯" 按鈕修改文章
  - **Delete**：點擊 "刪除" 按鈕或使用批量刪除

## AdminJS 自動生成的功能

AdminJS 會根據 Prisma model 自動生成：

1. **列表頁面**：顯示所有文章的表格
2. **詳情頁面**：顯示單篇文章的詳細信息
3. **新增頁面**：包含所有必填欄位的表單
4. **編輯頁面**：預填入現有數據的編輯表單
5. **刪除功能**：單個和批量刪除選項
6. **搜索和篩選**：基於配置的欄位進行篩選
7. **分頁功能**：自動處理大量數據的分頁

## 關聯數據處理

AdminJS 自動處理 Prisma 中定義的關聯：

- **Author 關聯**：在編輯文章時可以選擇作者
- **Comments 關聯**：顯示文章的評論數量
- **Tags 關聯**：多對多關係的標籤管理

## 自定義選項說明

- **isVisible**：控制欄位在不同視圖中的可見性
- **type**：指定欄位類型（string, textarea, boolean 等）
- **isRequired**：標記必填欄位
- **actions**：控制 CRUD 操作的可用性

這樣就完成了 Post 的完整 CRUD 功能實現！