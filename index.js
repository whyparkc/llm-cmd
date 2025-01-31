#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import { config } from 'dotenv';
import { executeCommand } from './src/executor.js';
import { generateCommand } from './src/llm.js';

config();

program
  .argument('<prompt...>', 'Command description in natural language')
  .action(async (prompts) => {
    try {
      // Combine all arguments into a single prompt
      const prompt = prompts.join(' ');
      
      // Generate command from LLM
      const commands = (await generateCommand(prompt))
        .split('\n')
        .map(cmd => cmd.trim())
        .filter(cmd => cmd.length > 0);

      if (commands.length === 0) {
        console.log('No valid commands generated.');
        return;
      }
      
      // Ask user to select a command
      const { selectedCommand } = await inquirer.prompt([
        {
          type: 'rawlist',
          name: 'selectedCommand',
          message: 'Select a command to execute:',
          choices: commands.map((cmd, index) => ({
            name: cmd,
            value: cmd
          })),
          validate: function(input) {
            if (input === '' || isNaN(input)) {
              return 'Please enter a number to execute the command';
            }
            return true;
          }
        }
      ]);

      // Execute the selected command
      await executeCommand(selectedCommand);

    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  });

program.parse(); 