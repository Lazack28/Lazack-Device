import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const updateEnv = (key, value) => {
  const envVars = dotenv.parse(fs.readFileSync('.env'));

  const existingValue = envVars[key];
  envVars[key] = existingValue ? `${existingValue},${value}` : value;

  const newEnvContent = Object.entries(envVars)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  fs.writeFileSync('.env', newEnvContent);

  console.log('Restarting the application...');
  process.exit(0); // Exit the process to allow a restart mechanism to restart it
};

const sessionCommand = async (m, sock) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['addsession', 'adduser'];

  if (validCommands.includes(cmd)) {
    if (!args) {
      return sock.sendMessage(m.from, {
        text: `Please provide some text, Example usage: ${prefix + cmd} example,example1,example2`,
      });
    }

    try {
      updateEnv('SESSION_ID', args);
      return sock.sendMessage(m.from, {
        text: `SESSION_ID has been updated to: ${process.env.SESSION_ID}`,
      });
    } catch (error) {
      console.error("Error updating .env file:", error);
      return sock.sendMessage(m.from, {
        text: '*Oops! Something went wrong while updating the .env file. Please try again later.*',
      });
    }
  }
};

export default sessionCommand;
