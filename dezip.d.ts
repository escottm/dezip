export declare const ZIP5_PATTERN: RegExp;
export interface cityState {
    city: string;
    state: string;
    error?: string;
}
export declare function deZip(zip: string): Promise<cityState>;
