/**
 * Enhanced Terminal Documentation Client
 * Comprehensive terminal command assistance with 162+ commands from real terminal docs
 */

import { logger } from "./logger.js";
import { COMPREHENSIVE_COMMANDS, COMMAND_COUNT } from "./generated-commands.js";
import * as fs from 'fs';
import * as path from 'path';

export interface CommandInfo {
  name: string;
  description: string;
  syntax: string;
  examples: string[];
  alternatives: string[];
  category: string;
  safety_level: "safe" | "moderate" | "dangerous";
  common_options: { flag: string; description: string }[];
  aliases?: string[];
  installation?: string;
  package_manager?: string;
  is_alias?: boolean;
  expands_to?: string;
  tool_type?: "builtin" | "homebrew" | "personal" | "ai" | "development";
}

export interface EnhancementResult {
  original_prompt: string;
  enhanced_prompt: string;
  enhancement_level: string;
  improvements: string[];
  structure: {
    context?: string;
    requirements?: string;
    examples?: string;
    methodology?: string;
    output_format?: string;
    success_criteria?: string;
  };
}

export class TerminalDocsClient {
  private commandDatabase: Map<string, CommandInfo>;
  private aliasDatabase: Map<string, string>;
  private lastUpdate: Date;
  private terminalDocsPath: string;

  constructor() {
    this.commandDatabase = new Map();
    this.aliasDatabase = new Map();
    this.lastUpdate = new Date();
    this.terminalDocsPath = '/Users/kayaozkur/Desktop/lepion/terminal_docs';
    this.initializeCommandDatabase();
    
    // Set up periodic refresh
    this.startPeriodicRefresh();
  }

  private initializeCommandDatabase() {
    // Use comprehensive command database generated from all terminal documentation files
    const commands: CommandInfo[] = COMPREHENSIVE_COMMANDS as CommandInfo[];

    // Clear existing data
    this.commandDatabase.clear();
    this.aliasDatabase.clear();

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

    this.lastUpdate = new Date();
    logger.info(`Initialized comprehensive command database with ${commands.length} commands (${COMMAND_COUNT} total) and ${this.aliasDatabase.size} aliases from complete terminal documentation`);
  }

  private startPeriodicRefresh() {
    // Check for updates every 5 minutes
    setInterval(() => {
      this.checkForUpdates();
    }, 5 * 60 * 1000);
    
    logger.info('Started periodic refresh monitoring for terminal documentation updates');
  }

