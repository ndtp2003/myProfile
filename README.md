# CV Portfolio Website

A modern, responsive CV portfolio website built with React and Node.js, featuring:

- 🌐 **Multi-language support** (Vietnamese/English)
- 🌙 **Dark/Light theme toggle**
- 🔐 **Admin authentication** for content management
- 📱 **Responsive design**
- 🖼️ **Image storage** with Supabase
- 🗄️ **MongoDB** for data storage

## Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI (MUI) for components
- React Router for navigation
- i18next for internationalization
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS enabled

### External Services
- MongoDB Atlas for database
- Supabase for image storage

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both `backend` and `frontend` directories
   - Fill in your MongoDB and Supabase credentials

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Deployment Options

### Free Deployment Platforms:

1. **Vercel** (Recommended for React apps)
   - Frontend: Deploy directly from GitHub
   - Backend: Use Vercel Functions or separate service

2. **Netlify**
   - Great for static sites and serverless functions

3. **Railway**
   - Full-stack deployment with database support

4. **Render**
   - Free tier for both frontend and backend

5. **Heroku** (Limited free tier)
   - Good for learning, but has limitations

## Project Structure

```
cv-portfolio/
├── frontend/          # React application
├── backend/           # Node.js API server
├── package.json       # Root package.json
└── README.md
```

## Features

- ✅ Responsive design
- ✅ Multi-language support
- ✅ Dark/Light theme
- ✅ Admin panel
- ✅ Image upload
- ✅ CRUD operations
- ✅ JWT authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
