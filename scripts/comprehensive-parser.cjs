#!/usr/bin/env node

/**
 * Comprehensive parser for ALL terminal documentation files including installation files
 * Generates complete command database with 162+ commands and 100+ aliases
 */

const fs = require('fs');
const path = require('path');

const terminalDocsPath = '/Users/kayaozkur/Desktop/lepion/terminal_docs';

// Read all documentation files
const comprehensiveDoc = fs.readFileSync(path.join(terminalDocsPath, 'comprehensive_command_documentation.md'), 'utf8');
const aliasDoc = fs.readFileSync(path.join(terminalDocsPath, 'command_aliases_documentation.md'), 'utf8');
const completeAliasDoc = fs.readFileSync(path.join(terminalDocsPath, 'complete_alias_command_dump.md'), 'utf8');
const completeAliasDoc2 = fs.readFileSync(path.join(terminalDocsPath, 'complete_alias_command_dump_part2.md'), 'utf8');
const ultimateRef = fs.readFileSync(path.join(terminalDocsPath, 'ultimate_terminal_reference.md'), 'utf8');

// Parse comprehensive documentation
function parseComprehensiveDoc(content) {
    const commands = [];
    const lines = content.split('\n');
    let currentCategory = '';
    
    for (const line of lines) {
        // Category detection
        if (line.startsWith('## ')) {
            const categoryMatch = line.match(/## (.+)/);
            if (categoryMatch) {
                currentCategory = categoryMatch[1].toLowerCase()
                    .replace(/🚀|📂|🔄|🤖|🧰|📊|🔨|🔍|📦|🔧|🌐|📡|🧪|🎨|📝/g, '')
                    .trim();
            }
        }
        
        // Command detection: - `command` - description
        const commandMatch = line.match(/^-\s*\`([^`]+)\`\s*-\s*(.+)/);
        if (commandMatch) {
            const [, commandName, description] = commandMatch;
            
            // Skip navigation numbers like 1-9
            if (/^\d+-\d+$/.test(commandName)) continue;
            
            // Extract alias expansion if present
            let aliasExpansion = null;
            const expansionMatch = description.match(/\(`([^)]+)`\)/);
            if (expansionMatch) {
                aliasExpansion = expansionMatch[1];
            }
            
            const command = {
                name: commandName,
                description: description.replace(/\s*\([^)]*\)\s*$/, ''), // Remove expansion from description
                category: mapCategory(currentCategory),
                is_alias: aliasExpansion !== null,
                expands_to: aliasExpansion,
                tool_type: determineToolType(commandName, description),
                safety_level: determineSafetyLevel(commandName, description),
                installation: determineInstallation(commandName, description),
                package_manager: determinePackageManager(commandName, description)
            };
            
            commands.push(command);
        }
    }
    
    return commands;
}

// Parse complete alias dumps for TONS of additional aliases
function parseCompleteAliasDumps(content1, content2) {
    const aliases = [];
    const combinedContent = content1 + '\n' + content2;
    const lines = combinedContent.split('\n');
    
    for (const line of lines) {
        // Match alias patterns like: alias_name='command'
        // or alias_name=command
        const aliasMatch = line.match(/^([a-zA-Z0-9._-]+)=(.+)$/);
        if (aliasMatch) {
            let [, aliasName, expansion] = aliasMatch;
            
            // Clean up expansion (remove quotes)
            expansion = expansion.replace(/^['"]|['"]$/g, '');
            
            // Skip complex shell functions and internal variables
            if (expansion.includes('___x_cmd') || 
                expansion.includes('${') || 
                expansion.includes('function') ||
                expansion.length > 100) {
                continue;
            }
            
            // Skip numeric aliases (1-9)
            if (/^\d+$/.test(aliasName)) continue;
            
            aliases.push({
                name: aliasName,
                description: `Alias for: ${expansion}`,
                category: determineAliasCategory(aliasName, expansion),
                is_alias: true,
                expands_to: expansion,
                tool_type: 'personal',
                safety_level: determineSafetyLevel(aliasName, expansion),
                installation: 'Shell alias (already configured)',
                package_manager: 'shell'
            });
        }
    }
    
    return aliases;
}

function determineAliasCategory(aliasName, expansion) {
    if (aliasName.startsWith('g') && (expansion.includes('git') || aliasName.match(/^g[a-z]+$/))) {
        return 'git';
    }
    if (expansion.includes('cd') || aliasName.includes('..')) {
        return 'navigation';
    }
    if (expansion.includes('ls') || aliasName.match(/^l[als]*$/)) {
        return 'file';
    }
    if (expansion.includes('grep') || expansion.includes('rg')) {
        return 'search';
    }
    if (expansion.includes('docker')) {
        return 'container';
    }
    if (expansion.includes('npm') || expansion.includes('yarn') || expansion.includes('node')) {
        return 'development';
    }
    return 'shell';
}

function mapCategory(category) {
    const categoryMap = {
        'directory navigation & file management': 'file',
        'git version control': 'git',
        'ai & development tools': 'ai',
        'system administration & utilities': 'system',
        'data processing & analysis': 'text',
        'development environments': 'development',
        'specialized tools': 'utilities',
        'shell functions & environment': 'shell',
        'homebrew packages': 'package',
        'personal bin tools': 'personal',
        'web development stack': 'development',
        'network & cloud tools': 'network',
        'database tools': 'database',
        'media & design tools': 'media',
        'documentation tools': 'docs'
    };
    
    return categoryMap[category] || 'utilities';
}

function determineToolType(name, description) {
    // Built-in commands
    const builtins = ['ls', 'cd', 'pwd', 'cp', 'mv', 'rm', 'mkdir', 'rmdir', 'cat', 'grep', 'find', 'curl', 'git', 'python3', 'node', 'npm'];
    if (builtins.includes(name)) return 'builtin';
    
    // AI tools
    const aiTools = ['goose', 'aichat', 'mods', 'claude', 'skate', 'tabby', 'ollama', 'codex', 'windsurf'];
    if (aiTools.includes(name)) return 'ai';
    
    // Development tools
    const devTools = ['code', 'cargo', 'go', 'rustc', 'julia', 'deno', 'gh', 'docker', 'kubectl'];
    if (devTools.includes(name)) return 'development';
    
    // Personal tools (usually in ~/.local/bin)
    if (description.includes('~/.local/bin') || description.includes('personal')) return 'personal';
    
    // Default to homebrew for modern tools
    return 'homebrew';
}

function determineSafetyLevel(name, description) {
    const dangerous = ['rm', 'rmdir', 'dd', 'mkfs', 'fdisk'];
    if (dangerous.includes(name) || description.includes('remove') || description.includes('delete')) {
        return 'dangerous';
    }
    
    const moderate = ['sudo', 'chmod', 'chown', 'docker', 'curl'];
    if (moderate.includes(name) || name.startsWith('_') || description.includes('sudo')) {
        return 'moderate';
    }
    
    return 'safe';
}

function determineInstallation(name, description) {
    if (description.includes('brew install')) return `brew install ${name}`;
    if (description.includes('~/.local/bin')) return `~/.local/bin/${name}`;
    if (['npm', 'yarn', 'bun'].includes(name)) return `brew install ${name}`;
    if (['python3', 'node', 'git', 'curl'].includes(name)) return 'System built-in';
    
    // Check if it's a common homebrew package
    const homebrewPackages = [
        'lsd', 'bat', 'fd', 'rg', 'fzf', 'tree', 'btop', 'tmux', 'jq', 'yq', 'gh', 'docker',
        'aichat', 'mods', 'deno', 'cargo', 'go', 'rustc', 'julia'
    ];
    if (homebrewPackages.includes(name)) return `brew install ${name}`;
    
    return `brew install ${name}`;
}

function determinePackageManager(name, description) {
    if (description.includes('~/.local/bin')) return 'manual';
    if (['ls', 'cd', 'pwd', 'cp', 'mv', 'rm', 'mkdir', 'cat', 'grep', 'find', 'curl', 'git', 'python3'].includes(name)) return 'system';
    return 'homebrew';
}

function generateCommandInfo(command) {
    const examples = generateExamples(command);
    const alternatives = generateAlternatives(command);
    const commonOptions = generateCommonOptions(command);
    const syntax = generateSyntax(command);
    
    return {
        name: command.name,
        description: command.description,
        syntax: syntax,
        examples: examples,
        alternatives: alternatives,
        category: command.category,
        safety_level: command.safety_level,
        common_options: commonOptions,
        ...(command.is_alias && { is_alias: true, expands_to: command.expands_to }),
        installation: command.installation,
        package_manager: command.package_manager,
        tool_type: command.tool_type
    };
}

function generateSyntax(command) {
    if (command.is_alias && command.expands_to) {
        return `${command.name} # Expands to: ${command.expands_to}`;
    }
    
    const syntaxMap = {
        // File operations
        'ls': 'ls [OPTION]... [FILE]...',
        'lsd': 'lsd [OPTIONS] [FILE]...',
        'tree': 'tree [OPTIONS] [directory]',
        'fd': 'fd [OPTIONS] [pattern] [path]',
        'bat': 'bat [OPTIONS] [file]...',
        'fzf': 'fzf [OPTIONS]',
        'rg': 'rg [OPTIONS] PATTERN [PATH]...',
        // Git
        'git': 'git [OPTIONS] <command> [<args>]',
        'gh': 'gh <command> [flags]',
        // AI tools
        'goose': 'goose [command] [options]',
        'aichat': 'aichat [OPTIONS] [message]',
        'mods': 'mods [OPTIONS] [prompt]',
        // System
        'docker': 'docker [OPTIONS] COMMAND [ARG...]',
        'curl': 'curl [options] <url>',
        'tmux': 'tmux [command] [options]',
        'btop': 'btop [options]',
        // Programming
        'python3': 'python3 [option] ... [-c cmd | -m mod | file | -] [arg] ...',
        'node': 'node [options] [V8 options] [script.js | -e "script" | -] [--] [arguments]',
        'npm': 'npm <command> [args]',
        'cargo': 'cargo [OPTIONS] [SUBCOMMAND]',
        // Text processing
        'jq': 'jq [options] <jq filter> [file...]',
        'yq': 'yq [options] <expression> [file...]'
    };
    
    return syntaxMap[command.name] || `${command.name} [options]`;
}

