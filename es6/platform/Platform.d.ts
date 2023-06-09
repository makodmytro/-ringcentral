/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import * as qs from 'querystring';
import Auth, { AuthOptions } from './Auth';
import Discovery from './Discovery';
import Cache from '../core/Cache';
import Client, { ApiError } from '../http/Client';
import Externals from '../core/Externals';
export declare enum events {
    beforeLogin = "beforeLogin",
    loginSuccess = "loginSuccess",
    loginError = "loginError",
    beforeRefresh = "beforeRefresh",
    refreshSuccess = "refreshSuccess",
    refreshError = "refreshError",
    beforeLogout = "beforeLogout",
    logoutSuccess = "logoutSuccess",
    logoutError = "logoutError",
    rateLimitError = "rateLimitError"
}
export default class Platform extends EventEmitter {
    static _cacheId: string;
    static _discoveryCacheId: string;
    events: typeof events;
    private _server;
    private _rcvServer;
    private _clientId;
    private _clientSecret;
    private _redirectUri;
    private _brandId;
    private _refreshDelayMs;
    private _clearCacheOnRefreshError;
    private _userAgent;
    private _externals;
    private _cache;
    private _client;
    private _refreshPromise;
    private _auth;
    private _tokenEndpoint;
    private _revokeEndpoint;
    private _authorizeEndpoint;
    private _authProxy;
    private _urlPrefix;
    private _handleRateLimit;
    private _codeVerifier;
    private _discovery?;
    private _discoveryInitPromise;
    private _loginWindowCheckTimeout?;
    private _loginWindowEventListener?;
    constructor({ server, clientId, clientSecret, brandId, redirectUri, refreshDelayMs, clearCacheOnRefreshError, appName, appVersion, additionalUserAgent, externals, cache, client, refreshHandicapMs, tokenEndpoint, revokeEndpoint, authorizeEndpoint, enableDiscovery, discoveryServer, discoveryInitialEndpoint, discoveryAutoInit, authProxy, urlPrefix, handleRateLimit, }: PlatformOptionsConstructor);
    on(event: events.beforeLogin, listener: () => void): any;
    on(event: events.loginSuccess, listener: (response: Response) => void): any;
    on(event: events.loginError, listener: (error: ApiError | Error) => void): any;
    on(event: events.beforeRefresh, listener: () => void): any;
    on(event: events.refreshSuccess, listener: (response: Response) => void): any;
    on(event: events.refreshError, listener: (error: ApiError | Error) => void): any;
    on(event: events.beforeLogout, listener: () => void): any;
    on(event: events.logoutSuccess, listener: (response: Response) => void): any;
    on(event: events.logoutError, listener: (error: ApiError | Error) => void): any;
    on(event: events.rateLimitError, listener: (error: ApiError | Error) => void): any;
    auth(): Auth;
    discovery(): Discovery;
    createUrl(path?: string, options?: CreateUrlOptions): string;
    signUrl(path: string): Promise<string>;
    loginUrlWithDiscovery(options?: LoginUrlOptions): Promise<string>;
    initDiscovery(): Promise<void>;
    loginUrl({ implicit, state, brandId, display, prompt, uiOptions, uiLocales, localeId, usePKCE, responseHint, redirectUri, }?: LoginUrlOptions): string;
    /**
     * @return {string}
     */
    private _generateCodeVerifier;
    /**
     * @param {string} url
     * @return {Object}
     */
    parseLoginRedirect(url: string): qs.ParsedUrlQuery;
    /**
     * Convenience method to handle 3-legged OAuth
     *
     * Attention! This is an experimental method and it's signature and behavior may change without notice.
     */
    loginWindow({ url, width, height, origin, property, target, }: LoginWindowOptions): Promise<LoginOptions>;
    private _createLoginWindowCheckTimeout;
    private _clearLoginWindowCheckTimeout;
    /**
     * @return {Promise<boolean>}
     */
    loggedIn(): Promise<boolean>;
    login({ username, password, extension, code, jwt, access_token_ttl, refresh_token_ttl, access_token, endpoint_id, token_uri, discovery_uri, code_verifier, redirect_uri, ...options }?: LoginOptions): Promise<Response>;
    private _getTokenAndDiscoveryUriOnLogin;
    private _refresh;
    refresh(): Promise<Response>;
    logout(): Promise<Response>;
    private _getRevokeEndpoint;
    inflateRequest(request: Request, options?: SendOptions): Promise<Request>;
    sendRequest(request: Request, options?: SendOptions): Promise<Response>;
    send(options?: SendOptions): Promise<Response>;
    get(url: any, query?: any, options?: SendOptions): Promise<Response>;
    post(url: any, body?: any, query?: any, options?: SendOptions): Promise<Response>;
    put(url: any, body?: any, query?: any, options?: SendOptions): Promise<Response>;
    patch(url: any, body?: any, query?: any, options?: SendOptions): Promise<Response>;
    delete(url: any, query?: any, options?: SendOptions): Promise<Response>;
    ensureLoggedIn(): Promise<Response | null>;
    protected _tokenRequest(url: any, body: any): Promise<Response>;
    basicAuthHeader(): string;
    authHeader(): Promise<string>;
    get discoveryInitPromise(): Promise<void>;
    get codeVerifier(): string;
}
export interface PlatformOptions extends AuthOptions {
    server?: string;
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
    refreshDelayMs?: number;
    refreshHandicapMs?: number;
    clearCacheOnRefreshError?: boolean;
    appName?: string;
    appVersion?: string;
    additionalUserAgent?: string;
    tokenEndpoint?: string;
    revokeEndpoint?: string;
    authorizeEndpoint?: string;
    authProxy?: boolean;
    urlPrefix?: string;
    handleRateLimit?: boolean | number;
    enableDiscovery?: boolean;
    discoveryServer?: string;
    discoveryInitialEndpoint?: string;
    discoveryAuthorizedEndpoint?: string;
    discoveryAutoInit?: boolean;
    brandId?: string;
}
export interface PlatformOptionsConstructor extends PlatformOptions {
    externals: Externals;
    cache: Cache;
    client: Client;
}
export interface SendOptions {
    url?: any;
    body?: any;
    method?: string;
    query?: any;
    headers?: any;
    userAgent?: string;
    skipAuthCheck?: boolean;
    skipDiscoveryCheck?: boolean;
    handleRateLimit?: boolean | number;
    retry?: boolean;
}
export interface LoginOptions {
    username?: string;
    password?: string;
    extension?: string;
    code?: string;
    jwt?: string;
    access_token?: string;
    access_token_ttl?: number;
    refresh_token_ttl?: number;
    endpoint_id?: string;
    token_uri?: string;
    discovery_uri?: string;
    code_verifier?: string;
    redirect_uri?: string;
}
export interface LoginUrlOptions {
    state?: string;
    brandId?: string;
    display?: LoginUrlDisplay | string;
    prompt?: LoginUrlPrompt | string;
    implicit?: boolean;
    uiOptions?: string | string[];
    uiLocales?: string;
    localeId?: string;
    usePKCE?: boolean;
    responseHint?: string | string[];
    redirectUri?: string;
}
export declare enum LoginUrlPrompt {
    login = "login",
    sso = "sso",
    consent = "consent",
    none = "none"
}
export declare enum LoginUrlDisplay {
    page = "page",
    popup = "popup",
    touch = "touch",
    mobile = "mobile"
}
export interface CreateUrlOptions {
    addServer?: boolean;
    addMethod?: string;
}
export interface LoginWindowOptions {
    url: string;
    width?: number;
    height?: number;
    origin?: string;
    property?: string;
    target?: string;
}
export interface AuthorizationQuery extends qs.ParsedUrlQueryInput {
    response_type: 'token' | 'code';
    response_hint?: string | string[];
    redirect_uri: string;
    client_id: string;
    state?: string;
    brand_id?: string;
    display?: LoginUrlDisplay | string;
    prompt?: LoginUrlPrompt | string;
    ui_options?: string | string[];
    ui_locales?: string;
    localeId?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    discovery?: boolean;
}
export interface TokenRequestHeaders {
    'Content-Type': string;
    Authorization?: string;
}
export interface RefreshTokenBody {
    grant_type: 'refresh_token';
    refresh_token: string;
    access_token_ttl: number;
    refresh_token_ttl: number;
    client_id?: string;
}
export interface RevokeTokenBody {
    token: string;
    client_id?: string;
}
