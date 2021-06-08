export interface RouterOptions {
    success?: boolean;
    message?: string;
    response?: any;
    queries?: number;
    cache?: boolean;
    
    // Errors //
    error?: boolean;
    errorCode?: number;

    // Players //
    players?: number;
}