function generateExamples(command) {
    if (command.is_alias && command.expands_to) {
        return [
            `${command.name} # Executes: ${command.expands_to}`,
            `# This alias saves typing the full command`
        ];
    }
    
    const exampleMap = {
        'ls': ['ls -la # List all files with details', 'ls -lh # List with human-readable sizes', 'ls *.txt # List only .txt files'],
        'lsd': ['lsd # List files with icons', 'lsd -la # Long format with all files', 'lsd --tree # Tree view'],
        'tree': ['tree # Show tree structure', 'tree -L 2 # Limit to 2 levels', 'tree -a # Include hidden files'],
        'fd': ['fd .py # Find Python files', 'fd -t f -e js # Find JavaScript files', 'fd -H config # Include hidden files'],
        'bat': ['bat file.py # View with syntax highlighting', 'bat -n file.js # Show line numbers', 'bat --paging=never file.md # No paging'],
        'fzf': ['find . -type f | fzf # Find and select files', 'cat file.txt | fzf # Search within file content', 'history | fzf # Search command history'],
        'rg': ["rg 'function' . # Search for 'function' in current dir", "rg -i 'TODO' --type py # Case-insensitive search in Python files", "rg -n 'error' logs/ # Show line numbers"],
        'git': ['git status # Show working tree status', 'git add . # Stage all changes', "git commit -m 'message' # Commit changes"],
        'gh': ['gh repo list # List repositories', 'gh pr create # Create pull request', 'gh issue list # List issues'],
        'goose': ['goose # Start interactive AI chat', "goose ask 'How to write Python tests?'", 'goose session list # List chat sessions'],
        'aichat': ["aichat 'Explain Docker containers'", 'aichat -r shell # Shell-specific assistance', "aichat --model gpt-4 'Complex question'"],
        'mods': ["mods 'Write a bash script to backup files'", "echo 'code review this' | mods", "mods -m gpt-4 'complex question'"],
        'docker': ['docker ps # List running containers', 'docker run -it ubuntu bash # Run interactive container', 'docker build -t myapp . # Build image'],
        'curl': ['curl https://api.example.com # GET request', "curl -X POST -d 'data' https://api.example.com # POST request", 'curl -H "Authorization: Bearer token" https://api.example.com'],
        'tmux': ['tmux # Start new session', 'tmux new-session -d -s mysession # Create detached session', 'tmux attach -t mysession # Attach to session'],
        'btop': ['btop # Start resource monitor', 'btop --utf-force # Force UTF-8'],
        'python3': ['python3 script.py # Run Python script', 'python3 -c "print(\\"Hello\\")" # Execute Python code', 'python3 -m http.server # Start HTTP server'],
        'node': ['node app.js # Run JavaScript file', 'node -e "console.log(\\"Hello\\")" # Execute JavaScript code', 'node --version # Show version'],
        'npm': ['npm install # Install dependencies', 'npm run build # Run build script', 'npm test # Run tests'],
        'cargo': ['cargo run # Run the project', 'cargo build # Build the project', 'cargo test # Run tests'],
        'jq': ["cat data.json | jq '.' # Pretty print JSON", "jq '.name' data.json # Extract name field", "jq '.[] | select(.age > 30)' # Filter by condition"],
        'yq': ["yq '.name' config.yaml # Extract name field", 'yq -i \'.version = "2.0"\' config.yaml # Update in place', "yq eval '.services | keys' docker-compose.yml"]
    };
    
    return exampleMap[command.name] || [`${command.name} # Basic usage`, `${command.name} --help # Show help`];
}

