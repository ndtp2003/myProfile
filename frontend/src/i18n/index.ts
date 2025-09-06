import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Vietnamese translations
const vi = {
  translation: {
    // Navigation
    home: 'Trang chủ',
    admin: 'Quản trị',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    
    // Theme
    lightTheme: 'Chế độ sáng',
    darkTheme: 'Chế độ tối',
    
    // CV Sections
    personalInfo: 'Thông tin cá nhân',
    experience: 'Kinh nghiệm',
    education: 'Học vấn',
    skills: 'Kỹ năng',
    projects: 'Dự án',
    certifications: 'Chứng chỉ',
    contact: 'Liên hệ',
    
    // Common
    name: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    location: 'Địa chỉ',
    summary: 'Giới thiệu bản thân',
    company: 'Công ty',
    position: 'Vị trí',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    current: 'Hiện tại',
    description: 'Mô tả',
    technologies: 'Công nghệ',
    institution: 'Trường học',
    degree: 'Bằng cấp',
    level: 'Trình độ',
    category: 'Danh mục',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    website: 'Website',
    
    // Admin
    adminDashboard: 'Bảng điều khiển quản trị',
    editCV: 'Chỉnh sửa CV',
    uploadImage: 'Tải lên hình ảnh',
    save: 'Lưu',
    cancel: 'Hủy',
    delete: 'Xóa',
    add: 'Thêm',
    edit: 'Chỉnh sửa',
    
    // Auth
    emailPlaceholder: 'Nhập email của bạn',
    passwordPlaceholder: 'Nhập mật khẩu',
    loginButton: 'Đăng nhập',
    loginSuccess: 'Đăng nhập thành công',
    loginError: 'Đăng nhập thất bại',
    logoutSuccess: 'Đăng xuất thành công',
  }
};

// English translations
const en = {
  translation: {
    // Navigation
    home: 'Home',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout',
    
    // Theme
    lightTheme: 'Light Mode',
    darkTheme: 'Dark Mode',
    
    // CV Sections
    personalInfo: 'Personal Information',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    contact: 'Contact',
    
    // Common
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    summary: 'About Me',
    company: 'Company',
    position: 'Position',
    startDate: 'Start Date',
    endDate: 'End Date',
    current: 'Current',
    description: 'Description',
    technologies: 'Technologies',
    institution: 'Institution',
    degree: 'Degree',
    level: 'Level',
    category: 'Category',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    website: 'Website',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    editCV: 'Edit CV',
    uploadImage: 'Upload Image',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    add: 'Add',
    edit: 'Edit',
    
    // Auth
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Login',
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    logoutSuccess: 'Logout successful',
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi,
      en,
    },
    lng: 'vi', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
