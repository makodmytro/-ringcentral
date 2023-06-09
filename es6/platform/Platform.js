var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { EventEmitter } from 'events';
import { createHash, randomBytes } from 'crypto';
import * as qs from 'querystring';
import Auth from './Auth';
import Discovery from './Discovery';
import * as Constants from '../core/Constants';
import Client from '../http/Client';
import { delay } from './utils';
var getParts = function (url, separator) { return url.split(separator).reverse()[0]; };
export var events;
(function (events) {
    events["beforeLogin"] = "beforeLogin";
    events["loginSuccess"] = "loginSuccess";
    events["loginError"] = "loginError";
    events["beforeRefresh"] = "beforeRefresh";
    events["refreshSuccess"] = "refreshSuccess";
    events["refreshError"] = "refreshError";
    events["beforeLogout"] = "beforeLogout";
    events["logoutSuccess"] = "logoutSuccess";
    events["logoutError"] = "logoutError";
    events["rateLimitError"] = "rateLimitError";
})(events || (events = {}));
function checkPathHasHttp(path) {
    return path.startsWith('http://') || path.startsWith('https://');
}
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform(_a) {
        var server = _a.server, clientId = _a.clientId, clientSecret = _a.clientSecret, brandId = _a.brandId, _b = _a.redirectUri, redirectUri = _b === void 0 ? '' : _b, _c = _a.refreshDelayMs, refreshDelayMs = _c === void 0 ? 100 : _c, _d = _a.clearCacheOnRefreshError, clearCacheOnRefreshError = _d === void 0 ? true : _d, _e = _a.appName, appName = _e === void 0 ? '' : _e, _f = _a.appVersion, appVersion = _f === void 0 ? '' : _f, _g = _a.additionalUserAgent, additionalUserAgent = _g === void 0 ? '' : _g, externals = _a.externals, cache = _a.cache, client = _a.client, refreshHandicapMs = _a.refreshHandicapMs, _h = _a.tokenEndpoint, tokenEndpoint = _h === void 0 ? '/restapi/oauth/token' : _h, _j = _a.revokeEndpoint, revokeEndpoint = _j === void 0 ? '/restapi/oauth/revoke' : _j, _k = _a.authorizeEndpoint, authorizeEndpoint = _k === void 0 ? '/restapi/oauth/authorize' : _k, _l = _a.enableDiscovery, enableDiscovery = _l === void 0 ? false : _l, discoveryServer = _a.discoveryServer, _m = _a.discoveryInitialEndpoint, discoveryInitialEndpoint = _m === void 0 ? '/.well-known/entry-points/initial' : _m, _o = _a.discoveryAutoInit, discoveryAutoInit = _o === void 0 ? true : _o, _p = _a.authProxy, authProxy = _p === void 0 ? false : _p, _q = _a.urlPrefix, urlPrefix = _q === void 0 ? '' : _q, handleRateLimit = _a.handleRateLimit;
        var _this = _super.call(this) || this;
        _this.events = events;
        _this._server = server;
        _this._rcvServer = server;
        _this._clientId = clientId;
        _this._clientSecret = clientSecret;
        _this._brandId = brandId;
        _this._redirectUri = redirectUri;
        _this._refreshDelayMs = refreshDelayMs;
        _this._clearCacheOnRefreshError = clearCacheOnRefreshError;
        _this._authProxy = authProxy;
        _this._urlPrefix = urlPrefix;
        _this._userAgent = "".concat(appName ? "".concat(appName + (appVersion ? "/".concat(appVersion) : ''), " ") : '', "RCJSSDK/").concat(Constants.version).concat(additionalUserAgent ? " ".concat(additionalUserAgent) : '');
        _this._externals = externals;
        _this._cache = cache;
        _this._client = client;
        _this._refreshPromise = null;
        _this._auth = new Auth({
            cache: _this._cache,
            cacheId: Platform._cacheId,
            refreshHandicapMs: refreshHandicapMs,
        });
        _this._tokenEndpoint = tokenEndpoint;
        _this._revokeEndpoint = revokeEndpoint;
        _this._authorizeEndpoint = authorizeEndpoint;
        _this._handleRateLimit = handleRateLimit;
        _this._codeVerifier = '';
        if (enableDiscovery) {
            var initialEndpoint = discoveryServer
                ? "".concat(discoveryServer).concat(discoveryInitialEndpoint)
                : discoveryInitialEndpoint;
            _this._discovery = new Discovery({
                clientId: clientId,
                brandId: brandId,
                cache: _this._cache,
                cacheId: Platform._discoveryCacheId,
                initialEndpoint: initialEndpoint,
                fetchGet: _this.get.bind(_this),
            });
            _this._discovery.on(_this._discovery.events.initialized, function (discoveryData) {
                _this._authorizeEndpoint = discoveryData.authApi.authorizationUri;
            });
            _this._client.on(_this._client.events.requestSuccess, function (response) {
                if (response.headers.get('discovery-required')) {
                    _this._discovery.refreshExternalData();
                }
            });
            if (discoveryAutoInit) {
                _this._discoveryInitPromise = _this.initDiscovery();
            }
        }
        return _this;
    }
    Platform.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    Platform.prototype.auth = function () {
        return this._auth;
    };
    Platform.prototype.discovery = function () {
        return this._discovery;
    };
    Platform.prototype.createUrl = function (path, options) {
        if (path === void 0) { path = ''; }
        if (options === void 0) { options = {}; }
        var builtUrl = '';
        var hasHttp = checkPathHasHttp(path);
        if (options.addServer && !hasHttp) {
            if (path.indexOf('/rcvideo') === 0 || (this._urlPrefix && this._urlPrefix.indexOf('/rcvideo') === 0)) {
                builtUrl += this._rcvServer;
            }
            else {
                builtUrl += this._server;
            }
        }
        if (this._urlPrefix)
            builtUrl += this._urlPrefix;
        builtUrl += path;
        if (options.addMethod)
            builtUrl += "".concat(path.includes('?') ? '&' : '?', "_method=").concat(options.addMethod);
        return builtUrl;
    };
    Platform.prototype.signUrl = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = "".concat(path + (path.includes('?') ? '&' : '?'), "access_token=")).concat;
                        return [4 /*yield*/, this._auth.data()];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).access_token])];
                }
            });
        });
    };
    Platform.prototype.loginUrlWithDiscovery = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var discoveryData, e_1, discoveryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._discovery) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, this._discovery.fetchInitialData()];
                    case 2:
                        discoveryData = _a.sent();
                        this._authorizeEndpoint = discoveryData.authApi.authorizationUri;
                        if (!this._discoveryInitPromise) return [3 /*break*/, 4];
                        // await init discovery if it's not initialized
                        return [4 /*yield*/, this._discoveryInitPromise];
                    case 3:
                        // await init discovery if it's not initialized
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this._discovery.initialData()];
                    case 6:
                        discoveryData = _a.sent();
                        if (!discoveryData) {
                            throw e_1;
                        }
                        // feedback to use the cached data
                        this._authorizeEndpoint = discoveryData.authApi.authorizationUri;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, this.loginUrl(options)];
                }
            });
        });
    };
    Platform.prototype.initDiscovery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._discovery) {
                            throw new Error('Discovery is not enabled!');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._discovery.init()];
                    case 2:
                        _a.sent();
                        this._discoveryInitPromise = null;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this._discoveryInitPromise = null;
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Platform.prototype.loginUrl = function (_a) {
        var _b = _a === void 0 ? {} : _a, implicit = _b.implicit, state = _b.state, brandId = _b.brandId, display = _b.display, prompt = _b.prompt, uiOptions = _b.uiOptions, uiLocales = _b.uiLocales, localeId = _b.localeId, usePKCE = _b.usePKCE, responseHint = _b.responseHint, redirectUri = _b.redirectUri;
        var query = {
            response_type: implicit ? 'token' : 'code',
            redirect_uri: redirectUri ? redirectUri : this._redirectUri,
            client_id: this._clientId,
            state: state,
            brand_id: brandId ? brandId : this._brandId,
            display: display,
            prompt: prompt,
            ui_options: uiOptions,
            ui_locales: uiLocales,
            localeId: localeId,
        };
        if (responseHint) {
            query.response_hint = responseHint;
        }
        if (this._discovery) {
            if (!this._discovery.initialized) {
                throw new Error('Discovery is not initialized');
            }
            query.discovery = true;
        }
        if (usePKCE && implicit) {
            throw new Error('PKCE only works with Authorization Code Flow');
        }
        this._codeVerifier = '';
        if (usePKCE) {
            this._codeVerifier = this._generateCodeVerifier();
            query.code_challenge = createHash('sha256')
                .update(this._codeVerifier)
                .digest()
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
            query.code_challenge_method = 'S256';
        }
        return this.createUrl("".concat(this._authorizeEndpoint, "?").concat(qs.stringify(query)), { addServer: true });
    };
    /**
     * @return {string}
     */
    Platform.prototype._generateCodeVerifier = function () {
        var codeVerifier = randomBytes(32);
        codeVerifier = codeVerifier
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
        return codeVerifier;
    };
    /**
     * @param {string} url
     * @return {Object}
     */
    Platform.prototype.parseLoginRedirect = function (url) {
        var response = (url.startsWith('#') && getParts(url, '#')) || (url.startsWith('?') && getParts(url, '?')) || null;
        if (!response)
            throw new Error('Unable to parse response');
        var queryString = qs.parse(response);
        if (!queryString)
            throw new Error('Unable to parse response');
        var error = queryString.error_description || queryString.error;
        if (error) {
            var e = new Error(error.toString());
            e.error = queryString.error;
            throw e;
        }
        return queryString;
    };
    /**
     * Convenience method to handle 3-legged OAuth
     *
     * Attention! This is an experimental method and it's signature and behavior may change without notice.
     */
    Platform.prototype.loginWindow = function (_a) {
        var _this = this;
        var url = _a.url, _b = _a.width, width = _b === void 0 ? 400 : _b, _c = _a.height, height = _c === void 0 ? 600 : _c, _d = _a.origin, origin = _d === void 0 ? window.location.origin : _d, _e = _a.property, property = _e === void 0 ? Constants.authResponseProperty : _e, _f = _a.target, target = _f === void 0 ? '_blank' : _f;
        // clear check last timeout when user open loginWindow twice to avoid leak
        this._clearLoginWindowCheckTimeout();
        return new Promise(function (resolve, reject) {
            if (typeof window === 'undefined')
                throw new Error('This method can be used only in browser');
            if (!url)
                throw new Error('Missing mandatory URL parameter');
            var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : 0;
            var dualScreenTop = window.screenTop !== undefined ? window.screenTop : 0;
            var screenWidth = screen.width;
            var screenHeight = screen.height;
            var left = screenWidth / 2 - width / 2 + dualScreenLeft;
            var top = screenHeight / 2 - height / 2 + dualScreenTop;
            var win = window.open(url, '_blank', target === '_blank'
                ? "scrollbars=yes, status=yes, width=".concat(width, ", height=").concat(height, ", left=").concat(left, ", top=").concat(top)
                : '');
            if (!win) {
                throw new Error('Could not open login window. Please allow popups for this site');
            }
            if (win.focus)
                win.focus();
            // clear listener when user open loginWindow twice to avoid leak
            if (_this._loginWindowEventListener) {
                window.removeEventListener('message', _this._loginWindowEventListener);
            }
            _this._loginWindowEventListener = function (e) {
                try {
                    if (e.origin !== origin)
                        return;
                    if (!e.data || !e.data[property])
                        return; // keep waiting
                    _this._clearLoginWindowCheckTimeout();
                    win.close();
                    window.removeEventListener('message', _this._loginWindowEventListener);
                    _this._loginWindowEventListener = null;
                    var loginOptions = _this.parseLoginRedirect(e.data[property]);
                    if (!loginOptions.code && !loginOptions.access_token)
                        throw new Error('No authorization code or token');
                    resolve(loginOptions);
                }
                catch (e) {
                    reject(e);
                }
            };
            window.addEventListener('message', _this._loginWindowEventListener, false);
            _this._createLoginWindowCheckTimeout(win, reject);
        });
    };
    Platform.prototype._createLoginWindowCheckTimeout = function (win, reject) {
        var _this = this;
        this._loginWindowCheckTimeout = setTimeout(function () {
            if (win.closed) {
                if (_this._loginWindowEventListener) {
                    window.removeEventListener('message', _this._loginWindowEventListener);
                    _this._loginWindowEventListener = null;
                }
                _this._loginWindowCheckTimeout = null;
                reject(new Error('Login window is closed'));
                return;
            }
            _this._createLoginWindowCheckTimeout(win, reject);
        }, 2000);
    };
    Platform.prototype._clearLoginWindowCheckTimeout = function () {
        if (this._loginWindowCheckTimeout) {
            clearTimeout(this._loginWindowCheckTimeout);
            this._loginWindowCheckTimeout = null;
        }
    };
    /**
     * @return {Promise<boolean>}
     */
    Platform.prototype.loggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!this._authProxy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.get('/restapi/v1.0/client-info')];
                    case 1:
                        _a.sent(); // we only can determine the status if we actually make request
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.ensureLoggedIn()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, true];
                    case 5:
                        e_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Platform.prototype.login = function (_a) {
        if (_a === void 0) { _a = {}; }
        var username = _a.username, password = _a.password, _b = _a.extension, extension = _b === void 0 ? '' : _b, code = _a.code, jwt = _a.jwt, access_token_ttl = _a.access_token_ttl, refresh_token_ttl = _a.refresh_token_ttl, access_token = _a.access_token, endpoint_id = _a.endpoint_id, token_uri = _a.token_uri, discovery_uri = _a.discovery_uri, code_verifier = _a.code_verifier, redirect_uri = _a.redirect_uri, options = __rest(_a, ["username", "password", "extension", "code", "jwt", "access_token_ttl", "refresh_token_ttl", "access_token", "endpoint_id", "token_uri", "discovery_uri", "code_verifier", "redirect_uri"]);
        return __awaiter(this, void 0, void 0, function () {
            var body, response, json, tokenEndpoint, discoveryEndpoint, discovery, codeVerifier, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 13]);
                        this.emit(this.events.beforeLogin);
                        body = {};
                        response = null;
                        json = void 0;
                        tokenEndpoint = this._tokenEndpoint;
                        discoveryEndpoint = void 0;
                        if (!this._discovery) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._getTokenAndDiscoveryUriOnLogin({ token_uri: token_uri, discovery_uri: discovery_uri })];
                    case 1:
                        discovery = _c.sent();
                        tokenEndpoint = discovery.tokenEndpoint;
                        discoveryEndpoint = discovery.discoveryEndpoint;
                        _c.label = 2;
                    case 2:
                        codeVerifier = code_verifier ? code_verifier : this._codeVerifier;
                        if (!access_token) return [3 /*break*/, 3];
                        //TODO Potentially make a request to /oauth/tokeninfo
                        json = __assign({ access_token: access_token }, options);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!code && !jwt) {
                            body.grant_type = 'password';
                            if (extension && extension.length > 0) {
                                body.username = "".concat(username, "*").concat(extension);
                            }
                            else {
                                body.username = username;
                            }
                            body.password = password;
                        }
                        else if (jwt) {
                            body.grant_type = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
                            body.assertion = jwt;
                        }
                        else if (code) {
                            //@see https://developers.ringcentral.com/legacy-api-reference/index.html#!#RefAuthorizationCodeFlow
                            body.grant_type = 'authorization_code';
                            body.code = code;
                            body.redirect_uri = redirect_uri ? redirect_uri : this._redirectUri;
                            if (codeVerifier && codeVerifier.length > 0) {
                                body.code_verifier = codeVerifier;
                            }
                        }
                        if (access_token_ttl)
                            body.access_token_ttl = access_token_ttl;
                        if (refresh_token_ttl)
                            body.refresh_token_ttl = refresh_token_ttl;
                        if (endpoint_id)
                            body.endpoint_id = endpoint_id;
                        return [4 /*yield*/, this._tokenRequest(tokenEndpoint, body)];
                    case 4:
                        response = _c.sent();
                        return [4 /*yield*/, response.clone().json()];
                    case 5:
                        json = _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, this._auth.setData(__assign(__assign({}, json), { code_verifier: codeVerifier }))];
                    case 7:
                        _c.sent();
                        if (!discoveryEndpoint) return [3 /*break*/, 9];
                        return [4 /*yield*/, this._discovery.fetchExternalData(discoveryEndpoint)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        this.emit(this.events.loginSuccess, response);
                        return [2 /*return*/, response];
                    case 10:
                        e_4 = _c.sent();
                        if (!this._clearCacheOnRefreshError) return [3 /*break*/, 12];
                        return [4 /*yield*/, this._cache.clean()];
                    case 11:
                        _c.sent();
                        if (this._discovery) {
                            this._discoveryInitPromise = this.initDiscovery(); // request new init data after refresh error and cache cleaned
                        }
                        _c.label = 12;
                    case 12:
                        this.emit(this.events.loginError, e_4);
                        throw e_4;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Platform.prototype._getTokenAndDiscoveryUriOnLogin = function (_a) {
        var token_uri = _a.token_uri, discovery_uri = _a.discovery_uri;
        return __awaiter(this, void 0, void 0, function () {
            var tokenEndpoint, discoveryEndpoint, discoveryData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenEndpoint = token_uri;
                        discoveryEndpoint = discovery_uri;
                        if (tokenEndpoint && discoveryEndpoint) {
                            return [2 /*return*/, { tokenEndpoint: tokenEndpoint, discoveryEndpoint: discoveryEndpoint }];
                        }
                        if (!this._discoveryInitPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._discoveryInitPromise];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this._discovery.initialData()];
                    case 3:
                        discoveryData = _b.sent();
                        if (!tokenEndpoint) {
                            tokenEndpoint = discoveryData.authApi.defaultTokenUri;
                        }
                        if (!discoveryEndpoint) {
                            discoveryEndpoint = discoveryData.discoveryApi.defaultExternalUri;
                        }
                        return [2 /*return*/, { tokenEndpoint: tokenEndpoint, discoveryEndpoint: discoveryEndpoint }];
                }
            });
        });
    };
    Platform.prototype._refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authData, refreshTokenValid, body, tokenEndpoint, discoveryData, initialDiscoveryData, res, json, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 15, , 18]);
                        this.emit(this.events.beforeRefresh);
                        return [4 /*yield*/, delay(this._refreshDelayMs)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.auth().data()];
                    case 2:
                        authData = _a.sent();
                        // Perform sanity checks
                        if (!authData.refresh_token)
                            throw new Error('Refresh token is missing');
                        return [4 /*yield*/, this._auth.refreshTokenValid()];
                    case 3:
                        refreshTokenValid = _a.sent();
                        if (!refreshTokenValid)
                            throw new Error('Refresh token has expired');
                        body = {
                            grant_type: 'refresh_token',
                            refresh_token: authData.refresh_token,
                            access_token_ttl: parseInt(authData.expires_in),
                            refresh_token_ttl: parseInt(authData.refresh_token_expires_in),
                        };
                        tokenEndpoint = this._tokenEndpoint;
                        if (!this._discovery) return [3 /*break*/, 9];
                        return [4 /*yield*/, this._discovery.externalData()];
                    case 4:
                        discoveryData = _a.sent();
                        if (!discoveryData) return [3 /*break*/, 5];
                        tokenEndpoint = discoveryData.authApi.tokenUri;
                        return [3 /*break*/, 9];
                    case 5:
                        if (!this._discoveryInitPromise) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._discoveryInitPromise];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this._discovery.initialData()];
                    case 8:
                        initialDiscoveryData = _a.sent();
                        tokenEndpoint = initialDiscoveryData.authApi.defaultTokenUri;
                        _a.label = 9;
                    case 9: return [4 /*yield*/, this._tokenRequest(tokenEndpoint, body)];
                    case 10:
                        res = _a.sent();
                        return [4 /*yield*/, res.clone().json()];
                    case 11:
                        json = _a.sent();
                        if (!!json.access_token) return [3 /*break*/, 13];
                        return [4 /*yield*/, this._client.makeError(new Error('Malformed OAuth response'), res)];
                    case 12: throw _a.sent();
                    case 13: return [4 /*yield*/, this._auth.setData(json)];
                    case 14:
                        _a.sent();
                        this.emit(this.events.refreshSuccess, res);
                        return [2 /*return*/, res];
                    case 15:
                        e_5 = _a.sent();
                        if (!this._clearCacheOnRefreshError) return [3 /*break*/, 17];
                        return [4 /*yield*/, this._cache.clean()];
                    case 16:
                        _a.sent();
                        if (this._discovery) {
                            this._discoveryInitPromise = this.initDiscovery(); // request new init data after refresh error and cache cleaned
                        }
                        _a.label = 17;
                    case 17:
                        this.emit(this.events.refreshError, e_5);
                        throw e_5;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    Platform.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._authProxy) {
                    throw new Error('Refresh is not supported in Auth Proxy mode');
                }
                if (!this._refreshPromise) {
                    this._refreshPromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var res, e_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this._refresh()];
                                case 1:
                                    res = _a.sent();
                                    this._refreshPromise = null;
                                    return [2 /*return*/, res];
                                case 2:
                                    e_6 = _a.sent();
                                    this._refreshPromise = null;
                                    throw e_6;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })();
                }
                return [2 /*return*/, this._refreshPromise];
            });
        });
    };
    Platform.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, revokeEndpoint, authData, body, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._authProxy) {
                            throw new Error('Logout is not supported in Auth Proxy mode');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        this.emit(this.events.beforeLogout);
                        res = null;
                        return [4 /*yield*/, this._getRevokeEndpoint()];
                    case 2:
                        revokeEndpoint = _a.sent();
                        if (!revokeEndpoint) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._auth.data()];
                    case 3:
                        authData = _a.sent();
                        body = {
                            token: authData.access_token,
                        };
                        return [4 /*yield*/, this._tokenRequest(revokeEndpoint, body)];
                    case 4:
                        // Support to revoke token without client secret with client id in body
                        res = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this._cache.clean()];
                    case 6:
                        _a.sent();
                        if (this._discovery) {
                            this._discoveryInitPromise = this.initDiscovery(); // request new init data after logout
                        }
                        this.emit(this.events.logoutSuccess, res);
                        return [2 /*return*/, res];
                    case 7:
                        e_7 = _a.sent();
                        if (this._discovery) {
                            this._discoveryInitPromise = this.initDiscovery(); // request new init data after logout error
                        }
                        this.emit(this.events.logoutError, e_7);
                        throw e_7;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Platform.prototype._getRevokeEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var revokeEndpoint, discoveryData, baseUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        revokeEndpoint = this._revokeEndpoint;
                        if (!this._discovery || checkPathHasHttp(revokeEndpoint)) {
                            return [2 /*return*/, revokeEndpoint];
                        }
                        return [4 /*yield*/, this._discovery.externalData()];
                    case 1:
                        discoveryData = _a.sent();
                        baseUri = discoveryData.authApi.baseUri;
                        revokeEndpoint = "".concat(baseUri).concat(revokeEndpoint);
                        return [2 /*return*/, revokeEndpoint];
                }
            });
        });
    };
    Platform.prototype.inflateRequest = function (request, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var userAgent, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        options = options || {};
                        userAgent = this._userAgent;
                        if (options.userAgent) {
                            userAgent = "".concat(options.userAgent, " ").concat(userAgent);
                        }
                        request.headers.set('X-User-Agent', userAgent);
                        if (options.skipAuthCheck)
                            return [2 /*return*/, request];
                        return [4 /*yield*/, this.ensureLoggedIn()];
                    case 1:
                        _d.sent();
                        request.headers.set('Client-Id', this._clientId);
                        if (!!this._authProxy) return [3 /*break*/, 3];
                        _b = (_a = request.headers).set;
                        _c = ['Authorization'];
                        return [4 /*yield*/, this.authHeader()];
                    case 2:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 3;
                    case 3: return [2 /*return*/, request];
                }
            });
        });
    };
    Platform.prototype.sendRequest = function (request, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var e_8, retry, handleRateLimit, response, status_1, retryAfter, defaultRetryAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 7]);
                        return [4 /*yield*/, this.inflateRequest(request, options)];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, this._client.sendRequest(request)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_8 = _a.sent();
                        retry = options.retry, handleRateLimit = options.handleRateLimit;
                        // Guard is for errors that come from polling
                        if (!e_8.response || retry)
                            throw e_8;
                        response = e_8.response;
                        status_1 = response.status;
                        if ((status_1 !== Client._unauthorizedStatus && status_1 !== Client._rateLimitStatus) || this._authProxy)
                            throw e_8;
                        options.retry = true;
                        retryAfter = 0;
                        if (!(status_1 === Client._unauthorizedStatus)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._auth.cancelAccessToken()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (status_1 === Client._rateLimitStatus) {
                            handleRateLimit = handleRateLimit || this._handleRateLimit;
                            defaultRetryAfter = !handleRateLimit || typeof handleRateLimit === 'boolean' ? 60 : handleRateLimit;
                            // FIXME retry-after is custom header, by default, it can't be retrieved. Server should add header: 'Access-Control-Expose-Headers: retry-after'.
                            retryAfter = parseFloat(response.headers.get('retry-after') || defaultRetryAfter) * 1000;
                            e_8.retryAfter = retryAfter;
                            this.emit(this.events.rateLimitError, e_8);
                            if (!handleRateLimit)
                                throw e_8;
                        }
                        return [4 /*yield*/, delay(retryAfter)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, this.sendRequest(this._client.createRequest(options), options)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Platform.prototype.send = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var discoveryExpired, discoveryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!options.skipAuthCheck && !options.skipDiscoveryCheck && this._discovery)) return [3 /*break*/, 7];
                        if (!this._discoveryInitPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._discoveryInitPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._discovery.externalDataExpired()];
                    case 3:
                        discoveryExpired = _a.sent();
                        if (!discoveryExpired) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._discovery.refreshExternalData()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this._discovery.externalData()];
                    case 6:
                        discoveryData = _a.sent();
                        if (!discoveryData) {
                            throw new Error('Discovery data is missing');
                        }
                        this._server = discoveryData.coreApi.baseUri;
                        this._rcvServer = discoveryData.rcv.baseApiUri;
                        if (discoveryData.tag) {
                            options.headers = options.headers || {};
                            options.headers['Discovery-Tag'] = discoveryData.tag;
                        }
                        _a.label = 7;
                    case 7:
                        //FIXME https://github.com/bitinn/node-fetch/issues/43
                        options.url = this.createUrl(options.url, { addServer: true });
                        return [2 /*return*/, this.sendRequest(this._client.createRequest(options), options)];
                }
            });
        });
    };
    Platform.prototype.get = function (url, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(__assign({ method: 'GET', url: url, query: query }, options))];
            });
        });
    };
    Platform.prototype.post = function (url, body, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(__assign({ method: 'POST', url: url, query: query, body: body }, options))];
            });
        });
    };
    Platform.prototype.put = function (url, body, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(__assign({ method: 'PUT', url: url, query: query, body: body }, options))];
            });
        });
    };
    Platform.prototype.patch = function (url, body, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(__assign({ method: 'PATCH', url: url, query: query, body: body }, options))];
            });
        });
    };
    Platform.prototype.delete = function (url, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(__assign({ method: 'DELETE', url: url, query: query }, options))];
            });
        });
    };
    Platform.prototype.ensureLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._authProxy)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this._auth.accessTokenValid()];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.refresh()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Platform.prototype._tokenRequest = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            var headers;
            return __generator(this, function (_a) {
                headers = {
                    'Content-Type': Client._urlencodedContentType,
                };
                if (this._clientSecret && this._clientSecret.length > 0) {
                    headers.Authorization = this.basicAuthHeader();
                }
                else {
                    // Put client_id in body when no app secret
                    body.client_id = this._clientId;
                }
                return [2 /*return*/, this.send({
                        url: url,
                        body: body,
                        skipAuthCheck: true,
                        method: 'POST',
                        headers: headers,
                    })];
            });
        });
    };
    Platform.prototype.basicAuthHeader = function () {
        var apiKey = this._clientId + (this._clientSecret ? ":".concat(this._clientSecret) : '');
        return "Basic ".concat(typeof btoa === 'function' ? btoa(apiKey) : Buffer.from(apiKey).toString('base64'));
    };
    Platform.prototype.authHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._auth.data()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (data.token_type || 'Bearer') + (data.access_token ? " ".concat(data.access_token) : '')];
                }
            });
        });
    };
    Object.defineProperty(Platform.prototype, "discoveryInitPromise", {
        get: function () {
            return this._discoveryInitPromise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Platform.prototype, "codeVerifier", {
        get: function () {
            return this._codeVerifier;
        },
        enumerable: false,
        configurable: true
    });
    Platform._cacheId = 'platform';
    Platform._discoveryCacheId = 'platform-discovery';
    return Platform;
}(EventEmitter));
export default Platform;
export var LoginUrlPrompt;
(function (LoginUrlPrompt) {
    LoginUrlPrompt["login"] = "login";
    LoginUrlPrompt["sso"] = "sso";
    LoginUrlPrompt["consent"] = "consent";
    LoginUrlPrompt["none"] = "none";
})(LoginUrlPrompt || (LoginUrlPrompt = {}));
export var LoginUrlDisplay;
(function (LoginUrlDisplay) {
    LoginUrlDisplay["page"] = "page";
    LoginUrlDisplay["popup"] = "popup";
    LoginUrlDisplay["touch"] = "touch";
    LoginUrlDisplay["mobile"] = "mobile";
})(LoginUrlDisplay || (LoginUrlDisplay = {}));
//# sourceMappingURL=Platform.js.map