function generateAlternatives(command) {
    const alternativeMap = {
        'ls': ['lsd', 'exa', 'tree'],
        'lsd': ['ls', 'exa', 'tree'],
        'tree': ['lsd --tree', 'broot'],
        'fd': ['find', 'fzf'],
        'bat': ['cat', 'less', 'more'],
        'fzf': ['grep', 'ag', 'rg'],
        'rg': ['grep', 'ag', 'ack'],
        'grep': ['rg', 'ag', 'ack', 'ripgrep'],
        'git': ['gh', 'git-delta'],
        'gh': ['git', 'hub'],
        'goose': ['aichat', 'mods', 'claude'],
        'aichat': ['goose', 'mods', 'claude'],
        'mods': ['goose', 'aichat', 'claude'],
        'docker': ['podman', 'containerd'],
        'curl': ['wget', 'httpie', 'xh'],
        'xh': ['curl', 'httpie'],
        'tmux': ['screen', 'zellij'],
        'screen': ['tmux', 'zellij'],
        'btop': ['htop', 'top', 'procs'],
        'python3': ['python', 'pypy3'],
        'node': ['deno', 'bun'],
        'deno': ['node', 'bun'],
        'npm': ['yarn', 'pnpm', 'bun'],
        'jq': ['fx', 'yq'],
        'yq': ['jq', 'fx'],
        'code': ['vim', 'nano', 'hx']
    };
    
    return alternativeMap[command.name] || [];
}

