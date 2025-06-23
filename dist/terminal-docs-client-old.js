/**
 * Enhanced Terminal Documentation Client
 * Comprehensive terminal command assistance with 400+ commands from real terminal docs
 */
import { logger } from "./logger.js";
import { COMPREHENSIVE_COMMANDS, COMMAND_COUNT } from "./generated-commands.js";
export class TerminalDocsClient {
    commandDatabase;
    aliasDatabase;
    constructor() {
        this.commandDatabase = new Map();
        this.aliasDatabase = new Map();
        this.initializeCommandDatabase();
    }
    initializeCommandDatabase() {
        // Use comprehensive command database generated from all terminal documentation files
        const commands = COMPREHENSIVE_COMMANDS;
        {
            name: "tree",
                description;
            "Display directory structure as a tree",
                syntax;
            "tree [OPTIONS] [directory]",
                examples;
            [
                "tree # Show tree structure",
                "tree -L 2 # Limit to 2 levels",
                "tree -a # Include hidden files"
            ],
                alternatives;
            ["lsd --tree", "broot"],
                category;
            "file",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-L", description: "Max display depth" },
                { flag: "-a", description: "Show hidden files" },
                { flag: "-I", description: "Ignore pattern" }
            ],
                installation;
            "brew install tree",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "fd",
                description;
            "Modern alternative to 'find'",
                syntax;
            "fd [OPTIONS] [pattern] [path]",
                examples;
            [
                "fd .py # Find Python files",
                "fd -t f -e js # Find JavaScript files",
                "fd -H config # Include hidden files"
            ],
                alternatives;
            ["find", "fzf"],
                category;
            "search",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-t", description: "Filter by type (f=file, d=directory)" },
                { flag: "-e", description: "Filter by extension" },
                { flag: "-H", description: "Include hidden files" }
            ],
                installation;
            "brew install fd",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "bat",
                description;
            "Better alternative to 'cat' with syntax highlighting",
                syntax;
            "bat [OPTIONS] [file]...",
                examples;
            [
                "bat file.py # View with syntax highlighting",
                "bat -n file.js # Show line numbers",
                "bat --paging=never file.md # No paging"
            ],
                alternatives;
            ["cat", "less", "more"],
                category;
            "text",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-n", description: "Show line numbers" },
                { flag: "--paging", description: "Control paging behavior" },
                { flag: "--style", description: "Control output style" }
            ],
                installation;
            "brew install bat",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "fzf",
                description;
            "Command-line fuzzy finder",
                syntax;
            "fzf [OPTIONS]",
                examples;
            [
                "find . -type f | fzf # Find and select files",
                "cat file.txt | fzf # Search within file content",
                "history | fzf # Search command history"
            ],
                alternatives;
            ["grep", "ag", "rg"],
                category;
            "search",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "--preview", description: "Preview command" },
                { flag: "--multi", description: "Enable multi-select" },
                { flag: "--reverse", description: "Reverse layout" }
            ],
                installation;
            "brew install fzf",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        // Search Tools
        {
            name: "rg",
                description;
            "Fast line-oriented search tool (ripgrep)",
                syntax;
            "rg [OPTIONS] PATTERN [PATH]...",
                examples;
            [
                "rg 'function' . # Search for 'function' in current dir",
                "rg -i 'TODO' --type py # Case-insensitive search in Python files",
                "rg -n 'error' logs/ # Show line numbers"
            ],
                alternatives;
            ["grep", "ag", "ack"],
                category;
            "search",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-i", description: "Case insensitive" },
                { flag: "-n", description: "Show line numbers" },
                { flag: "--type", description: "Filter by file type" }
            ],
                installation;
            "brew install ripgrep",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "grep",
                description;
            "Search text patterns in files",
                syntax;
            "grep [OPTION]... PATTERN [FILE]...",
                examples;
            [
                "grep 'pattern' file.txt # Search for pattern in file",
                "grep -r 'pattern' . # Recursive search in directory",
                "grep -i 'pattern' file.txt # Case-insensitive search"
            ],
                alternatives;
            ["rg", "ag", "ack", "ripgrep"],
                category;
            "text",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-r", description: "Recursive search" },
                { flag: "-i", description: "Case-insensitive" },
                { flag: "-n", description: "Show line numbers" }
            ],
                tool_type;
            "builtin";
        }
        // Git Version Control
        {
            name: "git",
                description;
            "Distributed version control system",
                syntax;
            "git [OPTIONS] <command> [<args>]",
                examples;
            [
                "git status # Show working tree status",
                "git add . # Stage all changes",
                "git commit -m 'message' # Commit changes"
            ],
                alternatives;
            ["gh", "git-delta"],
                category;
            "git",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "status", description: "Show working tree status" },
                { flag: "add", description: "Stage changes" },
                { flag: "commit", description: "Record changes" }
            ],
                aliases;
            ["g", "ga", "gc", "gst", "gco", "gd"],
                tool_type;
            "builtin";
        }
        {
            name: "gh",
                description;
            "GitHub CLI",
                syntax;
            "gh <command> [flags]",
                examples;
            [
                "gh repo list # List repositories",
                "gh pr create # Create pull request",
                "gh issue list # List issues"
            ],
                alternatives;
            ["git", "hub"],
                category;
            "git",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "repo", description: "Repository commands" },
                { flag: "pr", description: "Pull request commands" },
                { flag: "issue", description: "Issue commands" }
            ],
                installation;
            "brew install gh",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        // AI & Development Tools
        {
            name: "goose",
                description;
            "AI LLM chat in terminal",
                syntax;
            "goose [command] [options]",
                examples;
            [
                "goose # Start interactive AI chat",
                "goose ask 'How to write Python tests?'",
                "goose session list # List chat sessions"
            ],
                alternatives;
            ["aichat", "mods", "claude"],
                category;
            "ai",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "ask", description: "Ask a question" },
                { flag: "session", description: "Manage sessions" },
                { flag: "--model", description: "Specify AI model" }
            ],
                installation;
            "~/.local/bin/goose",
                tool_type;
            "ai";
        }
        {
            name: "aichat",
                description;
            "Terminal AI assistant",
                syntax;
            "aichat [OPTIONS] [message]",
                examples;
            [
                "aichat 'Explain Docker containers'",
                "aichat -r shell # Shell-specific assistance",
                "aichat --model gpt-4 'Complex question'"
            ],
                alternatives;
            ["goose", "mods", "claude"],
                category;
            "ai",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-r", description: "Use role/preset" },
                { flag: "--model", description: "Specify model" },
                { flag: "--save", description: "Save conversation" }
            ],
                installation;
            "brew install aichat",
                package_manager;
            "homebrew",
                tool_type;
            "ai";
        }
        {
            name: "mods",
                description;
            "AI on the command line",
                syntax;
            "mods [OPTIONS] [prompt]",
                examples;
            [
                "mods 'Write a bash script to backup files'",
                "echo 'code review this' | mods",
                "mods -m gpt-4 'complex question'"
            ],
                alternatives;
            ["goose", "aichat", "claude"],
                category;
            "ai",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-m", description: "Specify model" },
                { flag: "-f", description: "Format output" },
                { flag: "--no-cache", description: "Disable caching" }
            ],
                installation;
            "brew install charmbracelet/tap/mods",
                package_manager;
            "homebrew",
                tool_type;
            "ai";
        }
        {
            name: "code",
                description;
            "Launch Visual Studio Code",
                syntax;
            "code [options] [paths...]",
                examples;
            [
                "code . # Open current directory",
                "code file.py # Open specific file",
                "code --diff file1.py file2.py # Compare files"
            ],
                alternatives;
            ["vim", "nano", "hx"],
                category;
            "development",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "--diff", description: "Compare files" },
                { flag: "-g", description: "Go to line/column" },
                { flag: "--wait", description: "Wait for window to close" }
            ],
                tool_type;
            "development";
        }
        // System Administration & Utilities
        {
            name: "btop",
                description;
            "Resource monitor and process viewer",
                syntax;
            "btop [options]",
                examples;
            [
                "btop # Start resource monitor",
                "btop --utf-force # Force UTF-8"
            ],
                alternatives;
            ["htop", "top", "procs"],
                category;
            "system",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "--utf-force", description: "Force UTF-8" },
                { flag: "--preset", description: "Use preset config" }
            ],
                installation;
            "brew install btop",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "tmux",
                description;
            "Terminal multiplexer",
                syntax;
            "tmux [command] [options]",
                examples;
            [
                "tmux # Start new session",
                "tmux new-session -d -s mysession # Create detached session",
                "tmux attach -t mysession # Attach to session"
            ],
                alternatives;
            ["screen", "zellij"],
                category;
            "terminal",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "new-session", description: "Create new session" },
                { flag: "attach", description: "Attach to session" },
                { flag: "list-sessions", description: "List sessions" }
            ],
                installation;
            "brew install tmux",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "docker",
                description;
            "Container platform",
                syntax;
            "docker [OPTIONS] COMMAND [ARG...]",
                examples;
            [
                "docker ps # List running containers",
                "docker run -it ubuntu bash # Run interactive container",
                "docker build -t myapp . # Build image"
            ],
                alternatives;
            ["podman", "containerd"],
                category;
            "container",
                safety_level;
            "moderate",
                common_options;
            [
                { flag: "ps", description: "List containers" },
                { flag: "run", description: "Run container" },
                { flag: "build", description: "Build image" }
            ],
                installation;
            "brew install docker",
                package_manager;
            "homebrew",
                tool_type;
            "development";
        }
        {
            name: "rm",
                description;
            "Remove files and directories",
                syntax;
            "rm [OPTION]... FILE...",
                examples;
            [
                "rm file.txt # Remove single file",
                "rm -r directory/ # Remove directory recursively",
                "rm -i *.tmp # Interactive removal with confirmation"
            ],
                alternatives;
            ["trash", "rmdir"],
                category;
            "file",
                safety_level;
            "dangerous",
                common_options;
            [
                { flag: "-r", description: "Remove recursively" },
                { flag: "-f", description: "Force removal" },
                { flag: "-i", description: "Interactive mode" }
            ],
                tool_type;
            "builtin";
        }
        // Aliases from command documentation
        {
            name: "...",
                description;
            "Navigate up two directories",
                syntax;
            "...",
                examples;
            ["... # Go to parent's parent directory"],
                alternatives;
            ["cd ../.."],
                category;
            "navigation",
                safety_level;
            "safe",
                common_options;
            [],
                is_alias;
            true,
                expands_to;
            "cd ../..",
                tool_type;
            "personal";
        }
        {
            name: "....",
                description;
            "Navigate up three directories",
                syntax;
            "....",
                examples;
            [".... # Go three directories up"],
                alternatives;
            ["cd ../../.."],
                category;
            "navigation",
                safety_level;
            "safe",
                common_options;
            [],
                is_alias;
            true,
                expands_to;
            "cd ../../..",
                tool_type;
            "personal";
        }
        {
            name: "ga",
                description;
            "Git add",
                syntax;
            "ga [file]...",
                examples;
            ["ga . # Add all files", "ga file.txt # Add specific file"],
                alternatives;
            ["git add"],
                category;
            "git",
                safety_level;
            "safe",
                common_options;
            [],
                is_alias;
            true,
                expands_to;
            "git add",
                tool_type;
            "personal";
        }
        {
            name: "gaa",
                description;
            "Git add all files",
                syntax;
            "gaa",
                examples;
            ["gaa # Stage all changes"],
                alternatives;
            ["git add .", "ga ."],
                category;
            "git",
                safety_level;
            "safe",
                common_options;
            [],
                is_alias;
            true,
                expands_to;
            "git add --all",
                tool_type;
            "personal";
        }
        {
            name: "gc",
                description;
            "Git commit with verbose option",
                syntax;
            "gc [options]",
                examples;
            ["gc # Commit with verbose output", "gc -m 'message' # Commit with message"],
                alternatives;
            ["git commit"],
                category;
            "git",
                safety_level;
            "safe",
                common_options;
            [],
                is_alias;
            true,
                expands_to;
            "git commit --verbose",
                tool_type;
            "personal";
        }
        {
            name: "gst",
                description;
            "Git status",
                syntax;
            "gst",
                examples;
            ["gst # Show git status"],
                alternatives;
            ["git status"],
                category;
            "git",
                safety_level;
            "safe",
                common_options;
            [],
                is_alias;
            true,
                expands_to;
            "git status",
                tool_type;
            "personal";
        }
        // Text Processing Tools
        {
            name: "jq",
                description;
            "Lightweight JSON processor",
                syntax;
            "jq [options] <jq filter> [file...]",
                examples;
            [
                "cat data.json | jq '.' # Pretty print JSON",
                "jq '.name' data.json # Extract name field",
                "jq '.[] | select(.age > 30)' # Filter by condition"
            ],
                alternatives;
            ["fx", "yq"],
                category;
            "text",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-r", description: "Raw output (no quotes)" },
                { flag: "-c", description: "Compact output" },
                { flag: "-n", description: "Don't read input" }
            ],
                installation;
            "brew install jq",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        {
            name: "yq",
                description;
            "YAML processor",
                syntax;
            "yq [options] <expression> [file...]",
                examples;
            [
                "yq '.name' config.yaml # Extract name field",
                "yq -i '.version = \"2.0\"' config.yaml # Update in place",
                "yq eval '.services | keys' docker-compose.yml"
            ],
                alternatives;
            ["jq", "fx"],
                category;
            "text",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-i", description: "Edit files in place" },
                { flag: "-o", description: "Output format" },
                { flag: "eval", description: "Evaluate expression" }
            ],
                installation;
            "brew install yq",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        // Network Tools
        {
            name: "curl",
                description;
            "Transfer data from/to servers",
                syntax;
            "curl [options] <url>",
                examples;
            [
                "curl https://api.example.com # GET request",
                "curl -X POST -d 'data' https://api.example.com # POST request",
                "curl -H 'Authorization: Bearer token' https://api.example.com"
            ],
                alternatives;
            ["wget", "httpie", "xh"],
                category;
            "network",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-X", description: "HTTP method" },
                { flag: "-H", description: "Add header" },
                { flag: "-d", description: "Send data" }
            ],
                tool_type;
            "builtin";
        }
        {
            name: "xh",
                description;
            "Friendly HTTP client",
                syntax;
            "xh [REQUEST_ITEM]... [METHOD] URL [REQUEST_ITEM]...",
                examples;
            [
                "xh GET https://api.example.com # GET request",
                "xh POST https://api.example.com name=John # POST with data",
                "xh https://api.example.com Authorization:Bearer-token"
            ],
                alternatives;
            ["curl", "httpie"],
                category;
            "network",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "--json", description: "JSON output" },
                { flag: "--headers", description: "Show headers" },
                { flag: "--body", description: "Show body only" }
            ],
                installation;
            "brew install xh",
                package_manager;
            "homebrew",
                tool_type;
            "homebrew";
        }
        // Programming Language Tools
        {
            name: "python3",
                description;
            "Python interpreter",
                syntax;
            "python3 [option] ... [-c cmd | -m mod | file | -] [arg] ...",
                examples;
            [
                "python3 script.py # Run Python script",
                "python3 -c 'print(\"Hello\")' # Execute Python code",
                "python3 -m http.server # Start HTTP server"
            ],
                alternatives;
            ["python", "pypy3"],
                category;
            "programming",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-c", description: "Execute command" },
                { flag: "-m", description: "Run module" },
                { flag: "-i", description: "Interactive mode" }
            ],
                tool_type;
            "builtin";
        }
        {
            name: "node",
                description;
            "JavaScript runtime",
                syntax;
            "node [options] [V8 options] [script.js | -e \"script\" | -] [--] [arguments]",
                examples;
            [
                "node app.js # Run JavaScript file",
                "node -e 'console.log(\"Hello\")' # Execute JavaScript code",
                "node --version # Show version"
            ],
                alternatives;
            ["deno", "bun"],
                category;
            "programming",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "-e", description: "Evaluate script" },
                { flag: "--version", description: "Show version" },
                { flag: "--inspect", description: "Enable inspector" }
            ],
                installation;
            "brew install node",
                package_manager;
            "homebrew",
                tool_type;
            "development";
        }
        {
            name: "deno",
                description;
            "Secure JavaScript/TypeScript runtime",
                syntax;
            "deno [OPTIONS] [SUBCOMMAND]",
                examples;
            [
                "deno run app.ts # Run TypeScript file",
                "deno run --allow-net server.js # Run with network permissions",
                "deno test # Run tests"
            ],
                alternatives;
            ["node", "bun"],
                category;
            "programming",
                safety_level;
            "safe",
                common_options;
            [
                { flag: "run", description: "Run a script" },
                { flag: "--allow-net", description: "Allow network access" },
                { flag: "test", description: "Run tests" }
            ],
                installation;
            "brew install deno",
                package_manager;
            "homebrew",
                tool_type;
            "development";
        }
        // Initialize command database
        commands.forEach(cmd => {
            this.commandDatabase.set(cmd.name.toLowerCase(), cmd);
            // Add aliases to alias database
            if (cmd.aliases) {
                cmd.aliases.forEach(alias => {
                    this.aliasDatabase.set(alias.toLowerCase(), cmd.name.toLowerCase());
                });
            }
            // Add alias expansion
            if (cmd.is_alias && cmd.expands_to) {
                this.aliasDatabase.set(cmd.name.toLowerCase(), cmd.expands_to);
            }
        });
        logger.info(`Initialized comprehensive command database with ${commands.length} commands (${COMMAND_COUNT} total) and ${this.aliasDatabase.size} aliases from complete terminal documentation`);
    }
}
async;
getCommandInfo(command, string, includeExamples, boolean = true, includeAlternatives, boolean = true);
Promise < CommandInfo | null > {
    let, targetCommand = command.toLowerCase(),
    : .aliasDatabase.has(targetCommand)
};
{
    const aliasTarget = this.aliasDatabase.get(targetCommand);
    // If alias points to another command, get that command
    if (this.commandDatabase.has(aliasTarget)) {
        targetCommand = aliasTarget;
    }
}
const cmd = this.commandDatabase.get(targetCommand);
if (!cmd) {
    logger.warn(`Command not found in database: ${command}`);
    return null;
}
const result = { ...cmd };
if (!includeExamples) {
    result.examples = [];
}
if (!includeAlternatives) {
    result.alternatives = [];
}
return result;
async;
searchCommands(query, string, category, string = "all", maxResults, number = 10);
Promise < CommandInfo[] > {
    const: results, CommandInfo, []:  = [],
    const: queryLower = query.toLowerCase(),
    : .commandDatabase
};
{
    if (results.length >= maxResults)
        break;
    const matchesCategory = category === "all" || cmd.category === category;
    const matchesQuery = name.includes(queryLower) ||
        cmd.description.toLowerCase().includes(queryLower) ||
        cmd.examples.some(ex => ex.toLowerCase().includes(queryLower)) ||
        (cmd.aliases && cmd.aliases.some(alias => alias.toLowerCase().includes(queryLower))) ||
        (cmd.tool_type && cmd.tool_type.toLowerCase().includes(queryLower));
    if (matchesCategory && matchesQuery) {
        results.push(cmd);
    }
}
// Sort by relevance (exact matches first, then partial matches)
results.sort((a, b) => {
    const aExact = a.name.toLowerCase() === queryLower;
    const bExact = b.name.toLowerCase() === queryLower;
    if (aExact && !bExact)
        return -1;
    if (!aExact && bExact)
        return 1;
    return 0;
});
logger.info(`Search query "${query}" returned ${results.length} results`);
return results;
async;
getAliasInfo(alias, string);
Promise < { alias: string, expands_to: string, command_info: CommandInfo } | null > {
    const: aliasLower = alias.toLowerCase(),
    : .aliasDatabase.has(aliasLower)
};
{
    return null;
}
const expansion = this.aliasDatabase.get(aliasLower);
let commandInfo;
// If expansion is a command name, get its info
if (this.commandDatabase.has(expansion)) {
    commandInfo = this.commandDatabase.get(expansion);
}
return {
    alias: alias,
    expands_to: expansion,
    command_info: commandInfo
};
async;
getCommandsByCategory(category, string);
Promise < CommandInfo[] > {
    const: commands, CommandInfo, []:  = [],
    : .commandDatabase
};
{
    if (cmd.category === category) {
        commands.push(cmd);
    }
}
return commands.sort((a, b) => a.name.localeCompare(b.name));
async;
getCommandsByType(toolType, string);
Promise < CommandInfo[] > {
    const: commands, CommandInfo, []:  = [],
    : .commandDatabase
};
{
    if (cmd.tool_type === toolType) {
        commands.push(cmd);
    }
}
return commands.sort((a, b) => a.name.localeCompare(b.name));
// Enhanced prompt enhancement system (5-tier: BASE→CORE→PRIME→ELITE→APEX)
async;
enhancePrompt(originalPrompt, string, enhancementLevel, string = "core", context, string = "", targetAudience, string = "intermediate");
Promise < EnhancementResult > {
    logger, : .info(`Enhancing prompt with level: ${enhancementLevel}`),
    const: improvements, string, []:  = [],
    let, enhancedPrompt = originalPrompt,
    const: structure, any = {},
    // Base level: Grammar and clarity
    if(enhancementLevel) { }
} === "base" || ["core", "prime", "elite", "apex"].includes(enhancementLevel);
{
    enhancedPrompt = this.improveGrammarAndClarity(enhancedPrompt);
    improvements.push("Improved grammar and clarity");
}
// Core level: XML structure
if (["core", "prime", "elite", "apex"].includes(enhancementLevel)) {
    const structuredResult = this.addXMLStructure(enhancedPrompt, context);
    enhancedPrompt = structuredResult.prompt;
    Object.assign(structure, structuredResult.structure);
    improvements.push("Added XML structure organization");
}
// Prime level: Methodology and success criteria
if (["prime", "elite", "apex"].includes(enhancementLevel)) {
    const methodologyResult = this.addMethodologyAndCriteria(enhancedPrompt, structure);
    enhancedPrompt = methodologyResult.prompt;
    Object.assign(structure, methodologyResult.structure);
    improvements.push("Added methodology and success criteria");
}
// Elite level: Few-shot examples
if (["elite", "apex"].includes(enhancementLevel)) {
    const exampleResult = this.addFewShotExamples(enhancedPrompt, structure, originalPrompt);
    enhancedPrompt = exampleResult.prompt;
    Object.assign(structure, exampleResult.structure);
    improvements.push("Added few-shot examples");
}
// Apex level: Dynamic placeholders
if (enhancementLevel === "apex") {
    const placeholderResult = this.addDynamicPlaceholders(enhancedPrompt, structure, originalPrompt);
    enhancedPrompt = placeholderResult.prompt;
    Object.assign(structure, placeholderResult.structure);
    improvements.push("Added contextual dynamic placeholders");
}
return {
    original_prompt: originalPrompt,
    enhanced_prompt: enhancedPrompt,
    enhancement_level: enhancementLevel,
    improvements,
    structure
};
improveGrammarAndClarity(prompt, string);
string;
{
    let improved = prompt
        .replace(/\bi\b/g, "I")
        .replace(/\s+/g, " ")
        .trim();
    if (!improved.endsWith(".") && !improved.endsWith("?") && !improved.endsWith("!")) {
        improved += ".";
    }
    return improved;
}
addXMLStructure(prompt, string, context, string);
{
    prompt: string;
    structure: any;
}
{
    const structure = {
        context: context || "Terminal command assistance and documentation",
        requirements: "Clear, specific, and actionable command information",
        output_format: "Structured response with examples and explanations"
    };
    const enhancedPrompt = `<context>
${structure.context}
</context>

<requirements>
${prompt}
${structure.requirements}
</requirements>

<output_format>
${structure.output_format}
</output_format>`;
    return { prompt: enhancedPrompt, structure };
}
addMethodologyAndCriteria(prompt, string, structure, any);
{
    prompt: string;
    structure: any;
}
{
    const methodology = "1. Understand command context\n2. Provide syntax and examples\n3. Suggest alternatives\n4. Include safety considerations";
    const successCriteria = "User receives comprehensive command information with practical examples";
    structure.methodology = methodology;
    structure.success_criteria = successCriteria;
    const enhancedPrompt = prompt + `

<methodology>
${methodology}
</methodology>

<success_criteria>
${successCriteria}
</success_criteria>`;
    return { prompt: enhancedPrompt, structure };
}
addFewShotExamples(prompt, string, structure, any, originalPrompt, string);
{
    prompt: string;
    structure: any;
}
{
    const examples = this.generateContextualExamples(originalPrompt);
    structure.examples = examples;
    const enhancedPrompt = prompt + `

<examples>
${examples}
</examples>`;
    return { prompt: enhancedPrompt, structure };
}
addDynamicPlaceholders(prompt, string, structure, any, originalPrompt, string);
{
    prompt: string;
    structure: any;
}
{
    const placeholders = this.generateContextualPlaceholders(originalPrompt);
    let enhancedPrompt = prompt;
    placeholders.forEach(placeholder => {
        enhancedPrompt = enhancedPrompt.replace(new RegExp(placeholder.target, 'gi'), `{{${placeholder.name}}}`);
    });
    structure.placeholders = placeholders;
    return { prompt: enhancedPrompt, structure };
}
generateContextualExamples(originalPrompt, string);
string;
{
    const prompt = originalPrompt.toLowerCase();
    if (prompt.includes("git") || prompt.includes("version control")) {
        return `Example 1:
Input: "How to stage files in git?"
Output: git add . (stage all) or git add file.txt (stage specific file)

Example 2:
Input: "Create a new branch"
Output: git checkout -b new-branch-name or git switch -c new-branch-name`;
    }
    if (prompt.includes("search") || prompt.includes("find")) {
        return `Example 1:
Input: "Find Python files"
Output: fd .py or find . -name "*.py"

Example 2:
Input: "Search for text in files"
Output: rg "pattern" or grep -r "pattern" .`;
    }
    if (prompt.includes("docker") || prompt.includes("container")) {
        return `Example 1:
Input: "List Docker containers"
Output: docker ps (running) or docker ps -a (all)

Example 2:
Input: "Run interactive container"
Output: docker run -it ubuntu bash`;
    }
    return `Example 1:
Input: Basic command inquiry
Output: Command syntax with practical examples

Example 2:
Input: Complex workflow request
Output: Step-by-step command sequence with explanations`;
}
generateContextualPlaceholders(originalPrompt, string);
{
    name: string;
    target: string;
    description: string;
}
[];
{
    const prompt = originalPrompt.toLowerCase();
    const placeholders = [];
    if (prompt.includes("file") || prompt.includes("directory")) {
        placeholders.push({ name: "file_path", target: "file", description: "Target file path" }, { name: "directory_path", target: "directory", description: "Target directory path" });
    }
    if (prompt.includes("git") || prompt.includes("repository")) {
        placeholders.push({ name: "branch_name", target: "branch", description: "Git branch name" }, { name: "commit_message", target: "message", description: "Commit message" });
    }
    if (prompt.includes("docker") || prompt.includes("container")) {
        placeholders.push({ name: "image_name", target: "image", description: "Docker image name" }, { name: "container_name", target: "container", description: "Container name" });
    }
    return placeholders;
}
// Existing methods preserved...
async;
validateCommand(command, string, safetyLevel, string = "moderate");
Promise < {
    is_valid: boolean,
    safety_rating: string,
    warnings: string[],
    suggestions: string[],
    explanation: string
} > {
    const: warnings, string, []:  = [],
    const: suggestions, string, []:  = [],
    let, isValid = true,
    let, safetyRating = "safe",
    // Check for dangerous patterns
    if(command) { }, : .includes("rm -rf") || command.includes("rm -f")
};
{
    warnings.push("Potentially destructive file deletion command");
    safetyRating = "dangerous";
    suggestions.push("Use 'rm -i' for interactive confirmation");
}
if (command.includes("sudo") && safetyLevel === "strict") {
    warnings.push("Elevated privileges command");
    safetyRating = "moderate";
    suggestions.push("Verify the command is necessary and safe");
}
if (command.includes("curl") && command.includes("| sh")) {
    warnings.push("Executing downloaded script without inspection");
    safetyRating = "dangerous";
    suggestions.push("Download and inspect script before execution");
}
const explanation = `Command analysis: ${warnings.length ? 'Found potential issues' : 'Appears safe'}`;
return {
    is_valid: isValid,
    safety_rating: safetyRating,
    warnings,
    suggestions,
    explanation
};
async;
explainOutput(command, string, output, string, context, string = "");
Promise < {
    explanation: string,
    is_error: boolean,
    solutions: string[],
    related_commands: string[]
} > {
    const: isError = output.toLowerCase().includes("error") ||
        output.toLowerCase().includes("failed") ||
        output.toLowerCase().includes("permission denied"),
    let, explanation = "",
    const: solutions, string, []:  = [],
    const: relatedCommands, string, []:  = [],
    if(isError) {
        if (output.includes("permission denied")) {
            explanation = "Permission denied error - insufficient privileges to access the resource";
            solutions.push("Try using 'sudo' for elevated privileges");
            solutions.push("Check file/directory permissions with 'ls -l'");
            relatedCommands.push("sudo", "chmod", "chown");
        }
        else if (output.includes("command not found")) {
            explanation = "Command not found - the specified command is not installed or not in PATH";
            solutions.push("Install the required package using brew, apt, or other package manager");
            solutions.push("Check if command is in PATH with 'which <command>'");
            relatedCommands.push("which", "whereis", "brew install");
        }
        else if (output.includes("no such file or directory")) {
            explanation = "File or directory does not exist at the specified path";
            solutions.push("Check if the path is correct");
            solutions.push("Use 'ls' or 'find' to locate the file");
            relatedCommands.push("ls", "find", "fd");
        }
        else {
            explanation = "An error occurred during command execution";
            solutions.push("Check command syntax and arguments");
            solutions.push("Refer to manual with 'man <command>' or 'command --help'");
            relatedCommands.push("man", "help");
        }
    }, else: {
        explanation = "Command executed successfully. Output shows the result of the operation.",
        solutions, : .push("Command completed normally")
    },
    return: {
        explanation,
        is_error: isError,
        solutions,
        related_commands: relatedCommands
    }
};
async;
createWorkflow(description, string, includeErrorHandling, boolean = true, outputFormat, string = "script");
Promise < {
    workflow: string,
    format: string,
    steps: string[],
    error_handling: string[]
} > {
    const: steps, string, []:  = [],
    const: errorHandling, string, []:  = [],
    // Generate workflow steps based on description
    if(description) { }, : .toLowerCase().includes("backup")
};
{
    steps.push("# Create backup directory with timestamp");
    steps.push("mkdir -p ~/backups/$(date +%Y%m%d_%H%M%S)");
    steps.push("# Copy files to backup location");
    steps.push("cp -r source_directory ~/backups/$(date +%Y%m%d_%H%M%S)/");
    steps.push("# Verify backup integrity");
    steps.push("ls -la ~/backups/$(date +%Y%m%d_%H%M%S)/");
    if (includeErrorHandling) {
        errorHandling.push("set -e # Exit on any error");
        errorHandling.push("trap 'echo \"Backup failed at step $LINENO\" >&2' ERR");
    }
}
if (description.toLowerCase().includes("deploy")) {
    steps.push("# Install dependencies");
    steps.push("npm install");
    steps.push("# Build application");
    steps.push("npm run build");
    steps.push("# Run tests");
    steps.push("npm test");
    steps.push("# Deploy to server");
    steps.push("rsync -avz dist/ server:/var/www/html/");
    if (includeErrorHandling) {
        errorHandling.push("set -e");
        errorHandling.push("npm test || { echo \"Tests failed\"; exit 1; }");
    }
}
else if (description.toLowerCase().includes("git")) {
    steps.push("# Check current status");
    steps.push("git status");
    steps.push("# Stage changes");
    steps.push("git add .");
    steps.push("# Commit changes");
    steps.push("git commit -m 'Automated commit'");
    steps.push("# Push to remote");
    steps.push("git push");
    if (includeErrorHandling) {
        errorHandling.push("set -e");
        errorHandling.push("git diff --quiet || echo \"Working directory has changes\"");
    }
}
else {
    steps.push("# Step 1: Preparation");
    steps.push("echo 'Starting workflow...'");
    steps.push("# Step 2: Main task");
    steps.push("echo 'Executing main task...'");
    steps.push("# Step 3: Cleanup");
    steps.push("echo 'Workflow completed successfully'");
}
let workflow = "";
if (outputFormat === "script") {
    workflow = "#!/bin/bash\n\n";
    if (includeErrorHandling) {
        workflow += errorHandling.join("\n") + "\n\n";
    }
    workflow += steps.join("\n");
}
else if (outputFormat === "makefile") {
    workflow = "workflow:\n\t" + steps.join("\n\t");
}
else if (outputFormat === "json") {
    workflow = JSON.stringify({ steps, error_handling: errorHandling }, null, 2);
}
else {
    workflow = steps.join("\n");
}
return {
    workflow,
    format: outputFormat,
    steps,
    error_handling: errorHandling
};
//# sourceMappingURL=terminal-docs-client-old.js.map