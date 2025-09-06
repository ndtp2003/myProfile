const fs = require('fs');
const path = require('path');

const setupEnvironment = () => {
  const environment = process.argv[2] || 'development';
  
  console.log(`🔧 Setting up ${environment} environment...`);

  // Backend environment setup
  const backendEnvSource = path.join(__dirname, '..', 'backend', `env.${environment}`);
  const backendEnvTarget = path.join(__dirname, '..', 'backend', '.env');
  
  if (fs.existsSync(backendEnvSource)) {
    fs.copyFileSync(backendEnvSource, backendEnvTarget);
    console.log(`✅ Backend .env file created from env.${environment}`);
  } else {
    console.log(`❌ Backend env.${environment} file not found`);
  }

  // Frontend environment setup
  const frontendEnvSource = path.join(__dirname, '..', 'frontend', `env.${environment}`);
  const frontendEnvTarget = path.join(__dirname, '..', 'frontend', '.env');
  
  if (fs.existsSync(frontendEnvSource)) {
    fs.copyFileSync(frontendEnvSource, frontendEnvTarget);
    console.log(`✅ Frontend .env file created from env.${environment}`);
  } else {
    console.log(`❌ Frontend env.${environment} file not found`);
  }

  console.log(`🎉 Environment setup completed for ${environment}`);
};

setupEnvironment();
