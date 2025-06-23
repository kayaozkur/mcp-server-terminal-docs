/**
 * Enhanced Terminal Documentation Client
 * Comprehensive terminal command assistance with 400+ commands from real terminal docs
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
    constructor();
    private initializeCommandDatabase;
}
//# sourceMappingURL=terminal-docs-client-old.d.ts.map