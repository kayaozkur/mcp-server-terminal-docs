/**
 * Enhanced Terminal Documentation Client
 * Comprehensive terminal command assistance with 162+ commands from real terminal docs
 */
export interface CommandInfo {
    name: string;
    description: string;
    syntax: string;
    examples: string[];
    alternatives: string[];
    category: string;
    safety_level: "safe" | "moderate" | "dangerous";
    common_options: {
        flag: string;
        description: string;
    }[];
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
export declare class TerminalDocsClient {
    private commandDatabase;
    private aliasDatabase;
    private lastUpdate;
    private terminalDocsPath;
    constructor();
    private initializeCommandDatabase;
    private startPeriodicRefresh;
    private checkForUpdates;
    private regenerateCommandDatabase;
    getCommandInfo(command: string, includeExamples?: boolean, includeAlternatives?: boolean): Promise<CommandInfo | null>;
    searchCommands(query: string, category?: string, maxResults?: number): Promise<CommandInfo[]>;
    getAliasInfo(alias: string): Promise<{
        alias: string;
        expands_to: string;
        command_info?: CommandInfo;
    } | null>;
    getCommandsByCategory(category: string): Promise<CommandInfo[]>;
    getCommandsByType(toolType: string): Promise<CommandInfo[]>;
    getStats(): {
        commandCount: number;
        aliasCount: number;
        categories: string[];
        toolTypes: string[];
        lastUpdate: Date;
        safetyLevels: Record<string, number>;
    };
    enhancePrompt(originalPrompt: string, enhancementLevel?: string, context?: string, targetAudience?: string): Promise<EnhancementResult>;
    private improveGrammarAndClarity;
    private addXMLStructure;
    private addMethodologyAndCriteria;
    private addFewShotExamples;
    private addDynamicPlaceholders;
    private generateContextualExamples;
    private generateContextualPlaceholders;
    validateCommand(command: string, safetyLevel?: string): Promise<{
        is_valid: boolean;
        safety_rating: string;
        warnings: string[];
        suggestions: string[];
        explanation: string;
    }>;
    explainOutput(command: string, output: string, context?: string): Promise<{
        explanation: string;
        is_error: boolean;
        solutions: string[];
        related_commands: string[];
    }>;
    createWorkflow(description: string, includeErrorHandling?: boolean, outputFormat?: string): Promise<{
        workflow: string;
        format: string;
        steps: string[];
        error_handling: string[];
    }>;
}
//# sourceMappingURL=terminal-docs-client.d.ts.map