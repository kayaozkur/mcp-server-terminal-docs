/**
 * Terminal Documentation Client
 * Provides intelligent terminal command assistance and prompt enhancement
 */
import { logger } from "./logger.js";
export class TerminalDocsClient {
    commandDatabase;
    constructor() {
        this.commandDatabase = new Map();
        this.initializeCommandDatabase();
    }
    initializeCommandDatabase() {
        // Initialize with common commands - would be expanded from actual terminal docs
        const commands = [
            {
                name: "ls",
                description: "List directory contents",
                syntax: "ls [OPTION]... [FILE]...",
                examples: [
                    "ls -la # List all files with details",
                    "ls -lh # List with human-readable sizes",
                    "ls *.txt # List only .txt files"
                ],
                alternatives: ["dir", "tree", "exa", "lsd"],
                category: "file",
                safety_level: "safe",
                common_options: [
                    { flag: "-l", description: "Use long listing format" },
                    { flag: "-a", description: "Show hidden files" },
                    { flag: "-h", description: "Human-readable sizes" }
                ]
            },
            {
                name: "grep",
                description: "Search text patterns in files",
                syntax: "grep [OPTION]... PATTERN [FILE]...",
                examples: [
                    "grep 'pattern' file.txt # Search for pattern in file",
                    "grep -r 'pattern' . # Recursive search in directory",
                    "grep -i 'pattern' file.txt # Case-insensitive search"
                ],
                alternatives: ["rg", "ag", "ack", "ripgrep"],
                category: "text",
                safety_level: "safe",
                common_options: [
                    { flag: "-r", description: "Recursive search" },
                    { flag: "-i", description: "Case-insensitive" },
                    { flag: "-n", description: "Show line numbers" }
                ]
            },
            {
                name: "rm",
                description: "Remove files and directories",
                syntax: "rm [OPTION]... FILE...",
                examples: [
                    "rm file.txt # Remove single file",
                    "rm -r directory/ # Remove directory recursively",
                    "rm -i *.tmp # Interactive removal with confirmation"
                ],
                alternatives: ["trash", "rmdir"],
                category: "file",
                safety_level: "dangerous",
                common_options: [
                    { flag: "-r", description: "Remove recursively" },
                    { flag: "-f", description: "Force removal" },
                    { flag: "-i", description: "Interactive mode" }
                ]
            },
            {
                name: "docker",
                description: "Container management platform",
                syntax: "docker [OPTIONS] COMMAND [ARG...]",
                examples: [
                    "docker run hello-world # Run a test container",
                    "docker ps # List running containers",
                    "docker build -t myapp . # Build image from Dockerfile"
                ],
                alternatives: ["podman", "containerd"],
                category: "system",
                safety_level: "moderate",
                common_options: [
                    { flag: "run", description: "Run a container" },
                    { flag: "ps", description: "List containers" },
                    { flag: "build", description: "Build image" }
                ]
            }
        ];
        commands.forEach(cmd => {
            this.commandDatabase.set(cmd.name, cmd);
        });
        logger.info(`Initialized command database with ${commands.length} commands`);
    }
    async getCommandInfo(command, includeExamples = true, includeAlternatives = true) {
        const cmd = this.commandDatabase.get(command.toLowerCase());
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
    }
    async searchCommands(query, category = "all", maxResults = 10) {
        const results = [];
        const queryLower = query.toLowerCase();
        for (const [name, cmd] of this.commandDatabase) {
            if (results.length >= maxResults)
                break;
            const matchesCategory = category === "all" || cmd.category === category;
            const matchesQuery = name.includes(queryLower) ||
                cmd.description.toLowerCase().includes(queryLower) ||
                cmd.examples.some(ex => ex.toLowerCase().includes(queryLower));
            if (matchesCategory && matchesQuery) {
                results.push(cmd);
            }
        }
        logger.info(`Search query "${query}" returned ${results.length} results`);
        return results;
    }
    async enhancePrompt(originalPrompt, enhancementLevel = "core", context = "", targetAudience = "intermediate") {
        logger.info(`Enhancing prompt with level: ${enhancementLevel}`);
        const improvements = [];
        let enhancedPrompt = originalPrompt;
        const structure = {};
        // Base level: Grammar and clarity
        if (enhancementLevel === "base" || ["core", "prime", "elite", "apex"].includes(enhancementLevel)) {
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
    }
    improveGrammarAndClarity(prompt) {
        // Basic grammar improvements
        let improved = prompt
            .replace(/\bi\b/g, "I")
            .replace(/\s+/g, " ")
            .trim();
        if (!improved.endsWith(".") && !improved.endsWith("?") && !improved.endsWith("!")) {
            improved += ".";
        }
        return improved;
    }
    addXMLStructure(prompt, context) {
        const structure = {
            context: context || "Task execution and completion",
            requirements: "Clear, specific, and actionable requirements",
            output_format: "Structured response with clear formatting"
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
    addMethodologyAndCriteria(prompt, structure) {
        const methodology = "1. Analyze requirements\n2. Plan approach\n3. Execute step-by-step\n4. Validate results";
        const successCriteria = "Task completed successfully with clear, actionable output";
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
    addFewShotExamples(prompt, structure, originalPrompt) {
        // Generate contextual examples based on the original prompt
        const examples = this.generateContextualExamples(originalPrompt);
        structure.examples = examples;
        const enhancedPrompt = prompt + `

<examples>
${examples}
</examples>`;
        return { prompt: enhancedPrompt, structure };
    }
    addDynamicPlaceholders(prompt, structure, originalPrompt) {
        const placeholders = this.generateContextualPlaceholders(originalPrompt);
        // Insert placeholders into the enhanced prompt
        let enhancedPrompt = prompt;
        placeholders.forEach(placeholder => {
            enhancedPrompt = enhancedPrompt.replace(new RegExp(placeholder.target, 'gi'), `{{${placeholder.name}}}`);
        });
        structure.placeholders = placeholders;
        return { prompt: enhancedPrompt, structure };
    }
    generateContextualExamples(originalPrompt) {
        const prompt = originalPrompt.toLowerCase();
        if (prompt.includes("file") || prompt.includes("directory")) {
            return `Example 1:
Input: "Create a backup script"
Output: A complete bash script with error handling and logging

Example 2:
Input: "Organize project files"
Output: Directory structure with clear categorization`;
        }
        if (prompt.includes("code") || prompt.includes("script")) {
            return `Example 1:
Input: "Write a function to validate email"
Output: Complete function with validation logic and tests

Example 2:
Input: "Debug this error message"
Output: Root cause analysis and solution steps`;
        }
        return `Example 1:
Input: Basic request
Output: Comprehensive solution

Example 2:
Input: Complex scenario
Output: Detailed step-by-step approach`;
    }
    generateContextualPlaceholders(originalPrompt) {
        const prompt = originalPrompt.toLowerCase();
        const placeholders = [];
        if (prompt.includes("file") || prompt.includes("directory")) {
            placeholders.push({ name: "file_path", target: "file", description: "Target file path" }, { name: "backup_location", target: "backup", description: "Backup directory location" });
        }
        if (prompt.includes("api") || prompt.includes("endpoint")) {
            placeholders.push({ name: "api_endpoint", target: "endpoint", description: "API endpoint URL" }, { name: "auth_method", target: "authentication", description: "Authentication method" });
        }
        if (prompt.includes("database") || prompt.includes("data")) {
            placeholders.push({ name: "db_connection", target: "database", description: "Database connection string" }, { name: "table_name", target: "table", description: "Target table name" });
        }
        return placeholders;
    }
    async validateCommand(command, safetyLevel = "moderate") {
        const warnings = [];
        const suggestions = [];
        let isValid = true;
        let safetyRating = "safe";
        // Check for dangerous patterns
        if (command.includes("rm -rf") || command.includes("rm -f")) {
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
    }
    async explainOutput(command, output, context = "") {
        const isError = output.toLowerCase().includes("error") ||
            output.toLowerCase().includes("failed") ||
            output.toLowerCase().includes("permission denied");
        let explanation = "";
        const solutions = [];
        const relatedCommands = [];
        if (isError) {
            if (output.includes("permission denied")) {
                explanation = "Permission denied error - insufficient privileges to access the resource";
                solutions.push("Try using 'sudo' for elevated privileges");
                solutions.push("Check file/directory permissions with 'ls -l'");
                relatedCommands.push("sudo", "chmod", "chown");
            }
            else if (output.includes("command not found")) {
                explanation = "Command not found - the specified command is not installed or not in PATH";
                solutions.push("Install the required package");
                solutions.push("Check if command is in PATH with 'which <command>'");
                relatedCommands.push("which", "whereis", "apt install", "brew install");
            }
            else if (output.includes("no such file or directory")) {
                explanation = "File or directory does not exist at the specified path";
                solutions.push("Check if the path is correct");
                solutions.push("Use 'ls' to list available files/directories");
                relatedCommands.push("ls", "find", "locate");
            }
            else {
                explanation = "An error occurred during command execution";
                solutions.push("Check command syntax and arguments");
                solutions.push("Refer to manual with 'man <command>'");
                relatedCommands.push("man", "help");
            }
        }
        else {
            explanation = "Command executed successfully. Output shows the result of the operation.";
            solutions.push("Command completed normally");
        }
        return {
            explanation,
            is_error: isError,
            solutions,
            related_commands: relatedCommands
        };
    }
    async createWorkflow(description, includeErrorHandling = true, outputFormat = "script") {
        const steps = [];
        const errorHandling = [];
        // Generate workflow steps based on description
        if (description.toLowerCase().includes("backup")) {
            steps.push("# Create backup directory");
            steps.push("mkdir -p ~/backups/$(date +%Y%m%d)");
            steps.push("# Copy files to backup");
            steps.push("cp -r source_directory ~/backups/$(date +%Y%m%d)/");
            steps.push("# Verify backup integrity");
            steps.push("ls -la ~/backups/$(date +%Y%m%d)/");
            if (includeErrorHandling) {
                errorHandling.push("set -e # Exit on any error");
                errorHandling.push("trap 'echo \"Backup failed!\" >&2' ERR");
            }
        }
        else if (description.toLowerCase().includes("deploy")) {
            steps.push("# Build application");
            steps.push("npm run build");
            steps.push("# Run tests");
            steps.push("npm test");
            steps.push("# Deploy to server");
            steps.push("rsync -avz dist/ server:/var/www/html/");
            if (includeErrorHandling) {
                errorHandling.push("set -e");
                errorHandling.push("npm test || exit 1");
            }
        }
        else {
            steps.push("# Step 1: Preparation");
            steps.push("echo 'Starting workflow...'");
            steps.push("# Step 2: Main task");
            steps.push("echo 'Executing main task...'");
            steps.push("# Step 3: Cleanup");
            steps.push("echo 'Workflow completed'");
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
    }
}
//# sourceMappingURL=terminal-docs-client-original.js.map