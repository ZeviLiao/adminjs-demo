import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Database, Resource, getModelByName } from '@adminjs/prisma';

const prisma = new PrismaClient();

// 註冊 Prisma adapter
AdminJS.registerAdapter({ Database, Resource });

const PORT = 3000;

const start = async () => {
  const app = express();

  const adminJS = new AdminJS({
    resources: [
      {
        resource: { model: getModelByName('User'), client: prisma },
        options: {
          properties: {
            id: {
              isVisible: { list: true, show: true, edit: false, filter: true },
            },
            email: {
              type: 'string',
              isRequired: true,
              isVisible: { list: true, show: true, edit: true, filter: true },
            },
            name: {
              type: 'string',
              isVisible: { list: true, show: true, edit: true, filter: true },
            },
            role: {
              availableValues: [
                { value: 'USER', label: '一般用戶' },
                { value: 'ADMIN', label: '管理員' },
                { value: 'MODERATOR', label: '版主' },
              ],
            },
            createdAt: {
              isVisible: { list: true, show: true, edit: false, filter: true },
            },
            updatedAt: {
              isVisible: { list: false, show: true, edit: false, filter: false },
            },
          },
        },
      },
      {
        resource: { model: getModelByName('Post'), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName('Comment'), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName('Tag'), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName('Category'), client: prisma },
        options: {},
      },
    ],
    rootPath: '/admin',
    branding: {
      companyName: '我的管理後台',
    },
    locale: {
      language: 'zh-TW',
      translations: {
        labels: {
          User: '用戶管理',
        },
        buttons: {
          save: '儲存',
          cancel: '取消',
          delete: '刪除',
          edit: '編輯',
          show: '查看',
          create: '新增',
          bulkDelete: '批量刪除',
        },
        properties: {
          name: '名稱',
          email: '信箱',
          role: '角色',
          createdAt: '建立時間',
          updatedAt: '更新時間',
        },
      },
    },
  });

  // 開發環境需要調用 watch() 來生成前端資源
  if (process.env.NODE_ENV === 'development') {
    adminJS.watch();
  }

  // 簡單的認證（生產環境請使用更安全的方式）
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: async (email, password) => {
      // 這裡是簡單的硬編碼認證，實際應該查詢資料庫
      if (email === 'admin@example.com' && password === 'password') {
        return { email: 'admin@example.com', role: 'admin' };
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret',
  });

  app.use(adminJS.options.rootPath, adminRouter);

  app.get('/', (req, res) => {
    res.redirect('/admin');
  });

  app.listen(PORT, () => {
    console.log(`AdminJS 啟動成功: http://localhost:${PORT}${adminJS.options.rootPath}`);
    console.log(`登入帳號: admin@example.com`);
    console.log(`登入密碼: password`);
  });
};

start().catch((error) => {
  console.error('啟動失敗:', error);
  process.exit(1);
});