  private async checkForUpdates() {
    try {
      // Check if any documentation files have been modified
      const docFiles = [
        'comprehensive_command_documentation.md',
        'command_aliases_documentation.md',
        'complete_alias_command_dump.md',
        'complete_alias_command_dump_part2.md',
        'ultimate_terminal_reference.md',
        'tree_cli_documentation.md'
      ];

      let hasUpdates = false;
      for (const file of docFiles) {
        const filePath = path.join(this.terminalDocsPath, file);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          if (stats.mtime > this.lastUpdate) {
            hasUpdates = true;
            break;
          }
        }
      }

      if (hasUpdates) {
        logger.info('Terminal documentation files updated, regenerating command database...');
        await this.regenerateCommandDatabase();
      }
    } catch (error) {
      logger.error('Error checking for documentation updates:', error);
    }
  }

  private async regenerateCommandDatabase() {
    try {
      // Execute the parser script to regenerate commands
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      await execAsync('node scripts/parse-terminal-docs.cjs', { 
        cwd: '/Users/kayaozkur/Desktop/lepion/mcp-terminal-docs-server' 
      });
      
      // Reload the generated commands module
      delete require.cache[require.resolve('./generated-commands.js')];
      const { COMPREHENSIVE_COMMANDS: newCommands } = await import('./generated-commands.js');
      
      // Reinitialize with new data
      this.initializeCommandDatabase();
      
      logger.info('Successfully updated command database with latest documentation changes');
    } catch (error) {
      logger.error('Error regenerating command database:', error);
    }
  }

  async getCommandInfo(command: string, includeExamples: boolean = true, includeAlternatives: boolean = true): Promise<CommandInfo | null> {
    let targetCommand = command.toLowerCase();
    
    // Check if it's an alias first
    if (this.aliasDatabase.has(targetCommand)) {
      const aliasTarget = this.aliasDatabase.get(targetCommand);
      // If alias points to another command, get that command
      if (this.commandDatabase.has(aliasTarget!)) {
        targetCommand = aliasTarget!;
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
  }

  async searchCommands(query: string, category: string = "all", maxResults: number = 10): Promise<CommandInfo[]> {
    const results: CommandInfo[] = [];
    const queryLower = query.toLowerCase();

    for (const [name, cmd] of this.commandDatabase) {
      if (results.length >= maxResults) break;
      
      const matchesCategory = category === "all" || cmd.category === category;
      const matchesQuery = 
        name.includes(queryLower) ||
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
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });

    logger.info(`Search query "${query}" returned ${results.length} results`);
    return results;
  }

  async getAliasInfo(alias: string): Promise<{ alias: string; expands_to: string; command_info?: CommandInfo } | null> {
    const aliasLower = alias.toLowerCase();
    
    if (!this.aliasDatabase.has(aliasLower)) {
      return null;
    }
    
    const expansion = this.aliasDatabase.get(aliasLower)!;
    let commandInfo: CommandInfo | undefined;
    
    // If expansion is a command name, get its info
    if (this.commandDatabase.has(expansion)) {
      commandInfo = this.commandDatabase.get(expansion)!;
    }
    
    return {
      alias: alias,
      expands_to: expansion,
      command_info: commandInfo
    };
  }

  async getCommandsByCategory(category: string): Promise<CommandInfo[]> {
    const commands: CommandInfo[] = [];
    
    for (const [name, cmd] of this.commandDatabase) {
      if (cmd.category === category) {
        commands.push(cmd);
      }
    }
    
    return commands.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCommandsByType(toolType: string): Promise<CommandInfo[]> {
    const commands: CommandInfo[] = [];
    
    for (const [name, cmd] of this.commandDatabase) {
      if (cmd.tool_type === toolType) {
        commands.push(cmd);
      }
    }
    
    return commands.sort((a, b) => a.name.localeCompare(b.name));
  }

  getStats(): { 
    commandCount: number; 
    aliasCount: number; 
    categories: string[]; 
    toolTypes: string[]; 
    lastUpdate: Date;
    safetyLevels: Record<string, number>;
  } {
    const categories = [...new Set(Array.from(this.commandDatabase.values()).map(c => c.category))];
    const toolTypes = [...new Set(Array.from(this.commandDatabase.values()).map(c => c.tool_type).filter(t => t !== undefined))] as string[];
    const safetyLevels = Array.from(this.commandDatabase.values()).reduce((acc, cmd) => {
      acc[cmd.safety_level] = (acc[cmd.safety_level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      commandCount: this.commandDatabase.size,
      aliasCount: this.aliasDatabase.size,
      categories: categories.sort(),
      toolTypes: toolTypes.sort(),
      lastUpdate: this.lastUpdate,
      safetyLevels
    };
  }

  // Enhanced prompt enhancement system (5-tier: BASE→CORE→PRIME→ELITE→APEX)
  async enhancePrompt(
    originalPrompt: string,
    enhancementLevel: string = "core",
    context: string = "",
    targetAudience: string = "intermediate"
  ): Promise<EnhancementResult> {
    logger.info(`Enhancing prompt with level: ${enhancementLevel}`);

    const improvements: string[] = [];
    let enhancedPrompt = originalPrompt;
    const structure: any = {};

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

  private improveGrammarAndClarity(prompt: string): string {
    let improved = prompt
      .replace(/\bi\b/g, "I")
      .replace(/\s+/g, " ")
      .trim();
    
    if (!improved.endsWith(".") && !improved.endsWith("?") && !improved.endsWith("!")) {
      improved += ".";
    }

    return improved;
  }

  private addXMLStructure(prompt: string, context: string): { prompt: string; structure: any } {
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

  private addMethodologyAndCriteria(prompt: string, structure: any): { prompt: string; structure: any } {
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

  private addFewShotExamples(prompt: string, structure: any, originalPrompt: string): { prompt: string; structure: any } {
    const examples = this.generateContextualExamples(originalPrompt);
    structure.examples = examples;

    const enhancedPrompt = prompt + `

<examples>
${examples}
</examples>`;

    return { prompt: enhancedPrompt, structure };
  }

  private addDynamicPlaceholders(prompt: string, structure: any, originalPrompt: string): { prompt: string; structure: any } {
    const placeholders = this.generateContextualPlaceholders(originalPrompt);
    
    let enhancedPrompt = prompt;
    placeholders.forEach(placeholder => {
      enhancedPrompt = enhancedPrompt.replace(
        new RegExp(placeholder.target, 'gi'),
        `{{${placeholder.name}}}`
      );
    });

    structure.placeholders = placeholders;

    return { prompt: enhancedPrompt, structure };
  }

  private generateContextualExamples(originalPrompt: string): string {
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

  private generateContextualPlaceholders(originalPrompt: string): { name: string; target: string; description: string }[] {
    const prompt = originalPrompt.toLowerCase();
    const placeholders: { name: string; target: string; description: string }[] = [];

    if (prompt.includes("file") || prompt.includes("directory")) {
      placeholders.push(
        { name: "file_path", target: "file", description: "Target file path" },
        { name: "directory_path", target: "directory", description: "Target directory path" }
      );
    }

    if (prompt.includes("git") || prompt.includes("repository")) {
      placeholders.push(
        { name: "branch_name", target: "branch", description: "Git branch name" },
        { name: "commit_message", target: "message", description: "Commit message" }
      );
    }

    if (prompt.includes("docker") || prompt.includes("container")) {
      placeholders.push(
        { name: "image_name", target: "image", description: "Docker image name" },
        { name: "container_name", target: "container", description: "Container name" }
      );
    }

    return placeholders;
  }

  // Validation and explanation methods (keeping existing implementations)
  async validateCommand(command: string, safetyLevel: string = "moderate"): Promise<{
    is_valid: boolean;
    safety_rating: string;
    warnings: string[];
    suggestions: string[];
    explanation: string;
  }> {
    const warnings: string[] = [];
    const suggestions: string[] = [];
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

  async explainOutput(command: string, output: string, context: string = ""): Promise<{
    explanation: string;
    is_error: boolean;
    solutions: string[];
    related_commands: string[];
  }> {
    const isError = output.toLowerCase().includes("error") || 
                    output.toLowerCase().includes("failed") ||
                    output.toLowerCase().includes("permission denied");

    let explanation = "";
    const solutions: string[] = [];
    const relatedCommands: string[] = [];

    if (isError) {
      if (output.includes("permission denied")) {
        explanation = "Permission denied error - insufficient privileges to access the resource";
        solutions.push("Try using 'sudo' for elevated privileges");
        solutions.push("Check file/directory permissions with 'ls -l'");
        relatedCommands.push("sudo", "chmod", "chown");
      } else if (output.includes("command not found")) {
        explanation = "Command not found - the specified command is not installed or not in PATH";
        solutions.push("Install the required package using brew, apt, or other package manager");
        solutions.push("Check if command is in PATH with 'which <command>'");
        relatedCommands.push("which", "whereis", "brew install");
      } else if (output.includes("no such file or directory")) {
        explanation = "File or directory does not exist at the specified path";
        solutions.push("Check if the path is correct");
        solutions.push("Use 'ls' or 'find' to locate the file");
        relatedCommands.push("ls", "find", "fd");
      } else {
        explanation = "An error occurred during command execution";
        solutions.push("Check command syntax and arguments");
        solutions.push("Refer to manual with 'man <command>' or 'command --help'");
        relatedCommands.push("man", "help");
      }
    } else {
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

  async createWorkflow(
    description: string,
    includeErrorHandling: boolean = true,
    outputFormat: string = "script"
  ): Promise<{
    workflow: string;
    format: string;
    steps: string[];
    error_handling: string[];
  }> {
    const steps: string[] = [];
    const errorHandling: string[] = [];

    // Generate workflow steps based on description
    if (description.toLowerCase().includes("backup")) {
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
    } else if (description.toLowerCase().includes("deploy")) {
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
    } else if (description.toLowerCase().includes("git")) {
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
    } else {
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
    } else if (outputFormat === "makefile") {
      workflow = "workflow:\n\t" + steps.join("\n\t");
    } else if (outputFormat === "json") {
      workflow = JSON.stringify({ steps, error_handling: errorHandling }, null, 2);
    } else {
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