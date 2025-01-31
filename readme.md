# LLM-CMD

## Introduction
LLM-CMD is a command-line tool that generates and executes system commands using natural language. It leverages Large Language Models (LLM) to convert user's natural language descriptions into executable commands.

## Getting Started

### Prerequisites
- Node.js v18.0.0 or higher (required for inquirer v9)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/whyparkc/llm-cmd
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
Create a `.env` file and set up the following variables:
```plaintext
LLM_ENDPOINT="https://api.openai.com/v1"
LLM_API_KEY="your_api_key"
LLM_MODEL="gpt-3.5-turbo"
LLM_TEMPERATURE="0.7"
LLM_MAX_TOKENS="100"
```

Note: While the default endpoint is set to OpenAI's API, you can use any LLM endpoint that is compatible with OpenAI's API format. This includes services like Azure OpenAI, Anthropic Claude, or self-hosted models that implement OpenAI-compatible endpoints.

4. Run the application
```bash
npm link  # Install the CLI tool globally
llm-cmd "your natural language command"
```

## Features
- Convert natural language to system commands
- Multiple command suggestions and selection
- Command execution confirmation prompt
- Secure environment variable management

## Tech Stack
- Runtime: Node.js
- CLI Framework: Commander.js
- User Interaction: Inquirer.js
- HTTP Client: Axios
- Environment Variables: dotenv

## Project Structure
```plaintext
/
├── index.js          # CLI entry point
├── src/
│   ├── executor.js   # Command execution logic
│   └── llm.js        # LLM communication logic
├── .env              # Environment variables
└── package.json      # Project metadata
```

## Usage Example
```bash
# Single command execution
llm-cmd "find all javascript files in current directory"

# Multi-word commands also work without quotes
llm-cmd find all javascript files in current directory

? Select a command to execute: 
  1) find . -type f -name "*.js"
  2) find . -name "*.js"
  3) ls -R | grep "\.js$"
  Answer: 1

# The selected command will be executed
```

Key Features:
- Supports both quoted and space-separated natural language input
- LLM suggests multiple command options
- Interactive selection menu for choosing the desired command
- Selected command is automatically executed on your system

## License
ISC License

## Important Notes
- Always review generated commands before execution
- Keep your API keys secure
- Exercise caution with commands that can affect your system