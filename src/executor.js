import { exec } from 'child_process';
import { promisify } from 'util';

// Convert exec to Promise-based function
const execAsync = promisify(exec);

export async function executeCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    throw new Error('Error executing command: ' + error.message);
  }
} 