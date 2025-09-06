# Hướng dẫn Setup CV Portfolio

## Yêu cầu hệ thống

- Node.js (v16 trở lên)
- npm hoặc yarn
- Git
- MongoDB Atlas account
- Supabase account

## Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/ndtp2003/myProfile.git
cd myProfile
```

### 2. Cài đặt dependencies
```bash
# Cài đặt dependencies cho toàn bộ project
npm run install-all

# Hoặc cài đặt từng phần
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Cấu hình Environment Variables

#### Backend (.env)
```bash
# Copy file example
cp backend/env.example backend/.env

# Chỉnh sửa file .env với thông tin của bạn
```

Nội dung file `backend/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://ndtphuoc2003:Ndtp@09082003@fucocv.cd9ov4r.mongodb.net/?retryWrites=true&w=majority&appName=FucoCV

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Supabase Configuration
SUPABASE_URL=https://oqijlbtsoeobnditrqxf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xaWpsYnRzb2VvYm5kaXRycXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjE2MjQ2NCwiZXhwIjoyMDYxNzM4NDY0fQ.HDW-Pa_rW0OU_bXujMd97rCEy11QtcGb0lM6SVZkhO0

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

#### Frontend (.env)
```bash
# Copy file example
cp frontend/env.example frontend/.env
```

Nội dung file `frontend/.env`:
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=CV Portfolio
REACT_APP_VERSION=1.0.0
```

### 4. Setup Database

#### Tạo sample data (optional):
```bash
cd backend
node scripts/seed.js
```

### 5. Chạy ứng dụng

#### Development mode:
```bash
# Chạy cả frontend và backend
npm run dev

# Hoặc chạy riêng lẻ
# Backend
npm run server

# Frontend (terminal mới)
npm run client
```

#### Production mode:
```bash
# Build frontend
npm run build

# Start backend
cd backend && npm start
```

## Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin/login

## Cấu hình Supabase

### 1. Tạo Storage Bucket
1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Vào Storage
3. Tạo bucket mới tên `images`
4. Cấu hình public access

### 2. Cấu hình RLS (Row Level Security)
```sql
-- Cho phép public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Cho phép authenticated users upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## Cấu hình MongoDB Atlas

### 1. Tạo Database
1. Truy cập [MongoDB Atlas](https://cloud.mongodb.com)
2. Tạo cluster mới
3. Tạo database `cv_portfolio`
4. Tạo user với quyền read/write

### 2. Network Access
1. Vào Network Access
2. Thêm IP address hoặc allow all (0.0.0.0/0) cho development

## Tính năng chính

### ✅ Đã implement:
- [x] Responsive design với Material-UI
- [x] Dark/Light theme toggle
- [x] Multi-language support (Vietnamese/English)
- [x] Admin authentication với JWT
- [x] CRUD operations cho CV content
- [x] Image upload với Supabase
- [x] MongoDB integration
- [x] TypeScript support
- [x] State management với Zustand

### 🔄 Có thể mở rộng:
- [ ] Blog section
- [ ] Contact form
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] PWA support
- [ ] Email notifications
- [ ] Social media integration

## Troubleshooting

### Common Issues:

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Kiểm tra MongoDB URI và network access

#### 2. CORS Error
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution**: Kiểm tra CORS configuration trong backend

#### 3. JWT Token Error
```
Error: jwt malformed
```
**Solution**: Kiểm tra JWT_SECRET và token format

#### 4. Supabase Upload Error
```
Error: Invalid API key
```
**Solution**: Kiểm tra Supabase URL và API key

### Debug Commands:
```bash
# Check backend logs
cd backend && npm run dev

# Check frontend build
cd frontend && npm run build

# Test API endpoints
curl http://localhost:5000/api/health
```

## Scripts hữu ích

```bash
# Install all dependencies
npm run install-all

# Run development server
npm run dev

# Build for production
npm run build

# Seed database
cd backend && node scripts/seed.js

# Check linting
cd frontend && npm run lint
cd backend && npm run lint
```

## Cấu trúc Project

```
cv-portfolio/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Utility scripts
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # State management
│   │   ├── theme/          # Material-UI themes
│   │   └── i18n/           # Internationalization
│   └── public/             # Static assets
├── package.json            # Root package.json
└── README.md              # Project documentation
```

## Support

Nếu gặp vấn đề, hãy:
1. Kiểm tra logs trong console
2. Verify environment variables
3. Check network connectivity
4. Tạo issue trên GitHub repository
