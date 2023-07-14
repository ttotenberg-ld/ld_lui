import { Tool } from "raylu";

export class HelloTool extends Tool {
    name = "hello_tool";
    description = "A tool to say hello to the designated person.";
    confirmation = false;
    inputs = [
        {
            name: "name",
            description: "Name of person to say hello to.",
            type: "string",
            required: true,
            examples: ["Bob", "Laura"]
        }
    ]

    async execute(input: any, context: any) : Promise<any> {
        return `Hello there, ${input.name}!`
    }
}