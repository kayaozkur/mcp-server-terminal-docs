/**
 * Tool handlers for Terminal Docs MCP Server
 */
import { logger } from "./logger.js";
export const toolHandlers = {
    async getAliasInfo(client, args) {
        let errors = [];
        if (!args.alias || typeof args.alias !== 'string') {
            errors.push({ field: 'alias', message: 'Alias is required and must be a string' });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.getAliasInfo(args.alias);
            if (!result) {
                return {
                    error: `Alias '${args.alias}' not found`,
                    suggestions: [
                        "Check alias spelling",
                        "Use terminal_search_commands to find similar commands",
                        "Some aliases may be shell-specific"
                    ]
                };
            }
            return {
                success: true,
                alias_info: result,
                source: "terminal_docs_database"
            };
        }
        catch (error) {
            logger.error('Error getting alias info:', error);
            return { error: `Failed to get alias info: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async getCommandsByCategory(client, args) {
        let errors = [];
        if (!args.category || typeof args.category !== 'string') {
            errors.push({ field: 'category', message: 'Category is required and must be a string' });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.getCommandsByCategory(args.category);
            return {
                success: true,
                category: args.category,
                commands: result,
                count: result.length,
                source: "terminal_docs_database"
            };
        }
        catch (error) {
            logger.error('Error getting commands by category:', error);
            return { error: `Failed to get commands by category: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async getCommandsByType(client, args) {
        let errors = [];
        if (!args.tool_type || typeof args.tool_type !== 'string') {
            errors.push({ field: 'tool_type', message: 'Tool type is required and must be a string' });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.getCommandsByType(args.tool_type);
            return {
                success: true,
                tool_type: args.tool_type,
                commands: result,
                count: result.length,
                source: "terminal_docs_database"
            };
        }
        catch (error) {
            logger.error('Error getting commands by type:', error);
            return { error: `Failed to get commands by type: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async getDatabaseStats(client, args) {
        try {
            const stats = client.getStats();
            return {
                success: true,
                stats: stats,
                message: `Database contains ${stats.commandCount} commands and ${stats.aliasCount} aliases across ${stats.categories.length} categories`,
                source: "enhanced_terminal_docs_database"
            };
        }
        catch (error) {
            logger.error('Error getting database stats:', error);
            return { error: `Failed to get database stats: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async getCommandInfo(client, args) {
        let errors = [];
        if (!args.command || typeof args.command !== 'string') {
            errors.push({ field: 'command', message: 'Command is required and must be a string' });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.getCommandInfo(args.command, args.include_examples ?? true, args.include_alternatives ?? true);
            if (!result) {
                return {
                    error: `Command '${args.command}' not found in documentation database`,
                    suggestions: [
                        "Check command spelling",
                        "Use terminal_search_commands to find similar commands",
                        "Try common alternatives like 'ls' instead of 'dir'"
                    ]
                };
            }
            return {
                success: true,
                command_info: result,
                database_size: "60+ commands with aliases and real-world data",
                source: "enhanced_terminal_docs_database"
            };
        }
        catch (error) {
            logger.error('Error getting command info:', error);
            return { error: `Failed to get command info: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async enhancePrompt(client, args) {
        let errors = [];
        if (!args.original_prompt || typeof args.original_prompt !== 'string') {
            errors.push({ field: 'original_prompt', message: 'Original prompt is required and must be a string' });
        }
        const validLevels = ['base', 'core', 'prime', 'elite', 'apex'];
        if (args.enhancement_level && !validLevels.includes(args.enhancement_level)) {
            errors.push({
                field: 'enhancement_level',
                message: `Enhancement level must be one of: ${validLevels.join(', ')}`
            });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.enhancePrompt(args.original_prompt, args.enhancement_level || 'core', args.context || '', args.target_audience || 'intermediate');
            return {
                success: true,
                enhancement_result: result,
                level_info: (() => {
                    const levelInfo = {
                        base: "Grammar correction and content expansion",
                        core: "BASE + XML structure organization",
                        prime: "CORE + methodology and success criteria",
                        elite: "PRIME + few-shot examples",
                        apex: "ELITE + dynamic placeholders and templates"
                    };
                    return levelInfo[args.enhancement_level || 'core'];
                })()
            };
        }
        catch (error) {
            logger.error('Error enhancing prompt:', error);
            return { error: `Failed to enhance prompt: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async searchCommands(client, args) {
        let errors = [];
        if (!args.query || typeof args.query !== 'string') {
            errors.push({ field: 'query', message: 'Query is required and must be a string' });
        }
        const validCategories = ['file', 'network', 'process', 'text', 'system', 'git', 'docker', 'all'];
        if (args.category && !validCategories.includes(args.category)) {
            errors.push({
                field: 'category',
                message: `Category must be one of: ${validCategories.join(', ')}`
            });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const results = await client.searchCommands(args.query, args.category || 'all', args.max_results || 10);
            return {
                success: true,
                query: args.query,
                category: args.category || 'all',
                results_count: results.length,
                commands: results,
                search_tips: [
                    "Use specific keywords like 'compress', 'monitor', 'parse'",
                    "Try different categories to narrow results",
                    "Use partial command names like 'grep' or 'find'"
                ]
            };
        }
        catch (error) {
            logger.error('Error searching commands:', error);
            return { error: `Failed to search commands: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async explainOutput(client, args) {
        let errors = [];
        if (!args.command || typeof args.command !== 'string') {
            errors.push({ field: 'command', message: 'Command is required and must be a string' });
        }
        if (!args.output || typeof args.output !== 'string') {
            errors.push({ field: 'output', message: 'Output is required and must be a string' });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.explainOutput(args.command, args.output, args.context || '');
            return {
                success: true,
                command: args.command,
                analysis: result,
                troubleshooting_tips: result.is_error ? [
                    "Check command syntax and spelling",
                    "Verify file paths and permissions",
                    "Review error message for specific details",
                    "Use 'man <command>' for detailed documentation"
                ] : [
                    "Command executed successfully",
                    "Output indicates normal operation"
                ]
            };
        }
        catch (error) {
            logger.error('Error explaining output:', error);
            return { error: `Failed to explain output: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async validateCommand(client, args) {
        let errors = [];
        if (!args.command || typeof args.command !== 'string') {
            errors.push({ field: 'command', message: 'Command is required and must be a string' });
        }
        const validSafetyLevels = ['basic', 'moderate', 'strict'];
        if (args.safety_level && !validSafetyLevels.includes(args.safety_level)) {
            errors.push({
                field: 'safety_level',
                message: `Safety level must be one of: ${validSafetyLevels.join(', ')}`
            });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.validateCommand(args.command, args.safety_level || 'moderate');
            return {
                success: true,
                command: args.command,
                validation: result,
                safety_info: (() => {
                    const safetyInfo = {
                        safe: "Command appears safe to execute",
                        moderate: "Command may require caution",
                        dangerous: "Command potentially destructive - review carefully"
                    };
                    return safetyInfo[result.safety_rating];
                })(),
                next_steps: result.is_valid ? [
                    "Command syntax appears valid",
                    "Review any warnings before execution",
                    "Consider testing in safe environment first"
                ] : [
                    "Fix validation errors before execution",
                    "Check command syntax and arguments",
                    "Refer to command documentation"
                ]
            };
        }
        catch (error) {
            logger.error('Error validating command:', error);
            return { error: `Failed to validate command: ${error instanceof Error ? error.message : String(error)}` };
        }
    },
    async createWorkflow(client, args) {
        let errors = [];
        if (!args.workflow_description || typeof args.workflow_description !== 'string') {
            errors.push({ field: 'workflow_description', message: 'Workflow description is required and must be a string' });
        }
        const validFormats = ['script', 'makefile', 'json', 'markdown'];
        if (args.output_format && !validFormats.includes(args.output_format)) {
            errors.push({
                field: 'output_format',
                message: `Output format must be one of: ${validFormats.join(', ')}`
            });
        }
        if (errors.length > 0) {
            return { error: 'Validation failed', errors };
        }
        try {
            const result = await client.createWorkflow(args.workflow_description, args.include_error_handling ?? true, args.output_format || 'script');
            return {
                success: true,
                description: args.workflow_description,
                workflow_result: result,
                usage_instructions: (() => {
                    const instructions = {
                        script: "Save as .sh file and run with: chmod +x script.sh && ./script.sh",
                        makefile: "Save as Makefile and run with: make workflow",
                        json: "Use with automation tools or as configuration",
                        markdown: "Documentation format for sharing and reference"
                    };
                    return instructions[result.format];
                })(),
                customization_tips: [
                    "Modify paths and parameters for your environment",
                    "Add additional error checking as needed",
                    "Test workflow in safe environment first",
                    "Consider adding logging and monitoring"
                ]
            };
        }
        catch (error) {
            logger.error('Error creating workflow:', error);
            return { error: `Failed to create workflow: ${error instanceof Error ? error.message : String(error)}` };
        }
    }
};
//# sourceMappingURL=tools.js.map