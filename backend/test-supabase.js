const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const testSupabase = async () => {
  try {
    console.log('🔗 Testing Supabase connection...');
    console.log('📊 Environment:', process.env.NODE_ENV);
    console.log('🔑 Supabase URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
    console.log('🔑 Supabase Key:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error('Supabase URL or Key not set');
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Test connection by listing buckets
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      throw error;
    }

    console.log('✅ Supabase connected successfully');
    console.log(`📁 Available buckets: ${data.length}`);
    data.forEach(bucket => {
      console.log(`  - ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
    });
    
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
    process.exit(1);
  }
};

testSupabase();
