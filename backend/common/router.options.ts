export interface RouterOptions {
    success?: boolean;
    message?: string;
    response?: any;
    queries?: number;
    
    // Errors //
    error?: boolean;
    requestError?: string;
    errorCode?: number;

    // Players //
    players?: number;
}