function generateCommonOptions(command) {
    if (command.is_alias) return [];
    
    const optionsMap = {
        'ls': [
            { flag: '-l', description: 'Use long listing format' },
            { flag: '-a', description: 'Show hidden files' },
            { flag: '-h', description: 'Human-readable sizes' }
        ],
        'lsd': [
            { flag: '-l', description: 'Long format' },
            { flag: '-a', description: 'Show hidden files' },
            { flag: '--tree', description: 'Recursive tree view' }
        ],
        'tree': [
            { flag: '-L', description: 'Max display depth' },
            { flag: '-a', description: 'Show hidden files' },
            { flag: '-I', description: 'Ignore pattern' }
        ],
        'fd': [
            { flag: '-t', description: 'Filter by type (f=file, d=directory)' },
            { flag: '-e', description: 'Filter by extension' },
            { flag: '-H', description: 'Include hidden files' }
        ],
        'bat': [
            { flag: '-n', description: 'Show line numbers' },
            { flag: '--paging', description: 'Control paging behavior' },
            { flag: '--style', description: 'Control output style' }
        ],
        'fzf': [
            { flag: '--preview', description: 'Preview command' },
            { flag: '--multi', description: 'Enable multi-select' },
            { flag: '--reverse', description: 'Reverse layout' }
        ],
        'rg': [
            { flag: '-i', description: 'Case insensitive' },
            { flag: '-n', description: 'Show line numbers' },
            { flag: '--type', description: 'Filter by file type' }
        ],
        'git': [
            { flag: 'status', description: 'Show working tree status' },
            { flag: 'add', description: 'Stage changes' },
            { flag: 'commit', description: 'Record changes' }
        ],
        'docker': [
            { flag: 'ps', description: 'List containers' },
            { flag: 'run', description: 'Run container' },
            { flag: 'build', description: 'Build image' }
        ]
    };
    
    return optionsMap[command.name] || [];
}

