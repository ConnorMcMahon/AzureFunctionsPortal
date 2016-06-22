export interface FunctionConfig {
    disabled?: boolean;    // can be null for empty template
    bindings: FunctionBinding[];
}

export interface FunctionBinding {
    name: string;
    direction: string;
    type: string;
    route: string;
    queueName: string;
    methods: string[];
    schedule: string;
    runOnStartup: boolean;
    partitionKey: string;
    filter: string;
    tableName: string;
    rowKey: string;
    webHookType: string;
    authLevel: string;
}