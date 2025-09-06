const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔗 Testing MongoDB connection...');
    console.log('📊 Environment:', process.env.NODE_ENV);
    console.log('🔑 MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    
    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections: ${collections.length}`);
    
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

testConnection();
