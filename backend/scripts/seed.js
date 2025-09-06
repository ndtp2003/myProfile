const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const CV = require('../models/CV');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await CV.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create admin user
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('👤 Created admin user');

    // Create sample CV data
    const sampleCV = new CV({
      personalInfo: {
        fullName: {
          vi: 'Nguyễn Đình Thành Phước',
          en: 'Nguyen Dinh Thanh Phuoc'
        },
        title: {
          vi: 'Full Stack Developer',
          en: 'Full Stack Developer'
        },
        email: 'ndtphuoc2003@gmail.com',
        phone: '+84 123 456 789',
        location: {
          vi: 'Thành phố Hồ Chí Minh, Việt Nam',
          en: 'Ho Chi Minh City, Vietnam'
        },
        summary: {
          vi: 'Tôi là một Full Stack Developer với kinh nghiệm phát triển web applications sử dụng React, Node.js và MongoDB. Tôi có đam mê với công nghệ và luôn học hỏi những kỹ thuật mới.',
          en: 'I am a Full Stack Developer with experience in building web applications using React, Node.js, and MongoDB. I have a passion for technology and always eager to learn new techniques.'
        }
      },
      experience: [
        {
          company: {
            vi: 'Công ty ABC',
            en: 'ABC Company'
          },
          position: {
            vi: 'Full Stack Developer',
            en: 'Full Stack Developer'
          },
          startDate: new Date('2023-01-01'),
          endDate: new Date('2024-01-01'),
          current: false,
          description: {
            vi: 'Phát triển và duy trì các ứng dụng web sử dụng React, Node.js và MongoDB. Làm việc với team để deliver high-quality products.',
            en: 'Developed and maintained web applications using React, Node.js, and MongoDB. Worked with team to deliver high-quality products.'
          },
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript']
        }
      ],
      education: [
        {
          institution: {
            vi: 'Đại học Công nghệ Thông tin',
            en: 'University of Information Technology'
          },
          degree: {
            vi: 'Cử nhân Khoa học Máy tính',
            en: 'Bachelor of Computer Science'
          },
          startDate: new Date('2019-09-01'),
          endDate: new Date('2023-06-01'),
          current: false,
          description: {
            vi: 'Chuyên ngành Khoa học Máy tính với focus vào Software Engineering và Web Development.',
            en: 'Computer Science major with focus on Software Engineering and Web Development.'
          }
        }
      ],
      skills: {
        technical: [
          { name: 'JavaScript', level: 5, category: 'Programming Languages' },
          { name: 'React', level: 4, category: 'Frontend' },
          { name: 'Node.js', level: 4, category: 'Backend' },
          { name: 'MongoDB', level: 3, category: 'Database' },
          { name: 'TypeScript', level: 3, category: 'Programming Languages' },
          { name: 'HTML/CSS', level: 5, category: 'Frontend' }
        ],
        languages: [
          { name: 'Tiếng Việt', level: { vi: 'Bản ngữ', en: 'Native' } },
          { name: 'English', level: { vi: 'Trung cấp', en: 'Intermediate' } }
        ]
      },
      projects: [
        {
          name: {
            vi: 'CV Portfolio Website',
            en: 'CV Portfolio Website'
          },
          description: {
            vi: 'Trang web CV cá nhân với khả năng quản lý nội dung, hỗ trợ đa ngôn ngữ và theme tối/sáng.',
            en: 'Personal CV website with content management capabilities, multi-language support, and dark/light theme.'
          },
          technologies: ['React', 'Node.js', 'MongoDB', 'Material-UI', 'TypeScript'],
          githubUrl: 'https://github.com/ndtp2003/myProfile',
          startDate: new Date('2024-01-01')
        }
      ],
      certifications: [
        {
          name: {
            vi: 'AWS Certified Developer',
            en: 'AWS Certified Developer'
          },
          issuer: {
            vi: 'Amazon Web Services',
            en: 'Amazon Web Services'
          },
          date: new Date('2023-12-01'),
          credentialId: 'AWS-DEV-123456'
        }
      ],
      socialLinks: {
        github: 'https://github.com/ndtp2003',
        linkedin: 'https://linkedin.com/in/ndtp2003',
        website: 'https://ndtp2003.dev'
      },
      settings: {
        isPublic: true,
        theme: 'light',
        language: 'vi'
      }
    });

    await sampleCV.save();
    console.log('📄 Created sample CV data');

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📋 Admin credentials:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run seeding
seedData();
