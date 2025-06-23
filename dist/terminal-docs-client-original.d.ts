/**
 * Terminal Documentation Client
 * Provides intelligent terminal command assistance and prompt enhancement
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
    constructor();
    private initializeCommandDatabase;
    getCommandInfo(command: string, includeExamples?: boolean, includeAlternatives?: boolean): Promise<CommandInfo | null>;
    searchCommands(query: string, category?: string, maxResults?: number): Promise<CommandInfo[]>;
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
//# sourceMappingURL=terminal-docs-client-original.d.ts.map