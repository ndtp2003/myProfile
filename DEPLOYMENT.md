# Hướng dẫn Deploy CV Portfolio

## Các nền tảng deploy miễn phí

### 1. **Vercel** (Khuyến nghị cho Frontend)
- **Ưu điểm**: Tích hợp tốt với React, deploy tự động từ GitHub
- **Giới hạn**: 100GB bandwidth/tháng, 1000 serverless functions/tháng
- **Cách deploy**:
  1. Đăng ký tài khoản tại [vercel.com](https://vercel.com)
  2. Kết nối GitHub repository
  3. Chọn thư mục `frontend` làm root directory
  4. Cấu hình environment variables
  5. Deploy tự động

### 2. **Netlify** (Tốt cho Static Sites)
- **Ưu điểm**: Dễ sử dụng, CDN toàn cầu
- **Giới hạn**: 100GB bandwidth/tháng, 300 build minutes/tháng
- **Cách deploy**:
  1. Đăng ký tại [netlify.com](https://netlify.com)
  2. Kết nối GitHub repository
  3. Build command: `cd frontend && npm run build`
  4. Publish directory: `frontend/build`

### 3. **Railway** (Full-stack)
- **Ưu điểm**: Hỗ trợ cả frontend và backend, database
- **Giới hạn**: $5 credit/tháng (đủ cho dự án nhỏ)
- **Cách deploy**:
  1. Đăng ký tại [railway.app](https://railway.app)
  2. Kết nối GitHub repository
  3. Deploy cả frontend và backend services
  4. Cấu hình MongoDB Atlas connection

### 4. **Render** (Full-stack)
- **Ưu điểm**: Miễn phí cho static sites, $7/tháng cho web services
- **Cách deploy**:
  1. Đăng ký tại [render.com](https://render.com)
  2. Tạo Web Service cho backend
  3. Tạo Static Site cho frontend
  4. Cấu hình environment variables

### 5. **Heroku** (Có giới hạn)
- **Lưu ý**: Không còn free tier, nhưng có thể dùng cho học tập
- **Cách deploy**: Sử dụng Heroku CLI hoặc GitHub integration

## Cấu hình Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://ndtphuoc2003:Ndtp@09082003@fucocv.cd9ov4r.mongodb.net/?retryWrites=true&w=majority&appName=FucoCV
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
SUPABASE_URL=https://oqijlbtsoeobnditrqxf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xaWpsYnRzb2VvYm5kaXRycXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjE2MjQ2NCwiZXhwIjoyMDYxNzM4NDY0fQ.HDW-Pa_rW0OU_bXujMd97rCEy11QtcGb0lM6SVZkhO0
```

## Hướng dẫn Deploy chi tiết

### Option 1: Vercel + Railway (Khuyến nghị)

#### Deploy Frontend lên Vercel:
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập
2. Click "New Project"
3. Import repository từ GitHub
4. Cấu hình:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Thêm Environment Variable:
   - `REACT_APP_API_URL`: URL của backend (sẽ có sau khi deploy backend)

#### Deploy Backend lên Railway:
1. Truy cập [railway.app](https://railway.app) và đăng nhập
2. Click "New Project" → "Deploy from GitHub repo"
3. Chọn repository
4. Cấu hình:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Thêm Environment Variables từ file `.env`
6. Railway sẽ cung cấp URL cho backend

### Option 2: Netlify + Render

#### Deploy Frontend lên Netlify:
1. Truy cập [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Chọn GitHub repository
4. Cấu hình:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
5. Thêm Environment Variables

#### Deploy Backend lên Render:
1. Truy cập [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Cấu hình:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Thêm Environment Variables

## Cấu hình Domain tùy chỉnh

### Vercel:
1. Vào Project Settings → Domains
2. Thêm domain của bạn
3. Cấu hình DNS records

### Netlify:
1. Vào Site Settings → Domain Management
2. Add custom domain
3. Cấu hình DNS

## Monitoring và Analytics

### Vercel Analytics:
- Tích hợp sẵn với Vercel
- Theo dõi performance và usage

### Google Analytics:
- Thêm Google Analytics vào React app
- Theo dõi visitor behavior

## Backup và Security

### Database Backup:
- MongoDB Atlas tự động backup
- Có thể export data định kỳ

### Security:
- Sử dụng HTTPS (tự động với các platform)
- Cấu hình CORS đúng
- Bảo vệ JWT secret
- Rate limiting

## Troubleshooting

### Common Issues:
1. **CORS Error**: Kiểm tra CORS configuration trong backend
2. **Environment Variables**: Đảm bảo tất cả env vars được set đúng
3. **Build Failures**: Kiểm tra dependencies và build commands
4. **Database Connection**: Verify MongoDB connection string

### Debug Tips:
- Check logs trong dashboard của platform
- Sử dụng browser dev tools
- Test API endpoints với Postman

## Cost Optimization

### Free Tier Limits:
- **Vercel**: 100GB bandwidth, 1000 functions
- **Netlify**: 100GB bandwidth, 300 build minutes
- **Railway**: $5 credit/tháng
- **Render**: Free cho static sites

### Tips:
- Optimize images và assets
- Sử dụng CDN
- Implement caching
- Monitor usage regularly
