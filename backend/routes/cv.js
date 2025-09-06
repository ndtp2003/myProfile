const express = require('express');
const { body, validationResult } = require('express-validator');
const CV = require('../models/CV');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cv
// @desc    Get public CV data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cv = await CV.findOne({ 'settings.isPublic': true });
    
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json(cv);
  } catch (error) {
    console.error('Get CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/cv/admin
// @desc    Get CV data for admin
// @access  Private (Admin)
router.get('/admin', adminAuth, async (req, res) => {
  try {
    let cv = await CV.findOne();
    
    if (!cv) {
      // Create default CV if none exists
      cv = new CV({
        personalInfo: {
          fullName: { vi: 'Họ và tên', en: 'Full Name' },
          title: { vi: 'Chức danh', en: 'Job Title' },
          email: 'email@example.com',
          phone: '+84 xxx xxx xxx',
          location: { vi: 'Địa chỉ', en: 'Location' },
          summary: { vi: 'Mô tả bản thân', en: 'About yourself' }
        },
        experience: [],
        education: [],
        skills: { technical: [], languages: [] },
        projects: [],
        certifications: [],
        socialLinks: {},
        settings: { isPublic: true, theme: 'light', language: 'vi' }
      });
      await cv.save();
    }

    res.json(cv);
  } catch (error) {
    console.error('Get admin CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/cv
// @desc    Update CV data
// @access  Private (Admin)
router.put('/', adminAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let cv = await CV.findOne();
    
    if (!cv) {
      cv = new CV(req.body);
    } else {
      Object.assign(cv, req.body);
    }

    await cv.save();

    res.json({
      message: 'CV updated successfully',
      cv
    });
  } catch (error) {
    console.error('Update CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/cv/settings
// @desc    Update CV settings
// @access  Private (Admin)
router.put('/settings', adminAuth, [
  body('isPublic').optional().isBoolean(),
  body('theme').optional().isIn(['light', 'dark']),
  body('language').optional().isIn(['vi', 'en'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let cv = await CV.findOne();
    
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    if (req.body.isPublic !== undefined) {
      cv.settings.isPublic = req.body.isPublic;
    }
    if (req.body.theme) {
      cv.settings.theme = req.body.theme;
    }
    if (req.body.language) {
      cv.settings.language = req.body.language;
    }

    await cv.save();

    res.json({
      message: 'Settings updated successfully',
      settings: cv.settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cv/experience
// @desc    Add experience
// @access  Private (Admin)
router.post('/experience', adminAuth, [
  body('company.vi').notEmpty(),
  body('company.en').notEmpty(),
  body('position.vi').notEmpty(),
  body('position.en').notEmpty(),
  body('startDate').isISO8601(),
  body('description.vi').notEmpty(),
  body('description.en').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let cv = await CV.findOne();
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    cv.experience.push(req.body);
    await cv.save();

    res.json({
      message: 'Experience added successfully',
      experience: cv.experience[cv.experience.length - 1]
    });
  } catch (error) {
    console.error('Add experience error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/cv/experience/:id
// @desc    Update experience
// @access  Private (Admin)
router.put('/experience/:id', adminAuth, async (req, res) => {
  try {
    let cv = await CV.findOne();
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    const experienceIndex = cv.experience.findIndex(exp => exp._id.toString() === req.params.id);
    if (experienceIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    Object.assign(cv.experience[experienceIndex], req.body);
    await cv.save();

    res.json({
      message: 'Experience updated successfully',
      experience: cv.experience[experienceIndex]
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cv/experience/:id
// @desc    Delete experience
// @access  Private (Admin)
router.delete('/experience/:id', adminAuth, async (req, res) => {
  try {
    let cv = await CV.findOne();
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    cv.experience = cv.experience.filter(exp => exp._id.toString() !== req.params.id);
    await cv.save();

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Similar routes for education, projects, certifications, skills...
// (I'll create a few more key ones)

// @route   POST /api/cv/projects
// @desc    Add project
// @access  Private (Admin)
router.post('/projects', adminAuth, [
  body('name.vi').notEmpty(),
  body('name.en').notEmpty(),
  body('description.vi').notEmpty(),
  body('description.en').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let cv = await CV.findOne();
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    cv.projects.push(req.body);
    await cv.save();

    res.json({
      message: 'Project added successfully',
      project: cv.projects[cv.projects.length - 1]
    });
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
