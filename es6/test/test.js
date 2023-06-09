var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { expect, spy, fetchMock } from '@ringcentral/sdk-utils/test';
import { SDK } from '../SDK';
fetchMock.config.fallbackToNetwork = true;
export function apiCall(method, path, json, status, statusText, headers) {
    if (status === void 0) { status = 200; }
    if (statusText === void 0) { statusText = 'OK'; }
    if (headers === void 0) { headers = null; }
    var isJson = typeof json !== 'string';
    if (isJson && !headers)
        headers = { 'Content-Type': 'application/json' };
    fetchMock.mock({
        method: method,
        matcher: "http://whatever".concat(path),
        repeat: 1,
        overwriteRoutes: false,
        response: new fetchMock.config.Response(isJson ? JSON.stringify(json) : json, {
            status: status,
            statusText: statusText,
            headers: headers,
        }),
    });
}
export function authentication(status) {
    if (status === void 0) { status = 200; }
    apiCall('POST', '/restapi/oauth/token', {
        access_token: 'ACCESS_TOKEN',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'REFRESH_TOKEN',
        refresh_token_expires_in: 60480,
        scope: 'SMS RCM Foo Boo',
        expireTime: new Date().getTime() + 3600000,
    }, status);
}
export function logout(status) {
    if (status === void 0) { status = 200; }
    apiCall('POST', '/restapi/oauth/revoke', {}, status);
}
export function tokenRefresh(failure) {
    if (failure === void 0) { failure = false; }
    if (!failure) {
        apiCall('POST', '/restapi/oauth/token', {
            access_token: 'ACCESS_TOKEN_FROM_REFRESH',
            token_type: 'bearer',
            expires_in: 3600,
            refresh_token: 'REFRESH_TOKEN_FROM_REFRESH',
            refresh_token_expires_in: 60480,
            scope: 'SMS RCM Foo Boo',
        });
    }
    else {
        apiCall('POST', '/restapi/oauth/token', {
            message: 'Wrong token',
            error_description: 'Wrong token',
            description: 'Wrong token',
        }, 400);
    }
}
export function createSdk(options) {
    if (options === void 0) { options = {}; }
    return new SDK(__assign({ server: 'http://whatever', clientId: 'whatever', clientSecret: 'whatever', Request: fetchMock.config.Request, Response: fetchMock.config.Response, Headers: fetchMock.config.Headers, fetch: fetchMock.fetchHandler, refreshDelayMs: 1, redirectUri: 'http://foo', handleRateLimit: false }, options));
}
export function asyncTest(fn, sdkOption) {
    var _this = this;
    if (sdkOption === void 0) { sdkOption = {}; }
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var sdk, clean, platofrm, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = createSdk(sdkOption);
                    clean = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fetchMock.restore();
                                    return [4 /*yield*/, sdk.cache().clean()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 8]);
                    return [4 /*yield*/, clean()];
                case 2:
                    _a.sent();
                    authentication();
                    platofrm = sdk.platform();
                    return [4 /*yield*/, platofrm.login({
                            username: 'whatever',
                            password: 'whatever',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fn(sdk)];
                case 4:
                    _a.sent();
                    expect(fetchMock.done()).to.equal(true);
                    return [4 /*yield*/, clean()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    e_1 = _a.sent();
                    return [4 /*yield*/, clean()];
                case 7:
                    _a.sent();
                    console.error(e_1.stack); //eslint-disable-line
                    throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    }); };
}
export function expectThrows(fn, errorText, additional) {
    if (errorText === void 0) { errorText = ''; }
    if (additional === void 0) { additional = function (e) { }; }
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, fn()];
                case 1:
                    _a.sent();
                    throw new Error('This should not be reached');
                case 2:
                    e_2 = _a.sent();
                    expect(e_2.message).to.have.string(errorText);
                    return [4 /*yield*/, additional(e_2)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function cleanFetchMock() {
    fetchMock.restore();
}
export function getInitialDiscoveryMockData() {
    return {
        version: '1.0.0',
        retryCount: 3,
        retryInterval: 3,
        discoveryApi: {
            defaultExternalUri: 'http://whatever/.well-known/entry-points/external',
        },
        authApi: {
            authorizationUri: 'http://whatever/restapi/oauth/authorize',
            oidcDiscoveryUri: 'http://whatever/.well-known/openid-configuration',
            defaultTokenUri: 'http://whatever/restapi/oauth/token',
        },
        coreApi: {
            baseUri: 'http://whatever',
        },
    };
}
export function getExternalDiscoveryMockData() {
    return {
        version: '1.0.0',
        expiresIn: 86400,
        retryCount: 3,
        retryInterval: 3,
        retryCycleDelay: 824,
        discoveryApi: {
            initialUri: 'http://whatever/.well-known/entry-points/initial',
            externalUri: 'http://whatever/.well-known/entry-points/external',
        },
        authApi: {
            authorizationUri: 'http://whatever/restapi/oauth/authorize',
            oidcDiscoveryUri: 'http://whatever/.well-known/openid-configuration',
            baseUri: 'http://whatever',
            tokenUri: 'http://whatever/restapi/oauth/token',
        },
        rcv: {
            baseApiUri: 'http://whatever',
        },
        coreApi: {
            baseUri: 'http://whatever',
            pubnubOrigin: 'whatever',
        },
    };
}
export { spy, SDK, expect };
//# sourceMappingURL=test.js.map