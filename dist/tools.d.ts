/**
 * Tool handlers for Terminal Docs MCP Server
 */
import { TerminalDocsClient } from "./terminal-docs-client.js";
interface ValidationError {
    field: string;
    message: string;
}
export declare const toolHandlers: {
    getAliasInfo(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        suggestions?: undefined;
        success?: undefined;
        alias_info?: undefined;
        source?: undefined;
    } | {
        error: string;
        suggestions: string[];
        errors?: undefined;
        success?: undefined;
        alias_info?: undefined;
        source?: undefined;
    } | {
        success: boolean;
        alias_info: {
            alias: string;
            expands_to: string;
            command_info?: import("./terminal-docs-client.js").CommandInfo;
        };
        source: string;
        error?: undefined;
        errors?: undefined;
        suggestions?: undefined;
    } | {
        error: string;
        errors?: undefined;
        suggestions?: undefined;
        success?: undefined;
        alias_info?: undefined;
        source?: undefined;
    }>;
    getCommandsByCategory(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        category?: undefined;
        commands?: undefined;
        count?: undefined;
        source?: undefined;
    } | {
        success: boolean;
        category: any;
        commands: import("./terminal-docs-client.js").CommandInfo[];
        count: number;
        source: string;
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        category?: undefined;
        commands?: undefined;
        count?: undefined;
        source?: undefined;
    }>;
    getCommandsByType(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        tool_type?: undefined;
        commands?: undefined;
        count?: undefined;
        source?: undefined;
    } | {
        success: boolean;
        tool_type: any;
        commands: import("./terminal-docs-client.js").CommandInfo[];
        count: number;
        source: string;
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        tool_type?: undefined;
        commands?: undefined;
        count?: undefined;
        source?: undefined;
    }>;
    getDatabaseStats(client: TerminalDocsClient, args: any): Promise<{
        success: boolean;
        stats: {
            commandCount: number;
            aliasCount: number;
            categories: string[];
            toolTypes: string[];
            lastUpdate: Date;
            safetyLevels: Record<string, number>;
        };
        message: string;
        source: string;
        error?: undefined;
    } | {
        error: string;
        success?: undefined;
        stats?: undefined;
        message?: undefined;
        source?: undefined;
    }>;
    getCommandInfo(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        suggestions?: undefined;
        success?: undefined;
        command_info?: undefined;
        database_size?: undefined;
        source?: undefined;
    } | {
        error: string;
        suggestions: string[];
        errors?: undefined;
        success?: undefined;
        command_info?: undefined;
        database_size?: undefined;
        source?: undefined;
    } | {
        success: boolean;
        command_info: import("./terminal-docs-client.js").CommandInfo;
        database_size: string;
        source: string;
        error?: undefined;
        errors?: undefined;
        suggestions?: undefined;
    } | {
        error: string;
        errors?: undefined;
        suggestions?: undefined;
        success?: undefined;
        command_info?: undefined;
        database_size?: undefined;
        source?: undefined;
    }>;
    enhancePrompt(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        enhancement_result?: undefined;
        level_info?: undefined;
    } | {
        success: boolean;
        enhancement_result: import("./terminal-docs-client.js").EnhancementResult;
        level_info: string;
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        enhancement_result?: undefined;
        level_info?: undefined;
    }>;
    searchCommands(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        query?: undefined;
        category?: undefined;
        results_count?: undefined;
        commands?: undefined;
        search_tips?: undefined;
    } | {
        success: boolean;
        query: any;
        category: any;
        results_count: number;
        commands: import("./terminal-docs-client.js").CommandInfo[];
        search_tips: string[];
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        query?: undefined;
        category?: undefined;
        results_count?: undefined;
        commands?: undefined;
        search_tips?: undefined;
    }>;
    explainOutput(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        command?: undefined;
        analysis?: undefined;
        troubleshooting_tips?: undefined;
    } | {
        success: boolean;
        command: any;
        analysis: {
            explanation: string;
            is_error: boolean;
            solutions: string[];
            related_commands: string[];
        };
        troubleshooting_tips: string[];
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        command?: undefined;
        analysis?: undefined;
        troubleshooting_tips?: undefined;
    }>;
    validateCommand(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        command?: undefined;
        validation?: undefined;
        safety_info?: undefined;
        next_steps?: undefined;
    } | {
        success: boolean;
        command: any;
        validation: {
            is_valid: boolean;
            safety_rating: string;
            warnings: string[];
            suggestions: string[];
            explanation: string;
        };
        safety_info: string;
        next_steps: string[];
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        command?: undefined;
        validation?: undefined;
        safety_info?: undefined;
        next_steps?: undefined;
    }>;
    createWorkflow(client: TerminalDocsClient, args: any): Promise<{
        error: string;
        errors: ValidationError[];
        success?: undefined;
        description?: undefined;
        workflow_result?: undefined;
        usage_instructions?: undefined;
        customization_tips?: undefined;
    } | {
        success: boolean;
        description: any;
        workflow_result: {
            workflow: string;
            format: string;
            steps: string[];
            error_handling: string[];
        };
        usage_instructions: string;
        customization_tips: string[];
        error?: undefined;
        errors?: undefined;
    } | {
        error: string;
        errors?: undefined;
        success?: undefined;
        description?: undefined;
        workflow_result?: undefined;
        usage_instructions?: undefined;
        customization_tips?: undefined;
    }>;
};
export {};
//# sourceMappingURL=tools.d.ts.map