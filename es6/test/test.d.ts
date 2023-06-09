import { expect, spy } from '@ringcentral/sdk-utils/test';
import { SDK, SDKOptions } from '../SDK';
export declare function apiCall(method: any, path: any, json: any, status?: number, statusText?: string, headers?: any): void;
export declare function authentication(status?: number): void;
export declare function logout(status?: number): void;
export declare function tokenRefresh(failure?: boolean): void;
export declare function createSdk(options?: SDKOptions): SDK;
export declare function asyncTest(fn: (sdk: SDK) => any, sdkOption?: SDKOptions): () => Promise<void>;
export declare function expectThrows(fn: any, errorText?: string, additional?: (e?: Error) => void): Promise<void>;
export declare function cleanFetchMock(): void;
export declare function getInitialDiscoveryMockData(): {
    version: string;
    retryCount: number;
    retryInterval: number;
    discoveryApi: {
        defaultExternalUri: string;
    };
    authApi: {
        authorizationUri: string;
        oidcDiscoveryUri: string;
        defaultTokenUri: string;
    };
    coreApi: {
        baseUri: string;
    };
};
export declare function getExternalDiscoveryMockData(): {
    version: string;
    expiresIn: number;
    retryCount: number;
    retryInterval: number;
    retryCycleDelay: number;
    discoveryApi: {
        initialUri: string;
        externalUri: string;
    };
    authApi: {
        authorizationUri: string;
        oidcDiscoveryUri: string;
        baseUri: string;
        tokenUri: string;
    };
    rcv: {
        baseApiUri: string;
    };
    coreApi: {
        baseUri: string;
        pubnubOrigin: string;
    };
};
export { spy, SDK, expect };
