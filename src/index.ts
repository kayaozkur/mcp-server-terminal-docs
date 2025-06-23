#!/usr/bin/env node

/**
 * MCP Terminal Docs Server
 * Intelligent terminal documentation and prompt enhancement system
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { logger } from "./logger.js";
import { TerminalDocsClient } from "./terminal-docs-client.js";
import { toolHandlers } from "./tools.js";

const server = new Server(
  {
    name: "terminal-docs-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize Terminal Docs client
const terminalDocsClient = new TerminalDocsClient();

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "terminal_get_command_info",
        description: "Get comprehensive information about terminal commands including usage, examples, and alternatives",
        inputSchema: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: "Terminal command to get information about (e.g., 'ls', 'grep', 'docker')",
            },
            include_examples: {
              type: "boolean",
              description: "Include practical examples",
              default: true,
            },
            include_alternatives: {
              type: "boolean", 
              description: "Include alternative commands and tools",
              default: true,
            }
          },
          required: ["command"],
        },
      },
      {
        name: "terminal_enhance_prompt",
        description: "Enhance prompts using the 5-tier enhancement system (BASE→CORE→PRIME→ELITE→APEX)",
        inputSchema: {
          type: "object",
          properties: {
            original_prompt: {
              type: "string",
              description: "Original prompt to enhance",
            },
            enhancement_level: {
              type: "string",
              description: "Enhancement level",
              enum: ["base", "core", "prime", "elite", "apex"],
              default: "core",
            },
            context: {
              type: "string",
              description: "Additional context for enhancement",
            },
            target_audience: {
              type: "string",
              description: "Target audience for the prompt",
              enum: ["beginner", "intermediate", "advanced", "expert"],
              default: "intermediate",
            }
          },
          required: ["original_prompt"],
        },
      },
      {
        name: "terminal_search_commands",
        description: "Search for terminal commands by functionality, keywords, or use case",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query (e.g., 'file compression', 'network monitoring', 'text processing')",
            },
            category: {
              type: "string",
              description: "Command category filter",
              enum: ["file", "network", "process", "text", "system", "git", "docker", "all"],
              default: "all",
            },
            max_results: {
              type: "number",
              description: "Maximum number of results to return",
              default: 10,
            }
          },
          required: ["query"],
        },
      },
      {
        name: "terminal_explain_output",
        description: "Explain terminal command output, errors, and provide solutions",
        inputSchema: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: "Command that was executed",
            },
            output: {
              type: "string",
              description: "Terminal output or error message",
            },
            context: {
              type: "string",
              description: "Additional context about what you were trying to accomplish",
            }
          },
          required: ["command", "output"],
        },
      },
      {
        name: "terminal_validate_command",
        description: "Validate command syntax and safety before execution",
        inputSchema: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: "Command to validate",
            },
            safety_level: {
              type: "string",
              description: "Safety validation level",
              enum: ["basic", "moderate", "strict"],
              default: "moderate",
            },
            explain_risks: {
              type: "boolean",
              description: "Explain potential risks and side effects",
              default: true,
            }
          },
          required: ["command"],
        },
      },
      {
        name: "terminal_create_workflow",
        description: "Create multi-step terminal workflows with error handling",
        inputSchema: {
          type: "object",
          properties: {
            workflow_description: {
              type: "string",
              description: "Description of the workflow to create",
            },
            include_error_handling: {
              type: "boolean",
              description: "Include error handling and recovery steps",
              default: true,
            },
            output_format: {
              type: "string",
              description: "Output format for the workflow",
              enum: ["script", "makefile", "json", "markdown"],
              default: "script",
            }
          },
          required: ["workflow_description"],
        },
      },
      {
        name: "terminal_get_alias_info",
        description: "Get information about shell aliases and their expansions",
        inputSchema: {
          type: "object",
          properties: {
            alias: {
              type: "string",
              description: "Alias to look up (e.g., 'ga', 'gst', 'l', '...')",
            }
          },
          required: ["alias"],
        },
      },
      {
        name: "terminal_get_commands_by_category",
        description: "Get all commands in a specific category",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Command category",
              enum: ["file", "search", "git", "ai", "development", "system", "terminal", "container", "navigation", "text", "network", "programming"],
            }
          },
          required: ["category"],
        },
      },
      {
        name: "terminal_get_commands_by_type",
        description: "Get all commands by tool type (installation method)",
        inputSchema: {
          type: "object",
          properties: {
            tool_type: {
              type: "string",
              description: "Tool type/installation method",
              enum: ["builtin", "homebrew", "personal", "ai", "development"],
            }
          },
          required: ["tool_type"],
        },
      },
      {
        name: "terminal_get_database_stats",
        description: "Get comprehensive statistics about the terminal command database",
        inputSchema: {
          type: "object",
          properties: {},
        },
      }
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    logger.info(`Executing tool: ${name}`, { args });

    let result: any;
    switch (name) {
      case "terminal_get_command_info":
        result = await toolHandlers.getCommandInfo(terminalDocsClient, args);
        break;
      case "terminal_enhance_prompt":
        result = await toolHandlers.enhancePrompt(terminalDocsClient, args);
        break;
      case "terminal_search_commands":
        result = await toolHandlers.searchCommands(terminalDocsClient, args);
        break;
      case "terminal_explain_output":
        result = await toolHandlers.explainOutput(terminalDocsClient, args);
        break;
      case "terminal_validate_command":
        result = await toolHandlers.validateCommand(terminalDocsClient, args);
        break;
      case "terminal_create_workflow":
        result = await toolHandlers.createWorkflow(terminalDocsClient, args);
        break;
      case "terminal_get_alias_info":
        result = await toolHandlers.getAliasInfo(terminalDocsClient, args);
        break;
      case "terminal_get_commands_by_category":
        result = await toolHandlers.getCommandsByCategory(terminalDocsClient, args);
        break;
      case "terminal_get_commands_by_type":
        result = await toolHandlers.getCommandsByType(terminalDocsClient, args);
        break;
      case "terminal_get_database_stats":
        result = await toolHandlers.getDatabaseStats(terminalDocsClient, args);
        break;
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    logger.error(`Error executing tool ${name}:`, error);
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});

// Start server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info("Terminal Docs MCP Server started successfully");
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();