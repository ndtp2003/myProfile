const express = require('express');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Initialize Supabase client
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @route   POST /api/upload/image
// @desc    Upload image to Supabase
// @access  Private (Admin)
router.post('/image', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ message: 'Supabase not configured' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Generate unique filename
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `cv-images/${fileName}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ message: 'Failed to upload image' });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    res.json({
      message: 'Image uploaded successfully',
      url: urlData.publicUrl,
      path: filePath
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/upload/image
// @desc    Delete image from Supabase
// @access  Private (Admin)
router.delete('/image', adminAuth, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ message: 'Supabase not configured' });
    }
    
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({ message: 'Image path is required' });
    }

    // Delete from Supabase
    const { error } = await supabase.storage
      .from('images')
      .remove([path]);

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(500).json({ message: 'Failed to delete image' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/upload/images
// @desc    List all uploaded images
// @access  Private (Admin)
router.get('/images', adminAuth, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ message: 'Supabase not configured' });
    }
    
    const { data, error } = await supabase.storage
      .from('images')
      .list('cv-images', {
        limit: 100,
        offset: 0
      });

    if (error) {
      console.error('Supabase list error:', error);
      return res.status(500).json({ message: 'Failed to list images' });
    }

    // Get public URLs for all images
    const images = data.map(file => {
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(`cv-images/${file.name}`);
      
      return {
        name: file.name,
        url: urlData.publicUrl,
        path: `cv-images/${file.name}`,
        size: file.metadata?.size,
        lastModified: file.updated_at
      };
    });

    res.json({ images });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
