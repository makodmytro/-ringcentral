/// <reference types="node" />
import { EventEmitter } from 'events';
import Cache from './core/Cache';
import Externals, { ExternalsOptions } from './core/Externals';
import Client, { ApiError, CreateRequestOptions } from './http/Client';
import Platform, { CreateUrlOptions, LoginOptions, LoginUrlOptions, LoginWindowOptions, PlatformOptions, SendOptions } from './platform/Platform';
import { AuthData } from './platform/Auth';
export { Cache, Externals, LoginOptions, LoginUrlOptions, LoginWindowOptions, CreateUrlOptions, SendOptions, AuthData, ExternalsOptions, CreateRequestOptions, ApiError, };
export declare const setDefaultExternals: (externals: ExternalsOptions) => ExternalsOptions;
export declare class SDK {
    private _externals;
    private _cache;
    private _client;
    private _platform;
    static version: any;
    static EventEmitter: typeof EventEmitter;
    static server: {
        sandbox: string;
        production: string;
    };
    static handleLoginRedirect(origin: any, win: any): void;
    constructor(options?: SDKOptions);
    platform(): Platform;
    client(): Client;
    cache(): Cache;
    externals(): Externals;
    send: (options: SendOptions) => Promise<Response>;
    get: (url: any, query?: any, options?: SendOptions) => Promise<Response>;
    post: (url: any, body?: any, query?: any, options?: SendOptions) => Promise<Response>;
    put: (url: any, body?: any, query?: any, options?: SendOptions) => Promise<Response>;
    patch: (url: any, body?: any, query?: any, options?: SendOptions) => Promise<Response>;
    delete: (url: any, query?: any, options?: SendOptions) => Promise<Response>;
    login: (options: LoginOptions) => Promise<Response>;
    ensureLoggedIn: () => Promise<Response>;
    loginUrl: (options: LoginUrlOptions) => string;
    createUrl: (path: any, options: CreateUrlOptions) => string;
    signUrl: (path: any) => Promise<string>;
    parseLoginRedirect: (url: any) => any;
    logout: () => Promise<Response>;
    loginWindow: (options: LoginWindowOptions) => Promise<LoginOptions>;
    refresh: () => Promise<Response>;
    multipart: (response: Response) => Promise<Response[]>;
    getContentType: (response: Response) => string;
    isMultipart: (response: Response) => any;
    isJson: (response: Response) => any;
    error: (response: Response) => Promise<string>;
}
export interface SDKOptions extends PlatformOptions, ExternalsOptions {
    cachePrefix?: string;
    defaultRequestInit?: CreateRequestOptions;
    handleRateLimit?: boolean | number;
}
export default SDK;
