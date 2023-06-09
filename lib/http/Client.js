"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
var events_1 = require("events");
var qs = __importStar(require("querystring"));
var is_plain_object_1 = __importDefault(require("is-plain-object"));
function findHeaderName(name, headers) {
    name = name.toLowerCase();
    return Object.keys(headers).reduce(function (res, key) {
        if (res)
            return res;
        if (name === key.toLowerCase())
            return key;
        return res;
    }, null);
}
var events;
(function (events) {
    events["beforeRequest"] = "beforeRequest";
    events["requestSuccess"] = "requestSuccess";
    events["requestError"] = "requestError";
})(events = exports.events || (exports.events = {}));
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(_a) {
        var externals = _a.externals, _b = _a.defaultRequestInit, defaultRequestInit = _b === void 0 ? {} : _b;
        var _this = _super.call(this) || this;
        _this.events = events;
        _this._defaultRequestInit = {};
        _this._defaultRequestInit = defaultRequestInit;
        _this._externals = externals;
        return _this;
    }
    Client.prototype.sendRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1, error, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 6]);
                        //TODO Stop request if listeners return false
                        this.emit(this.events.beforeRequest, request);
                        return [4 /*yield*/, this._loadResponse(request)];
                    case 1:
                        response = _b.sent();
                        if (!response.ok)
                            throw new Error('Response has unsuccessful status');
                        this.emit(this.events.requestSuccess, response, request);
                        return [2 /*return*/, response];
                    case 2:
                        e_1 = _b.sent();
                        if (!!e_1.response) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.makeError(e_1, response, request)];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = e_1;
                        _b.label = 5;
                    case 5:
                        error = _a;
                        this.emit(this.events.requestError, error);
                        throw error;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype._loadResponse = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._externals.fetch.call(null, request)]; // fixed illegal invocation in Chrome
            });
        });
    };
    /**
     * Wraps the JS Error object with transaction information
     */
    Client.prototype.makeError = function (e, response, request) {
        if (response === void 0) { response = null; }
        if (request === void 0) { request = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(!e.response && !e.originalMessage)) return [3 /*break*/, 3];
                        e.response = response;
                        e.request = request;
                        e.originalMessage = e.message;
                        _a = e;
                        _b = response;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.error(response, true)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a.message = (_b) || e.originalMessage;
                        _c.label = 3;
                    case 3: return [2 /*return*/, e];
                }
            });
        });
    };
    Client.prototype.createRequest = function (init) {
        if (init === void 0) { init = Client._defaultRequestInit; }
        init = __assign(__assign({}, this._defaultRequestInit), init);
        init.headers = init.headers || {};
        // Sanity checks
        if (!init.url)
            throw new Error('Url is not defined');
        if (!init.method)
            init.method = 'GET';
        init.method = init.method.toUpperCase();
        if (init.method && Client._allowedMethods.indexOf(init.method) < 0) {
            throw new Error("Method has wrong value: ".concat(init.method));
        }
        // Defaults
        init.credentials = init.credentials || 'include';
        init.mode = init.mode || 'cors';
        // Append Query String
        if (init.query) {
            init.url = init.url + (init.url.includes('?') ? '&' : '?') + qs.stringify(init.query);
        }
        // Serialize body
        if ((0, is_plain_object_1.default)(init.body) || !init.body) {
            var contentTypeHeaderName = findHeaderName(Client._contentType, init.headers);
            if (!contentTypeHeaderName) {
                contentTypeHeaderName = Client._contentType;
                init.headers[contentTypeHeaderName] = Client._jsonContentType;
            }
            var contentType = init.headers[contentTypeHeaderName];
            // Assign a new encoded body
            if (contentType.includes(Client._jsonContentType)) {
                if ((init.method === 'GET' || init.method === 'HEAD') && !!init.body) {
                    // oddly setting body to null still result in TypeError in phantomjs
                    init.body = undefined;
                }
                else {
                    init.body = JSON.stringify(init.body);
                }
            }
            else if (contentType.includes(Client._urlencodedContentType)) {
                init.body = qs.stringify(init.body);
            }
        }
        // Create a request with encoded body
        var req = new this._externals.Request(init.url, init);
        // Keep the original body accessible directly (for mocks)
        req.originalBody = init.body;
        return req;
    };
    Client.prototype._isContentType = function (contentType, response) {
        return this.getContentType(response).includes(contentType);
    };
    Client.prototype.getContentType = function (response) {
        return response.headers.get(Client._contentType) || '';
    };
    Client.prototype.isMultipart = function (response) {
        return this._isContentType(Client._multipartContentType, response);
    };
    Client.prototype.isJson = function (response) {
        return this._isContentType(Client._jsonContentType, response);
    };
    Client.prototype.toMultipart = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.isMultipart(response) ? this.multipart(response) : [response]];
            });
        });
    };
    Client.prototype.multipart = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var text, boundary, parts, statusInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isMultipart(response))
                            throw new Error('Response is not multipart');
                        return [4 /*yield*/, response.text()];
                    case 1:
                        text = _a.sent();
                        if (!text)
                            throw new Error('No response body');
                        try {
                            boundary = this.getContentType(response).match(/boundary=([^;]+)/i)[1]; //eslint-disable-line
                        }
                        catch (e) {
                            throw new Error('Cannot find boundary');
                        }
                        if (!boundary)
                            throw new Error('Cannot find boundary');
                        parts = text.toString().split(Client._boundarySeparator + boundary);
                        if (parts[0].trim() === '')
                            parts.shift();
                        if (parts[parts.length - 1].trim() === Client._boundarySeparator)
                            parts.pop();
                        if (parts.length < 1)
                            throw new Error('No parts in body');
                        return [4 /*yield*/, this._create(parts.shift(), response.status, response.statusText).json()];
                    case 2:
                        statusInfo = _a.sent();
                        // Step 3. Parse all other parts
                        return [2 /*return*/, parts.map(function (part, i) { return _this._create(part, statusInfo.response[i].status); })];
                }
            });
        });
    };
    /**
     * Method is used to create Response object from string parts of multipart/mixed response
     */
    Client.prototype._create = function (text, status, statusText) {
        if (text === void 0) { text = ''; }
        if (status === void 0) { status = 200; }
        if (statusText === void 0) { statusText = 'OK'; }
        text = text.replace(/\r/g, '');
        var headers = new this._externals.Headers();
        var headersAndBody = text.split(Client._bodySeparator);
        var headersText = headersAndBody.length > 1 ? headersAndBody.shift() : '';
        text = headersAndBody.length > 0 ? headersAndBody.join(Client._bodySeparator) : null;
        (headersText || '').split('\n').forEach(function (header) {
            var split = header.trim().split(Client._headerSeparator);
            var key = split.shift().trim();
            var value = split.join(Client._headerSeparator).trim();
            if (key)
                headers.append(key, value);
        });
        return new this._externals.Response(text, {
            headers: headers,
            status: status,
            statusText: statusText,
        });
    };
    Client.prototype.error = function (response, skipOKCheck) {
        if (skipOKCheck === void 0) { skipOKCheck = false; }
        return __awaiter(this, void 0, void 0, function () {
            var msg, _a, message, error_description, description, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (response.ok && !skipOKCheck)
                            return [2 /*return*/, null];
                        msg = (response.status ? "".concat(response.status, " ") : '') + (response.statusText ? response.statusText : '');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, response.clone().json()];
                    case 2:
                        _a = _b.sent(), message = _a.message, error_description = _a.error_description, description = _a.description;
                        if (message)
                            msg = message;
                        if (error_description)
                            msg = error_description;
                        if (description)
                            msg = description;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: //eslint-disable-line
                    return [2 /*return*/, msg];
                }
            });
        });
    };
    Client.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    Client._contentType = 'Content-Type';
    Client._jsonContentType = 'application/json';
    Client._multipartContentType = 'multipart/mixed';
    Client._urlencodedContentType = 'application/x-www-form-urlencoded';
    Client._headerSeparator = ':';
    Client._bodySeparator = '\n\n';
    Client._boundarySeparator = '--';
    Client._unauthorizedStatus = 401;
    Client._rateLimitStatus = 429;
    Client._allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
    Client._defaultRequestInit = {
        credentials: 'include',
        mode: 'cors',
    };
    return Client;
}(events_1.EventEmitter));
exports.default = Client;
//# sourceMappingURL=Client.js.map