import fs from 'fs';
import path from 'path';
import axios from 'axios';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const envFilePath = path.resolve(__dirname, '../.env');

// Helper function to update environment variable in the .env file
const updateEnvFile = (varName, varValue) => {
  const envEntry = `${varName.toUpperCase()}=${varValue}`;
  fs.appendFileSync(envFilePath, `${envEntry}\n`);
};

// Handler for updating env vars and restarting Heroku
const updateHerokuEnv = async (varName, varValue) => {
  const herokuApiToken = process.env.HEROKU_API_TOKEN;
  const herokuAppName = process.env.HEROKU_APP_NAME;

  if (!herokuApiToken || !herokuAppName) {
    throw new Error('Heroku API token or app name is not set.');
  }

  // Update the environment variable on Heroku
  await axios.patch(
    `https://api.heroku.com/apps/${herokuAppName}/config-vars`,
    { [varName]: varValue },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${herokuApiToken}`,
        'Accept': 'application/vnd.heroku+json; version=3',
      },
    }
  );

  // Restart the Heroku dyno
  await axios.delete(
    `https://api.heroku.com/apps/${herokuAppName}/dynos`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${herokuApiToken}`,
        'Accept': 'application/vnd.heroku+json; version=3',
      },
    }
  );
};

// Handler for updating env vars and restarting Koyeb
const updateKoyebEnv = async (varName, varValue) => {
  const koyebApiToken = process.env.KOYEB_API_TOKEN;
  const koyebAppName = process.env.KOYEB_APP_NAME;

  if (!koyebApiToken || !koyebAppName) {
    throw new Error('Koyeb API token or app name is not set.');
  }

  const service = await axios.get(`https://app.koyeb.com/v1/services`, {
    headers: {
      'Authorization': `Bearer ${koyebApiToken}`,
    },
  });

  const serviceId = service.data.services.find(service => service.name === koyebAppName).id;

  // Update the environment variable on Koyeb
  await axios.patch(
    `https://app.koyeb.com/v1/services/${serviceId}/env`,
    { [varName]: varValue },
    {
      headers: {
        'Authorization': `Bearer ${koyebApiToken}`,
      },
    }
  );

  // Restart the Koyeb service
  await axios.post(
    `https://app.koyeb.com/v1/services/${serviceId}/deploy`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${koyebApiToken}`,
      },
    }
  );
};

// Add similar handlers for Render, CleverCloud, Railway, etc.

// Main function to set environment variable and restart the appropriate service
const setEnvCommand = async (m, args) => {
  if (args.length !== 1) {
    m.reply('Usage: .setenv VARIABLE_NAME=VARIABLE_VALUE');
    return;
  }

  const [varAssignment] = args;
  const [varName, varValue] = varAssignment.split('=');

  if (!varName || !varValue) {
    m.reply('Invalid format. Usage: .setenv VARIABLE_NAME=VARIABLE_VALUE');
    return;
  }

  try {
    updateEnvFile(varName, varValue);
    m.reply(`Environment variable ${varName} has been set to ${varValue}.`);

    const platform = process.env.DEPLOYMENT_PLATFORM;
    if (!platform) {
      throw new Error('Deployment platform is not set.');
    }

    switch (platform.toLowerCase()) {
      case 'heroku':
        await updateHerokuEnv(varName, varValue);
        break;
      case 'koyeb':
        await updateKoyebEnv(varName, varValue);
        break;
      // Add cases for Render, CleverCloud, Railway, etc.
      default:
        throw new Error(`Unsupported deployment platform: ${platform}`);
    }

    m.reply(`Environment variable ${varName} updated on ${platform}.`);
    m.reply(`${platform} service restarted successfully.`);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    m.reply(`Failed to update environment variable or restart the service on ${platform}.`);
  }
};

export default setEnvCommand;
