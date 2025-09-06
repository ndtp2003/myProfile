const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  // Personal Information
  personalInfo: {
    fullName: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    title: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    profileImage: { type: String },
    summary: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    }
  },

  // Experience
  experience: [{
    company: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    position: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    technologies: [String]
  }],

  // Education
  education: [{
    institution: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    degree: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: {
      vi: { type: String },
      en: { type: String }
    }
  }],

  // Skills
  skills: {
    technical: [{
      name: { type: String, required: true },
      level: { type: Number, min: 1, max: 5, default: 3 },
      category: { type: String, required: true }
    }],
    languages: [{
      name: { type: String, required: true },
      level: {
        vi: { type: String, required: true },
        en: { type: String, required: true }
      }
    }]
  },

  // Projects
  projects: [{
    name: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    description: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    technologies: [String],
    githubUrl: { type: String },
    liveUrl: { type: String },
    image: { type: String },
    startDate: { type: Date },
    endDate: { type: Date }
  }],

  // Certifications
  certifications: [{
    name: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    issuer: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },
    date: { type: Date, required: true },
    credentialId: { type: String },
    credentialUrl: { type: String }
  }],

  // Social Links
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String }
  },

  // Settings
  settings: {
    isPublic: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, enum: ['vi', 'en'], default: 'vi' }
  }
}, {
  timestamps: true
});

// Index for better query performance
cvSchema.index({ 'settings.isPublic': 1 });

module.exports = mongoose.model('CV', cvSchema);
