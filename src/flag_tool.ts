import { Tool } from "raylu";

const axios = require('axios').default;

export class CreateBooleanFlag extends Tool {
    name = "create_boolean_flag";
    description = "A tool to create a boolean feature flag in LaunchDarkly";
    confirmation = false;
    inputs = [
        {
            name: "flag_name",
            description: "Name of the flag, should be short.",
            type: "string",
            required: true,
            examples: ["Release: New Widget", "Config: Rate Limit", "Migrate: Payment API"]
        },
        {
            name: "flag_key",
            description: "The flag's key. Can only contain letters, numbers, periods, hyphens, and underscores. Should be a kebab-case representation of the flag name.",
            type: "string",
            required: true,
            examples: ["release-new-widget", "config-rate-limit", "migrate-payment-api"]
        }
    ]

    async execute(input: any, context: any) : Promise<any> {
        // Get the LaunchDarkly project key and API key
        const ld_project_key = process.env.LD_PROJ_KEY;
        const ld_api_key = process.env.LD_API_KEY;

        // Name of the flag to create
        const flag_name: string = input.flag_name;

        // Key of the flag to create
        const flag_key: string = input.flag_key;

        // Body of the request
        let request_data = JSON.stringify({
            "name": flag_name,
            "key": flag_key
        });

        // Configuration of the API call
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://app.launchdarkly.com/api/v2/flags/${ld_project_key}`,
            headers: { 
                'Authorization': `${ld_api_key}`, 
                'Content-Type': 'application/json'
              },
            data : request_data
        };

        try {
            let response = await axios.request(config);
            return response.data;
        } catch(error) {
            if (error.response) {
                return error.response.data;
            } else {
                return error.message;
            };
        };
    };
};