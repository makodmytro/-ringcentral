"use strict";
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
exports.SDK = exports.setDefaultExternals = exports.Externals = exports.Cache = void 0;
var events_1 = require("events");
var Cache_1 = __importDefault(require("./core/Cache"));
exports.Cache = Cache_1.default;
var Externals_1 = __importDefault(require("./core/Externals"));
exports.Externals = Externals_1.default;
var Constants = __importStar(require("./core/Constants"));
var Client_1 = __importDefault(require("./http/Client"));
var Platform_1 = __importDefault(require("./platform/Platform"));
var defaultExternals = {};
var setDefaultExternals = function (externals) { return (defaultExternals = externals); };
exports.setDefaultExternals = setDefaultExternals;
var SDK = /** @class */ (function () {
    function SDK(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        /* istanbul ignore next */
        this.send = function (options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().send(options)];
        }); }); };
        /* istanbul ignore next */
        this.get = function (url, query, options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().send(__assign({ method: 'GET', url: url, query: query }, options))];
        }); }); };
        /* istanbul ignore next */
        this.post = function (url, body, query, options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().send(__assign({ method: 'POST', url: url, query: query, body: body }, options))];
        }); }); };
        /* istanbul ignore next */
        this.put = function (url, body, query, options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().send(__assign({ method: 'PUT', url: url, query: query, body: body }, options))];
        }); }); };
        /* istanbul ignore next */
        this.patch = function (url, body, query, options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().send(__assign({ method: 'PATCH', url: url, query: query, body: body }, options))];
        }); }); };
        /* istanbul ignore next */
        this.delete = function (url, query, options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().send(__assign({ method: 'DELETE', url: url, query: query }, options))];
        }); }); };
        /* istanbul ignore next */
        this.login = function (options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().login(options)];
        }); }); };
        /* istanbul ignore next */
        this.ensureLoggedIn = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().ensureLoggedIn()];
        }); }); };
        /* istanbul ignore next */
        this.loginUrl = function (options) { return _this.platform().loginUrl(options); };
        /* istanbul ignore next */
        this.createUrl = function (path, options) { return _this.platform().createUrl(path, options); };
        /* istanbul ignore next */
        this.signUrl = function (path) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().signUrl(path)];
        }); }); };
        /* istanbul ignore next */
        this.parseLoginRedirect = function (url) { return _this.platform().parseLoginRedirect(url); };
        /* istanbul ignore next */
        this.logout = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().logout()];
        }); }); };
        /* istanbul ignore next */
        this.loginWindow = function (options) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().loginWindow(options)];
        }); }); };
        /* istanbul ignore next */
        this.refresh = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.platform().refresh()];
        }); }); };
        /* istanbul ignore next */
        this.multipart = function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.client().multipart(response)];
        }); }); };
        /* istanbul ignore next */
        this.getContentType = function (response) { return _this.client().getContentType(response); };
        /* istanbul ignore next */
        this.isMultipart = function (response) { return _this.client().isMultipart(response); };
        /* istanbul ignore next */
        this.isJson = function (response) { return _this.client().isJson(response); };
        /* istanbul ignore next */
        this.error = function (response) { return _this.client().error(response); };
        var cachePrefix = options.cachePrefix, defaultRequestInit = options.defaultRequestInit, handleRateLimit = options.handleRateLimit;
        this._externals = new Externals_1.default(__assign(__assign({}, defaultExternals), options));
        this._cache = new Cache_1.default({
            externals: this._externals,
            prefix: cachePrefix,
        });
        this._client = new Client_1.default({
            externals: this._externals,
            defaultRequestInit: defaultRequestInit,
        });
        this._platform = new Platform_1.default(__assign(__assign({}, options), { externals: this._externals, client: this._client, cache: this._cache, handleRateLimit: handleRateLimit }));
    }
    SDK.handleLoginRedirect = function (origin, win) {
        win = win || window;
        var response = win.location.search ? win.location.search : win.location.hash;
        var msg = {};
        msg[Constants.authResponseProperty] = response;
        win.opener.postMessage(msg, origin || win.location.origin);
    };
    SDK.prototype.platform = function () {
        return this._platform;
    };
    SDK.prototype.client = function () {
        return this._client;
    };
    SDK.prototype.cache = function () {
        return this._cache;
    };
    SDK.prototype.externals = function () {
        return this._externals;
    };
    SDK.version = Constants.version;
    SDK.EventEmitter = events_1.EventEmitter;
    SDK.server = {
        sandbox: 'https://platform.devtest.ringcentral.com',
        production: 'https://platform.ringcentral.com',
    };
    return SDK;
}());
exports.SDK = SDK;
exports.default = SDK;
//# sourceMappingURL=SDK.js.map