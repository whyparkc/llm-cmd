import axios from 'axios';
import os from 'os';
import process from 'process';

export async function generateCommand(prompt) {
  try {
    // Get system information
    const systemInfo = {
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
      arch: os.arch(),
      cwd: process.cwd()
    };

    // Call LLM API
    const response = await axios.post(process.env.LLM_ENDPOINT, {
      model: process.env.LLM_MODEL,
      messages: [{
        role: "user",
        content: `System Information:
        - OS: ${systemInfo.platform} (${systemInfo.release})
        - System Type: ${systemInfo.type}
        - Architecture: ${systemInfo.arch}
        - Current Working Directory: ${systemInfo.cwd}
        
        Please generate a command to perform the following task: ${prompt}
        
        Requirements:
        1. Return only valid shell commands
        2. Each command should be on a new line
        3. Do not include any explanations, just the commands
        
        Example format:
        which node
        node --version`
      }],
      temperature: parseFloat(process.env.LLM_TEMPERATURE),
      max_tokens: parseInt(process.env.LLM_MAX_TOKENS)
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    throw new Error('Error occurred while calling LLM API: ' + error.message);
  }
}