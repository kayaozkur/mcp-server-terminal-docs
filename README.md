# @lepion/mcp-server-terminal-docs

[![npm version](https://img.shields.io/npm/v/@lepion/mcp-server-terminal-docs.svg)](https://www.npmjs.com/package/@lepion/mcp-server-terminal-docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://modelcontextprotocol.io)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

A powerful Model Context Protocol (MCP) server that provides intelligent terminal documentation and prompt enhancement capabilities. This server enables AI assistants like Claude to access comprehensive command-line documentation, validate commands, create workflows, and enhance prompts using a sophisticated 5-tier enhancement system.

---

## 🚀 Features

### Core Documentation Features
- 📖 **Comprehensive Command Info**: Get detailed usage, examples, and alternatives for any terminal command
- 🔍 **Smart Command Search**: Search commands by functionality, keywords, or use case
- 📊 **Command Categories**: Browse commands organized by category (file, network, git, docker, etc.)
- 🔧 **Alias Resolution**: Look up shell aliases and their expansions
- 📈 **Database Statistics**: Access comprehensive stats about the command knowledge base

### Intelligent Enhancement Features
- 🎯 **5-Tier Prompt Enhancement**: Transform prompts through BASE→CORE→PRIME→ELITE→APEX levels
- 🛡️ **Command Validation**: Validate syntax and safety before execution
- 💬 **Output Explanation**: Understand terminal output, errors, and get solutions
- 🔄 **Workflow Creation**: Generate multi-step terminal workflows with error handling
- 🎓 **Audience Targeting**: Tailor documentation for different skill levels

### Command Coverage
- **Built-in Commands**: Core Unix/Linux commands (ls, grep, find, etc.)
- **Development Tools**: git, docker, npm, yarn, python, node
- **Modern CLI Tools**: AI assistants, cloud tools, container orchestration
- **System Administration**: Process management, networking, file operations
- **Text Processing**: sed, awk, jq, and modern alternatives

## 📦 Installation

```bash
# Install from npm (recommended)
npm install -g @lepion/mcp-server-terminal-docs

# Or clone the repository for development
git clone https://github.com/lepion/mcp-server-terminal-docs.git
cd mcp-server-terminal-docs

# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Log level (debug, info, warn, error)
LOG_LEVEL=info

# Optional: Custom command database path
COMMAND_DB_PATH=/path/to/custom/commands.json

# Optional: Enable caching for faster responses
ENABLE_CACHE=true
CACHE_TTL=3600
```

### Claude Desktop Integration

Add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "terminal-docs": {
      "command": "npx",
      "args": ["@lepion/mcp-server-terminal-docs"],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

Or if installed locally:

```json
{
  "mcpServers": {
    "terminal-docs": {
      "command": "node",
      "args": ["/path/to/mcp-server-terminal-docs/dist/index.js"],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

## 🛠️ Available Tools

### 1. `terminal_get_command_info`
Get comprehensive information about terminal commands including usage, examples, and alternatives.

```typescript
{
  command: "grep",                    // Required: Command to get info about
  include_examples?: true,            // Include practical examples (default: true)
  include_alternatives?: true         // Include alternative commands (default: true)
}
```

**Example Response:**
```json
{
  "command": "grep",
  "description": "Search for patterns in files",
  "syntax": "grep [OPTIONS] PATTERN [FILE...]",
  "common_options": [
    "-i: Case insensitive search",
    "-r: Recursive search",
    "-n: Show line numbers"
  ],
  "examples": [
    "grep -i 'error' /var/log/syslog",
    "grep -r 'TODO' ./src"
  ],
  "alternatives": ["ripgrep (rg)", "ag (The Silver Searcher)", "ack"]
}
```

### 2. `terminal_enhance_prompt`
Enhance prompts using the 5-tier enhancement system (BASE→CORE→PRIME→ELITE→APEX).

```typescript
{
  original_prompt: "find large files",       // Required: Original prompt
  enhancement_level?: "core",                // Level: base|core|prime|elite|apex
  context?: "disk cleanup task",             // Additional context
  target_audience?: "intermediate"           // beginner|intermediate|advanced|expert
}
```

**Enhancement Levels:**
- **BASE**: Basic clarity improvements
- **CORE**: Add context and specificity
- **PRIME**: Include edge cases and best practices
- **ELITE**: Advanced techniques and optimizations
- **APEX**: Expert-level comprehensive solutions

### 3. `terminal_search_commands`
Search for terminal commands by functionality, keywords, or use case.

```typescript
{
  query: "file compression",          // Required: Search query
  category?: "all",                   // Filter by category
  max_results?: 10                    // Maximum results to return
}
```

**Categories:**
- `file`: File operations
- `network`: Network utilities
- `process`: Process management
- `text`: Text processing
- `system`: System administration
- `git`: Version control
- `docker`: Container management
- `all`: Search all categories

### 4. `terminal_explain_output`
Explain terminal command output, errors, and provide solutions.

```typescript
{
  command: "docker ps",               // Required: Command that was executed
  output: "Cannot connect to...",     // Required: Output or error message
  context?: "trying to list containers" // Additional context
}
```

### 5. `terminal_validate_command`
Validate command syntax and safety before execution.

```typescript
{
  command: "rm -rf /",                // Required: Command to validate
  safety_level?: "moderate",          // basic|moderate|strict
  explain_risks?: true                // Explain potential risks
}
```

### 6. `terminal_create_workflow`
Create multi-step terminal workflows with error handling.

```typescript
{
  workflow_description: "Deploy app to production",  // Required
  include_error_handling?: true,                     // Include error handling
  output_format?: "script"                          // script|makefile|json|markdown
}
```

### 7. `terminal_get_alias_info`
Get information about shell aliases and their expansions.

```typescript
{
  alias: "ga"                         // Required: Alias to look up
}
```

### 8. `terminal_get_commands_by_category`
Get all commands in a specific category.

```typescript
{
  category: "git"                     // Required: Command category
}
```

### 9. `terminal_get_commands_by_type`
Get all commands by tool type (installation method).

```typescript
{
  tool_type: "homebrew"               // Required: builtin|homebrew|personal|ai|development
}
```

### 10. `terminal_get_database_stats`
Get comprehensive statistics about the terminal command database.

```typescript
{}  // No parameters required
```

## 📚 Usage Examples

### Example 1: Learning About a Command
```javascript
// Request
{
  "tool": "terminal_get_command_info",
  "arguments": {
    "command": "find",
    "include_examples": true,
    "include_alternatives": true
  }
}

// Claude will provide detailed information about the find command,
// including syntax, common options, practical examples, and modern alternatives
```

### Example 2: Enhancing a Terminal Task
```javascript
// Request
{
  "tool": "terminal_enhance_prompt",
  "arguments": {
    "original_prompt": "delete old log files",
    "enhancement_level": "prime",
    "context": "server maintenance",
    "target_audience": "intermediate"
  }
}

// Claude will provide an enhanced version with safety checks,
// specific paths, size criteria, and backup recommendations
```

### Example 3: Creating a Deployment Workflow
```javascript
// Request
{
  "tool": "terminal_create_workflow",
  "arguments": {
    "workflow_description": "Build and deploy Node.js app with Docker",
    "include_error_handling": true,
    "output_format": "script"
  }
}

// Claude will generate a complete bash script with:
// - Build steps
// - Testing
// - Docker image creation
// - Deployment commands
// - Error handling and rollback procedures
```

### Example 4: Understanding an Error
```javascript
// Request
{
  "tool": "terminal_explain_output",
  "arguments": {
    "command": "git push origin main",
    "output": "error: failed to push some refs to 'origin'\nhint: Updates were rejected because the remote contains work that you do\nhint: not have locally.",
    "context": "trying to push my changes"
  }
}

// Claude will explain the error and provide solutions like:
// - git pull --rebase origin main
// - Resolving merge conflicts
// - Force push considerations
```

## 🎯 Use Cases

### For Developers
- Quick command reference without leaving the conversation
- Learn modern alternatives to traditional Unix commands
- Create complex deployment scripts with error handling
- Understand and fix terminal errors quickly

### For System Administrators
- Validate potentially dangerous commands before execution
- Create standardized workflows for common tasks
- Access comprehensive documentation for system commands
- Learn best practices for command-line operations

### For DevOps Engineers
- Generate CI/CD pipeline scripts
- Create container orchestration workflows
- Validate infrastructure commands
- Document command-line procedures

### For Beginners
- Learn commands with clear examples
- Understand command output and errors
- Get safer alternatives for dangerous operations
- Progress from basic to advanced usage

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🐛 Troubleshooting

### Common Issues

1. **"Command not found in database"**
   - The command might be very new or system-specific
   - Try searching for similar commands using `terminal_search_commands`
   - Check command availability with `terminal_get_database_stats`

2. **"Enhancement level not recognized"**
   - Valid levels are: base, core, prime, elite, apex
   - Default is "core" if not specified

3. **"Category not found"**
   - Use `terminal_get_database_stats` to see available categories
   - Valid categories include: file, network, process, text, system, git, docker

4. **Performance Issues**
   - Enable caching with `ENABLE_CACHE=true`
   - Adjust cache TTL for your needs
   - Check log level (debug mode can slow down responses)

### Debug Mode

Enable detailed logging:

```bash
export LOG_LEVEL=debug
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io) specification
- Inspired by the need for better terminal documentation in AI conversations
- Command database curated from various open-source documentation projects

## 📬 Support

- 🐛 [Report bugs](https://github.com/lepion/mcp-server-terminal-docs/issues)
- 💡 [Request features](https://github.com/lepion/mcp-server-terminal-docs/issues)
- 📖 [Read the docs](https://github.com/lepion/mcp-server-terminal-docs/wiki)
- 💬 [Join discussions](https://github.com/lepion/mcp-server-terminal-docs/discussions)

---

Built with ❤️ by the Lepion Team