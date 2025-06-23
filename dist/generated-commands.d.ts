export declare const COMPREHENSIVE_COMMANDS: ({
    name: string;
    description: string;
    syntax: string;
    examples: string[];
    alternatives: string[];
    category: string;
    safety_level: string;
    common_options: {
        flag: string;
        description: string;
    }[];
    installation: string;
    package_manager: string;
    tool_type: string;
    is_alias?: undefined;
    expands_to?: undefined;
} | {
    name: string;
    description: string;
    syntax: string;
    examples: string[];
    alternatives: string[];
    category: string;
    safety_level: string;
    common_options: never[];
    is_alias: boolean;
    expands_to: string;
    installation: string;
    package_manager: string;
    tool_type: string;
})[];
export declare const COMMAND_COUNT = 352;
export declare const ALIAS_COUNT = 232;
export declare const BASE_COMMAND_COUNT = 120;
//# sourceMappingURL=generated-commands.d.ts.map