// Parse all documentation
console.log('Parsing comprehensive documentation...');
const commands = parseComprehensiveDoc(comprehensiveDoc);

console.log('Parsing complete alias dumps...');
const aliases = parseCompleteAliasDumps(completeAliasDoc, completeAliasDoc2);

// Combine commands and aliases
const allCommands = [...commands, ...aliases];

// Remove duplicates (prefer detailed commands over simple aliases)
const uniqueCommands = [];
const seen = new Set();

for (const cmd of allCommands) {
    if (!seen.has(cmd.name)) {
        seen.add(cmd.name);
        uniqueCommands.push(cmd);
    }
}

// Generate complete command info for each command
const completeCommands = uniqueCommands.map(generateCommandInfo);

// Sort by name for better organization
completeCommands.sort((a, b) => a.name.localeCompare(b.name));

// Output results
console.log(`\nParsed ${commands.length} base commands`);
console.log(`Parsed ${aliases.length} aliases`);
console.log(`Total unique commands: ${uniqueCommands.length}`);
console.log('Categories:', [...new Set(uniqueCommands.map(c => c.category))]);
console.log('Tool types:', [...new Set(uniqueCommands.map(c => c.tool_type))]);

// Count aliases vs commands
const aliasCount = completeCommands.filter(c => c.is_alias).length;
const commandCount = completeCommands.filter(c => !c.is_alias).length;
console.log(`\nBreakdown: ${commandCount} commands, ${aliasCount} aliases`);

// Write to TypeScript file
const output = `// Auto-generated comprehensive command database with complete installation data
export const COMPREHENSIVE_COMMANDS = ${JSON.stringify(completeCommands, null, 2)};

export const COMMAND_COUNT = ${completeCommands.length};
export const ALIAS_COUNT = ${aliasCount};
export const BASE_COMMAND_COUNT = ${commandCount};
`;

fs.writeFileSync('/Users/kayaozkur/Desktop/lepion/mcp-terminal-docs-server/src/generated-commands.ts', output);

console.log(`\n✅ Generated ${completeCommands.length} complete entries (${commandCount} commands + ${aliasCount} aliases)`);
console.log('✅ Written to: src/generated-commands.ts');
console.log('✅ Ready for comprehensive terminal intelligence!');