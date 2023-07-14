import { Tool } from "raylu";

const axios = require('axios').default;

export class UpdateBooleanPercentageRollout extends Tool {
    name = "update_boolean_percentage_rollout";
    description = "A tool to update the percentage rollout on the default rule on a boolean flag in LaunchDarkly.";
    confirmation = false;
    inputs = [
        {
            name: "true_percentage",
            description: "Percent that should be served 'true'. User may input it as the word 'percent,' or as the % sign.",
            type: "number",
            required: true,
            examples: ["10", "25", "50", "99", "67"]
        },
        {
            name: "flag_key",
            description: "The flag's key. Must be explicitly entered by the user. Should be in kebab-case.",
            type: "string",
            required: true,
            examples: ["release-new-widget", "config-rate-limit", "migrate-payment-api"]
        },
        {
            name: "environment_key",
            description: "The environment key. Should be specified by the user.",
            type: "string",
            required: true,
            examples: ["production", "dev", "staging"]
        }
    ]

    async execute(input: any, context: any) : Promise<any> {
        // Get the LaunchDarkly project key and API key
        const ld_project_key = process.env.LD_PROJ_KEY;
        const ld_api_key = process.env.LD_API_KEY;

        // Key of the flag to create. I should be using 'demo-lui-flag'
        const flag_key: string = input.flag_key;

        // Percentage that should be served true
        const true_weight: number = input.true_percentage * 1000;
        const false_weight: number = (100 - input.true_percentage) * 1000;

        // Body of the request
        let request_data = JSON.stringify({
            "environmentKey": input.environment_key,
            "instructions": [{
                "kind": "updateFallthroughVariationOrRollout",
                "rolloutContextKind": "user",
                "rolloutWeights": {
                    "f1e1ab5f-011b-4c88-a1be-0c943ba649b1": true_weight,
                    "7ff9a4f0-e618-4ef5-b0c3-488f283cb8ca": false_weight 
                }
            }]
        });

        // Configuration of the API call
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `https://app.launchdarkly.com/api/v2/flags/${ld_project_key}/${flag_key}`,
            headers: { 
                'Authorization': `${ld_api_key}`, 
                'Content-Type': 'application/json; domain-model=launchdarkly.semanticpatch'
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