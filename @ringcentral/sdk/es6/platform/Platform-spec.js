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
import { apiCall, asyncTest, authentication, expect, expectThrows, logout, spy, tokenRefresh, createSdk, cleanFetchMock, getInitialDiscoveryMockData, getExternalDiscoveryMockData, } from '../test/test';
import { version } from '../core/Constants';
var globalAny = global;
var windowAny = typeof window !== 'undefined' ? window : global;
describe('RingCentral.platform.Platform', function () {
    describe('isTokenValid', function () {
        it('is not authenticated when token has expired', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().accessTokenValid()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); }));
        it('is not authenticated after logout', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logout();
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.logout()];
                    case 1:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().accessTokenValid()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('X-User-Agent', function () {
        it('is added with default value', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, path, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        client = sdk.client();
                        path = "/restapi/v1.0/foo/get";
                        apiCall('get', path, { foo: 'bar' });
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get(path, null)];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('x-user-agent')).to.equal("RCJSSDK/".concat(version));
                        return [2 /*return*/];
                }
            });
        }); }));
        it('is added with app name and version', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, path, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        client = sdk.client();
                        path = "/restapi/v1.0/foo/get";
                        apiCall('get', path, { foo: 'bar' });
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get(path, null)];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('x-user-agent')).have.string('TestApp/1.0.0 ');
                        return [2 /*return*/];
                }
            });
        }); }, {
            appName: 'TestApp',
            appVersion: '1.0.0',
        }));
        it('is added with app name', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, path, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        client = sdk.client();
                        path = "/restapi/v1.0/foo/get";
                        apiCall('get', path, { foo: 'bar' });
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get(path, null)];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('x-user-agent')).have.string('TestApp ');
                        return [2 /*return*/];
                }
            });
        }); }, {
            appName: 'TestApp',
        }));
        it('is added with additional user agent', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, path, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        client = sdk.client();
                        path = "/restapi/v1.0/foo/get";
                        apiCall('get', path, { foo: 'bar' });
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get(path, null)];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('x-user-agent')).have.string(' (build.1000; rev.149f00000)');
                        return [2 /*return*/];
                }
            });
        }); }, {
            additionalUserAgent: '(build.1000; rev.149f00000)',
        }));
        it('is added with app name, version and additional user agent', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, path, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        client = sdk.client();
                        path = "/restapi/v1.0/foo/get";
                        apiCall('get', path, { foo: 'bar' });
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get(path, null)];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('x-user-agent')).have.string('TestApp/1.0.0 ');
                        expect(request.headers.get('x-user-agent')).have.string(' (build.1000; rev.149f00000)');
                        return [2 /*return*/];
                }
            });
        }); }, {
            appName: 'TestApp',
            appVersion: '1.0.0',
            additionalUserAgent: '(build.1000; rev.149f00000)',
        }));
    });
    describe('authorized', function () {
        it('initiates refresh if not authorized', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tokenRefresh();
                        platform = sdk.platform();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 1:
                        _a.apply(void 0, [(_c.sent()).access_token]).to.not.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, platform.loggedIn()];
                    case 3:
                        _c.sent();
                        _b = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 4:
                        _b.apply(void 0, [(_c.sent()).access_token]).to.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('login', function () {
        it('login with code', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _b.sent();
                        authentication();
                        return [4 /*yield*/, platform.login({
                                code: 'foo',
                                access_token_ttl: 100,
                                refresh_token_ttl: 100,
                            })];
                    case 2:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        _a.apply(void 0, [(_b.sent()).access_token]).to.equal('ACCESS_TOKEN');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('login with JWT', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _b.sent();
                        authentication();
                        return [4 /*yield*/, platform.login({
                                jwt: 'foo',
                            })];
                    case 2:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        _a.apply(void 0, [(_b.sent()).access_token]).to.equal('ACCESS_TOKEN');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('login with username/password', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _b.sent();
                        authentication();
                        return [4 /*yield*/, platform.login({
                                username: 'foo',
                                password: 'foo',
                                extension: 'foo',
                            })];
                    case 2:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        _a.apply(void 0, [(_b.sent()).access_token]).to.equal('ACCESS_TOKEN');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('login with code from usePKCE flow without client secret', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _a.sent();
                        platform.loginUrl({ usePKCE: true });
                        authentication();
                        return [4 /*yield*/, platform.login({
                                code: 'foo',
                                access_token_ttl: 100,
                                refresh_token_ttl: 100,
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        authData = _a.sent();
                        expect(authData.access_token).to.equal('ACCESS_TOKEN');
                        expect(authData.code_verifier).not.to.be.empty;
                        return [2 /*return*/];
                }
            });
        }); }, {
            clientSecret: '',
        }));
        it('login with code and code_verifier', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authentication();
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.login({ code: 'test', code_verifier: 'test_code_verifier' })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, platform.auth().data()];
                    case 2:
                        authData = _a.sent();
                        expect(authData.code_verifier).to.equal('test_code_verifier');
                        return [2 /*return*/];
                }
            });
        }); }, {
            clientSecret: '',
        }));
        it('login with code and code_verifier with client secret', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, request, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authentication();
                        platform = sdk.platform();
                        client = sdk.client();
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.login({ code: 'test', code_verifier: 'test_code_verifier' })];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('authorization')).not.to.equal(null);
                        return [4 /*yield*/, platform.auth().data()];
                    case 2:
                        authData = _a.sent();
                        expect(authData.access_token).to.equal('ACCESS_TOKEN');
                        expect(authData.code_verifier).to.equal('test_code_verifier');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('login with code without clientSecret', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, request, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authentication();
                        platform = sdk.platform();
                        client = sdk.client();
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.login({ code: 'test' })];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('authorization')).to.equal(null);
                        expect(request.originalBody || request.body).have.string('client_id=whatever');
                        return [4 /*yield*/, platform.auth().data()];
                    case 2:
                        authData = _a.sent();
                        expect(authData.access_token).to.equal('ACCESS_TOKEN');
                        return [2 /*return*/];
                }
            });
        }); }, {
            clientSecret: '',
        }));
        it('login with access_token', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _b.sent();
                        authentication();
                        return [4 /*yield*/, platform.login({ access_token: 'foo' })];
                    case 2:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        _a.apply(void 0, [(_b.sent()).access_token]).to.equal('foo');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('login error', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _a.sent();
                        apiCall('POST', '/restapi/oauth/token', { message: 'expected' }, 400);
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, platform.login({ code: 'foo' })];
                            }); }); }, 'expected')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('loggedIn', function () {
        it('returns false if refresh failed', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _a.sent();
                        apiCall('POST', '/restapi/oauth/token', { message: 'expected' }, 400);
                        return [4 /*yield*/, platform.loggedIn()];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('sendRequest', function () {
        it('refreshes token when token was expired', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path, refreshSpy, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        refreshSpy = spy(function () { });
                        tokenRefresh();
                        apiCall('GET', path, {});
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 1:
                        _a.apply(void 0, [(_c.sent()).access_token]).to.not.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, platform.on(platform.events.refreshSuccess, refreshSpy).get(path)];
                    case 3:
                        _c.sent();
                        expect(refreshSpy.calledOnce).to.be.true;
                        _b = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 4:
                        _b.apply(void 0, [(_c.sent()).access_token]).to.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('tries to refresh the token if Platform returns 401 Unauthorized and re-executes the request', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path, response, refreshSpy, res, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        response = { foo: 'bar' };
                        refreshSpy = spy(function () {
                            apiCall('GET', path, response, 200);
                        });
                        apiCall('GET', path, { message: 'time not in sync' }, 401, 'Time Not In Sync');
                        tokenRefresh();
                        platform.on(platform.events.refreshSuccess, refreshSpy);
                        return [4 /*yield*/, platform.get(path)];
                    case 1:
                        res = _c.sent();
                        expect(refreshSpy.calledOnce).to.be.true;
                        _a = expect;
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a.apply(void 0, [_c.sent()]).to.deep.equal(response);
                        _b = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        _b.apply(void 0, [(_c.sent()).access_token]).to.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('fails if ajax has status other than 2xx', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        apiCall('GET', path, { description: 'Fail' }, 400, 'Bad Request');
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, platform.get(path)];
                            }); }); }, 'Fail')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('handles rate limit 429', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path, response, rateLimitSpy, res, e, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        response = { foo: 'bar' };
                        rateLimitSpy = spy(function () {
                            apiCall('GET', path, response, 200);
                        });
                        apiCall('GET', path, { message: 'expected' }, 429, 'Rate Limit Exceeded');
                        platform.on(platform.events.rateLimitError, rateLimitSpy);
                        return [4 /*yield*/, platform.get(path, null, { handleRateLimit: 0.01 })];
                    case 1:
                        res = _b.sent();
                        expect(rateLimitSpy.calledOnce).to.be.true;
                        e = rateLimitSpy.getCalls()[0].args[0];
                        expect(e.message).to.equal('expected');
                        expect(e.retryAfter).to.equal(10);
                        _a = expect;
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.deep.equal(response);
                        return [2 /*return*/];
                }
            });
        }); }));
        it('handles default rate limit 429', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path, response, rateLimitSpy, res, e, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        response = { foo: 'bar' };
                        rateLimitSpy = spy(function () {
                            apiCall('GET', path, response, 200);
                        });
                        platform['_handleRateLimit'] = 0.01;
                        apiCall('GET', path, { message: 'expected' }, 429, 'Rate Limit Exceeded');
                        platform.on(platform.events.rateLimitError, rateLimitSpy);
                        return [4 /*yield*/, platform.get(path)];
                    case 1:
                        res = _b.sent();
                        expect(rateLimitSpy.calledOnce).to.be.true;
                        e = rateLimitSpy.getCalls()[0].args[0];
                        expect(e.message).to.equal('expected');
                        expect(e.retryAfter).to.equal(10);
                        _a = expect;
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.deep.equal(response);
                        return [2 /*return*/];
                }
            });
        }); }));
        it('emits rate limit 429 errors if they are not handled', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path, rateLimitSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        rateLimitSpy = spy(function () { });
                        apiCall('GET', path, { message: 'expected' }, 429, 'Rate Limit Exceeded');
                        platform.on(platform.events.rateLimitError, rateLimitSpy);
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, platform.get(path)];
                            }); }); }, '', function (err) {
                                expect(rateLimitSpy.calledOnce).to.be.true;
                                var e = rateLimitSpy.getCalls()[0].args[0];
                                expect(e.message).to.equal('expected');
                                expect(e.retryAfter).to.equal(60000);
                                expect(err).to.equal(e);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('refresh', function () {
        it('handles error in queued AJAX after unsuccessful refresh when token is killed', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, path, successSpy, errorSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        path = '/restapi/xxx';
                        successSpy = spy(function () { });
                        errorSpy = spy(function () { });
                        tokenRefresh(true);
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, platform
                                            .on(platform.events.refreshSuccess, successSpy)
                                            .on(platform.events.refreshError, errorSpy)
                                            .get(path)];
                                });
                            }); }, 'Wrong token')];
                    case 2:
                        _a.sent();
                        expect(errorSpy.calledOnce).to.be.true;
                        expect(successSpy.calledOnce).to.be.false;
                        return [2 /*return*/];
                }
            });
        }); }));
        it('handles subsequent refreshes', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        tokenRefresh();
                        tokenRefresh();
                        tokenRefresh();
                        return [4 /*yield*/, platform.refresh()];
                    case 1:
                        _a.sent(); // first
                        return [4 /*yield*/, platform.refresh()];
                    case 2:
                        _a.sent(); // second
                        return [4 /*yield*/, Promise.all([
                                platform.refresh(),
                                platform.refresh(),
                            ])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('returns error if response is malformed', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        apiCall('POST', '/restapi/oauth/token', {
                            message: 'Wrong token',
                            error_description: 'Wrong token',
                            description: 'Wrong token',
                        }, 240); // This weird status was caught on client's machine
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, platform.refresh()];
                            }); }); }, 'Wrong token', function (e) {
                                expect(e.originalMessage).to.equal('Malformed OAuth response');
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('issues only one refresh request', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, res, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tokenRefresh();
                        apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 });
                        apiCall('GET', '/restapi/v1.0/foo/2', { increment: 2 });
                        apiCall('GET', '/restapi/v1.0/foo/3', { increment: 3 });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _d.sent();
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, Promise.all([
                                platform.get('/restapi/v1.0/foo/1'),
                                platform.get('/restapi/v1.0/foo/2'),
                                platform.get('/restapi/v1.0/foo/3'),
                            ])];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_d.sent()).map(function (r) { return r.json(); })])];
                    case 3:
                        res = _d.sent();
                        _c = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 4:
                        _c.apply(void 0, [(_d.sent()).access_token]).to.equal('ACCESS_TOKEN_FROM_REFRESH');
                        expect(res[0].increment).to.equal(1);
                        expect(res[1].increment).to.equal(2);
                        expect(res[2].increment).to.equal(3);
                        return [2 /*return*/];
                }
            });
        }); }));
        it('not skip auth header when auth data with clientSecret', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, request, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenRefresh();
                        platform = sdk.platform();
                        client = sdk.client();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _b.sent();
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.refresh()];
                    case 2:
                        _b.sent();
                        expect(request.headers.get('authorization')).not.to.equal(null);
                        _a = expect;
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        _a.apply(void 0, [(_b.sent()).access_token]).to.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [2 /*return*/];
                }
            });
        }); }));
        it('skip auth header when auth data without client secret', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, request, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenRefresh();
                        platform = sdk.platform();
                        client = sdk.client();
                        return [4 /*yield*/, platform.auth().cancelAccessToken()];
                    case 1:
                        _a.sent();
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.refresh()];
                    case 2:
                        _a.sent();
                        expect(request.headers.get('authorization')).to.equal(null);
                        expect(request.originalBody || request.body).have.string('client_id=whatever');
                        return [4 /*yield*/, platform.auth().data()];
                    case 3:
                        authData = _a.sent();
                        expect(authData.access_token).to.equal('ACCESS_TOKEN_FROM_REFRESH');
                        return [2 /*return*/];
                }
            });
        }); }, {
            clientSecret: '',
        }));
    });
    describe('get, post, put, patch, delete', function () {
        it('sends request using appropriate method', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, test;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        test = function (method) { return __awaiter(void 0, void 0, void 0, function () {
                            var path, res, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        path = "/restapi/v1.0/foo/".concat(method);
                                        apiCall(method, path, { foo: 'bar' });
                                        return [4 /*yield*/, platform[method](path)];
                                    case 1:
                                        res = _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, res.json()];
                                    case 2:
                                        _a.apply(void 0, [(_b.sent()).foo]).to.equal('bar');
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, test('get')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, test('post')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, test('put')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, test('patch')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, test('delete')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('send request with user agent option', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, path, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        client = sdk.client();
                        path = "/restapi/v1.0/foo/get";
                        apiCall('get', path, { foo: 'bar' });
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get(path, null, { userAgent: 'TestAgent' })];
                    case 1:
                        _a.sent();
                        expect(request.headers.get('x-user-agent')).have.string('TestAgent');
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('createUrl', function () {
        it('builds the URL', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        platform = sdk.platform();
                        expect(platform.createUrl('/restapi/v1.0/foo')).to.equal('/restapi/v1.0/foo');
                        expect(platform.createUrl('/restapi/v1.0/foo', { addServer: true })).to.equal('http://whatever/restapi/v1.0/foo');
                        _a = expect;
                        return [4 /*yield*/, platform.signUrl(platform.createUrl('/restapi/v1.0/foo', {
                                addServer: true,
                            }))];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).to.equal('http://whatever/restapi/v1.0/foo?access_token=ACCESS_TOKEN');
                        _b = expect;
                        return [4 /*yield*/, platform.signUrl(platform.createUrl('/restapi/v1.0/foo?bar', {
                                addServer: true,
                            }))];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).to.equal('http://whatever/restapi/v1.0/foo?bar&access_token=ACCESS_TOKEN');
                        _c = expect;
                        return [4 /*yield*/, platform.signUrl(platform.createUrl('/restapi/v1.0/foo?bar', {
                                addServer: true,
                                addMethod: 'POST',
                            }))];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).to.equal('http://whatever/restapi/v1.0/foo?bar&_method=POST&access_token=ACCESS_TOKEN');
                        _d = expect;
                        return [4 /*yield*/, platform.signUrl(platform.createUrl('/rcvideo/v1/foo?bar', {
                                addServer: true,
                            }))];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).to.equal('http://whatever/rcvideo/v1/foo?bar&access_token=ACCESS_TOKEN');
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('parseLoginRedirect', function () {
        describe('Authorization Code Flow', function () {
            it('parses url correctly', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
                var platform;
                return __generator(this, function (_a) {
                    platform = sdk.platform();
                    expect(platform.parseLoginRedirect('?code=foo')).to.deep.equal({ code: 'foo' });
                    return [2 /*return*/];
                });
            }); }));
        });
        describe('Implicit Grant Flow', function () {
            it('parses url correctly', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
                var platform;
                return __generator(this, function (_a) {
                    platform = sdk.platform();
                    expect(platform.parseLoginRedirect('#access_token=foo')).to.deep.equal({ access_token: 'foo' });
                    return [2 /*return*/];
                });
            }); }));
        });
    });
    describe('loginUrl', function () {
        it('simple usage', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                platform = sdk.platform();
                expect(platform.loginUrl({
                    implicit: true,
                    state: 'foo',
                    brandId: 'foo',
                    display: 'foo',
                    prompt: 'foo',
                })).to.equal('http://whatever/restapi/oauth/authorize?response_type=token&redirect_uri=http%3A%2F%2Ffoo&client_id=whatever&state=foo&brand_id=foo&display=foo&prompt=foo&ui_options=&ui_locales=&localeId=');
                expect(platform.loginUrl({
                    implicit: false,
                    state: 'foo',
                    brandId: 'foo',
                    display: 'foo',
                    prompt: 'foo',
                })).to.equal('http://whatever/restapi/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Ffoo&client_id=whatever&state=foo&brand_id=foo&display=foo&prompt=foo&ui_options=&ui_locales=&localeId=');
                expect(platform.loginUrl({
                    implicit: false,
                })).to.equal('http://whatever/restapi/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Ffoo&client_id=whatever&state=&brand_id=&display=&prompt=&ui_options=&ui_locales=&localeId=');
                expect(platform.loginUrl({
                    usePKCE: true,
                })).to.have.string('code_challenge');
                expect(platform.loginUrl.bind(platform, {
                    implicit: true,
                    usePKCE: true,
                })).to.throw('PKCE only works with Authorization Code Flow');
                expect(platform.loginUrl({
                    implicit: false,
                    uiOptions: ['foo', 'bar'],
                    responseHint: ['baz', 'quux'],
                })).to.equal('http://whatever/restapi/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Ffoo&client_id=whatever&state=&brand_id=&display=&prompt=&ui_options=foo&ui_options=bar&ui_locales=&localeId=&response_hint=baz&response_hint=quux');
                expect(platform.loginUrl({
                    implicit: false,
                    uiOptions: 'foo',
                    responseHint: 'bar',
                })).to.equal('http://whatever/restapi/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Ffoo&client_id=whatever&state=&brand_id=&display=&prompt=&ui_options=foo&ui_locales=&localeId=&response_hint=bar');
                return [2 /*return*/];
            });
        }); }));
    });
    describe('loginWindow', function () {
        var isNode = typeof window !== 'undefined';
        if (!isNode) {
            globalAny.window = {
                screenLeft: 0,
                screenTop: 0,
                location: {
                    origin: '',
                },
            };
            globalAny.screen = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
            globalAny.document = {
                documentElement: {
                    clientWidth: 0,
                    clientHeight: 0,
                },
            };
        }
        window.addEventListener = function (eventName, cb, bubble) {
            windowAny.triggerEvent = function (mock) {
                cb(mock);
            };
        };
        it('simple usage', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, close, focus, openSpy, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        close = spy();
                        focus = spy();
                        openSpy = spy(function () { return ({
                            close: close,
                            focus: focus,
                        }); });
                        window.open = openSpy;
                        window.removeEventListener = spy();
                        setTimeout(function () {
                            windowAny.triggerEvent({ origin: 'bar' });
                            windowAny.triggerEvent({ origin: 'foo', data: { foo: 'bar' } });
                            windowAny.triggerEvent({ origin: 'foo', data: { RCAuthorizationResponse: '#access_token=foo' } });
                        }, 10);
                        return [4 /*yield*/, platform.loginWindow({
                                url: 'foo',
                                origin: 'foo',
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res.access_token).to.equal('foo');
                        expect(close.calledOnce).to.be.true;
                        expect(focus.calledOnce).to.be.true;
                        expect(openSpy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); }));
        it('throws an exception if no code and token', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, openSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        openSpy = spy(function () { return ({ close: spy() }); });
                        window.open = openSpy;
                        setTimeout(function () {
                            windowAny.triggerEvent({ origin: 'foo', data: { RCAuthorizationResponse: '#bar=foo' } });
                        }, 10);
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, platform.loginWindow({
                                                url: 'foo',
                                                origin: 'foo',
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 'No authorization code or token')];
                    case 1:
                        _a.sent();
                        expect(openSpy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); }));
        it('throws an exception if window cannot be open', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, openSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        openSpy = spy(function () { return null; });
                        window.open = openSpy;
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, platform.loginWindow({
                                                url: 'foo',
                                                origin: 'foo',
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 'Could not open login window. Please allow popups for this site')];
                    case 1:
                        _a.sent();
                        expect(openSpy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); }));
        it('throws an exception if window is closed', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, openWindow, openSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        openWindow = { closed: false };
                        openSpy = spy(function () { return openWindow; });
                        window.open = openSpy;
                        setTimeout(function () {
                            openWindow.closed = true;
                        }, 3000);
                        return [4 /*yield*/, expectThrows(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, platform.loginWindow({
                                                url: 'foo',
                                                origin: 'foo',
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 'Login window is closed')];
                    case 1:
                        _a.sent();
                        expect(openSpy.calledOnce).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); }));
        it('login success when call loginWindow twice', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, close, focus, openSpy, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = sdk.platform();
                        close = spy();
                        focus = spy();
                        openSpy = spy(function () { return ({
                            close: close,
                            focus: focus,
                        }); });
                        window.open = openSpy;
                        window.removeEventListener = spy();
                        setTimeout(function () {
                            windowAny.triggerEvent({ origin: 'foo', data: { RCAuthorizationResponse: '#access_token=foo' } });
                        }, 1000);
                        platform.loginWindow({
                            url: 'foo',
                            origin: 'foo',
                        });
                        return [4 /*yield*/, platform.loginWindow({
                                url: 'foo',
                                origin: 'foo',
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res.access_token).to.equal('foo');
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('parseLoginRedirect', function () {
        it('parses redirect URIs with hash', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                platform = sdk.platform();
                expect(platform.parseLoginRedirect('#access_token=foo').access_token).to.equal('foo');
                return [2 /*return*/];
            });
        }); }));
        it('parses redirect URIs with query', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                platform = sdk.platform();
                expect(platform.parseLoginRedirect('?access_token=foo').access_token).to.equal('foo');
                return [2 /*return*/];
            });
        }); }));
        it('parses redirect URIs with errors', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                platform = sdk.platform();
                expect(function () {
                    platform.parseLoginRedirect('?error_description=foo');
                }).to.throw('foo');
                expect(function () {
                    platform.parseLoginRedirect('?error=foo');
                }).to.throw('foo');
                expect(function () {
                    platform.parseLoginRedirect('xxx');
                }).to.throw('Unable to parse response');
                return [2 /*return*/];
            });
        }); }));
    });
    describe('logout', function () {
        it('should skip auth header when auth without client secret', asyncTest(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var platform, client, request, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logout();
                        platform = sdk.platform();
                        client = sdk.client();
                        return [4 /*yield*/, platform.auth().setData({
                                code_verifier: '1212121',
                            })];
                    case 1:
                        _b.sent();
                        client.on(client.events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.logout()];
                    case 2:
                        _b.sent();
                        expect(request.headers.get('authorization')).to.equal(null);
                        expect(request.originalBody || request.body).have.string('client_id=whatever');
                        _a = expect;
                        return [4 /*yield*/, platform.auth().accessTokenValid()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); }, { clientSecret: '' }));
    });
    describe('discovery initial', function () {
        var sdk;
        beforeEach(function () {
            cleanFetchMock();
        });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sdk.cache().clean()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch initial discovery and set auth endpoint on init', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, platform, loginUrl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        if (!platform.discoveryInitPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, platform.discoveryInitPromise];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        loginUrl = platform.loginUrl();
                        expect(loginUrl.indexOf(initialDiscoveryData.authApi.authorizationUri)).to.equal(0);
                        expect(loginUrl.indexOf('discovery=true') > -1).to.equal(true);
                        _a = expect;
                        return [4 /*yield*/, platform.discovery().initialData()];
                    case 3:
                        _a.apply(void 0, [(_b.sent()).discoveryApi.defaultExternalUri]).to.equal(initialDiscoveryData.discoveryApi.defaultExternalUri);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error when client id is blank', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, platform, error, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        sdk = createSdk({
                            enableDiscovery: true,
                            discoveryServer: 'http://whatever',
                            discoveryAutoInit: false,
                            server: '',
                            clientId: '',
                        });
                        platform = sdk.platform();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, platform.initDiscovery()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        error = e_1;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(error.message).to.equal('Client Id is required for discovery');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit initialFetchError error after 3 retry', function () {
            return __awaiter(this, void 0, void 0, function () {
                var sdk, platform, requestErrorSpy, e_2, discovery, loginUrlError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(20000);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                            platform = sdk.platform();
                            requestErrorSpy = spy(function () { });
                            sdk.client().on(sdk.client().events.requestError, requestErrorSpy);
                            if (!platform.discoveryInitPromise) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, platform.discoveryInitPromise];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            discovery = platform.discovery();
                            expect(discovery.initialized).to.equal(false);
                            expect(requestErrorSpy.calledThrice).to.equal(true);
                            loginUrlError = false;
                            try {
                                platform.loginUrl();
                            }
                            catch (e) {
                                loginUrlError = true;
                            }
                            expect(loginUrlError).to.equal(true);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('should fetch initial discovery on loginUrlWithDiscovery', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, sdk, platform, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        _a = expect;
                        return [4 /*yield*/, platform.loginUrlWithDiscovery()];
                    case 1:
                        _a.apply(void 0, [(_b.sent()).indexOf(initialDiscoveryData.authApi.authorizationUri)]).to.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not throw error when fetch initial discovery error with cache data on loginUrlWithDiscovery', function () {
            return __awaiter(this, void 0, void 0, function () {
                var initialDiscoveryData, sdk, platform, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.timeout(20000);
                            initialDiscoveryData = getInitialDiscoveryMockData();
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                            sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                            platform = sdk.platform();
                            if (!platform.discoveryInitPromise) return [3 /*break*/, 2];
                            return [4 /*yield*/, platform.discoveryInitPromise];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            _a = expect;
                            return [4 /*yield*/, platform.loginUrlWithDiscovery()];
                        case 3:
                            _a.apply(void 0, [(_b.sent()).indexOf(initialDiscoveryData.authApi.authorizationUri)]).to.equal(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('should throw error when fetch initial discovery error without cache data on loginUrlWithDiscovery', function () {
            return __awaiter(this, void 0, void 0, function () {
                var initialDiscoveryData, sdk, platform, error, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(20000);
                            initialDiscoveryData = getInitialDiscoveryMockData();
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                            sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                            platform = sdk.platform();
                            if (!platform.discoveryInitPromise) return [3 /*break*/, 2];
                            return [4 /*yield*/, platform.discoveryInitPromise];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, platform.discovery().removeInitialData()];
                        case 3:
                            _a.sent();
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', { description: 'Fail' }, 500);
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, platform.loginUrlWithDiscovery()];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            e_3 = _a.sent();
                            error = e_3;
                            return [3 /*break*/, 7];
                        case 7:
                            expect(!!error).to.equal(true);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('should fetch external discovery when login with discovery_uri and token_uri', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData, sdk, platform, externalData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, platform.discovery().externalData()];
                    case 2:
                        externalData = _b.sent();
                        expect(externalData.coreApi.baseUri).to.equal(externalDiscoveryData.coreApi.baseUri);
                        _a = expect;
                        return [4 /*yield*/, platform.discovery().externalDataExpired()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch external discovery when login with discovery_uri and token_uri when discoveryInitPromise finished', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData, sdk, platform, externalData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, platform.discovery().externalData()];
                    case 2:
                        externalData = _b.sent();
                        expect(externalData.coreApi.baseUri).to.equal(externalDiscoveryData.coreApi.baseUri);
                        _a = expect;
                        return [4 /*yield*/, platform.discovery().externalDataExpired()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch external discovery when login without discovery_uri and token_uri', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData, sdk, platform, externalData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.login({ code: 'whatever' })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, platform.discovery().externalData()];
                    case 2:
                        externalData = _b.sent();
                        expect(externalData.coreApi.baseUri).to.equal(externalDiscoveryData.coreApi.baseUri);
                        _a = expect;
                        return [4 /*yield*/, platform.discovery().externalDataExpired()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not be expired when not expireIn in external discovery data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var externalDiscoveryData, initialDiscoveryData, sdk, platform, externalData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        delete externalDiscoveryData.expiresIn;
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, platform.discovery().externalData()];
                    case 2:
                        externalData = _b.sent();
                        expect(externalData.coreApi.baseUri).to.equal(externalDiscoveryData.coreApi.baseUri);
                        _a = expect;
                        return [4 /*yield*/, platform.discovery().externalDataExpired()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch external discovery fail with 3 retry', function () {
            return __awaiter(this, void 0, void 0, function () {
                var initialDiscoveryData, sdk, platform, clientFetchErrorSpy, hasError, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(20000);
                            initialDiscoveryData = getInitialDiscoveryMockData();
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                            apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                            apiCall('GET', '/.well-known/entry-points/external', null, 500);
                            apiCall('GET', '/.well-known/entry-points/external', null, 500);
                            apiCall('GET', '/.well-known/entry-points/external', null, 500);
                            authentication();
                            sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                            platform = sdk.platform();
                            clientFetchErrorSpy = spy(function () { });
                            sdk.client().on(sdk.client().events.requestError, clientFetchErrorSpy);
                            hasError = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, platform.login({
                                    code: 'whatever',
                                    discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                    token_uri: 'http://whatever/restapi/oauth/token',
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_4 = _a.sent();
                            hasError = true;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(hasError).to.equal(true);
                            expect(clientFetchErrorSpy.calledThrice).to.equal(true);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('should fetch discovery if user has logged before discovery enabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            var noDiscoverySdk, initialDiscoveryData, externalDiscoveryData, withDiscoverySDK, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authentication();
                        noDiscoverySdk = createSdk();
                        return [4 /*yield*/, noDiscoverySdk.platform().login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 1:
                        _a.sent();
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        withDiscoverySDK = createSdk({
                            enableDiscovery: true,
                            discoveryServer: 'http://whatever',
                            server: '',
                            localStorage: noDiscoverySdk.externals().localStorage,
                        });
                        apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 });
                        return [4 /*yield*/, withDiscoverySDK.get('/restapi/v1.0/foo/1')];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        expect(data.increment).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('API request with discovery', function () {
        var platform;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData, sdk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        // mock
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch api request successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 });
                        return [4 /*yield*/, platform.get('/restapi/v1.0/foo/1')];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        expect(data.increment).to.equal(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fetch rcv api request successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCall('GET', '/rcvideo/v1/bridges', { id: 123 });
                        return [4 /*yield*/, platform.get('/rcvideo/v1/bridges')];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        expect(data.id).to.equal(123);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should refresh token successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var noErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenRefresh();
                        noErrors = true;
                        return [4 /*yield*/, platform.refresh()];
                    case 1:
                        _a.sent();
                        expect(noErrors).to.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should logout successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, noErrors, loginUrl, initialData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        logout();
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        initialDiscoveryData.authApi.authorizationUri = 'http://whatever1/restapi/oauth/authorize';
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        noErrors = true;
                        return [4 /*yield*/, platform.logout()];
                    case 1:
                        _a.sent();
                        expect(noErrors).to.equal(true);
                        return [4 /*yield*/, platform.loginUrlWithDiscovery()];
                    case 2:
                        loginUrl = _a.sent();
                        return [4 /*yield*/, platform.discovery().initialData()];
                    case 3:
                        initialData = _a.sent();
                        expect(initialData.authApi.authorizationUri).to.equal(initialDiscoveryData.authApi.authorizationUri);
                        expect(loginUrl.indexOf(initialDiscoveryData.authApi.authorizationUri)).to.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should init discovery when logout error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, hasError, e_5, initialData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        logout(404);
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        initialDiscoveryData.authApi.authorizationUri = 'http://whatever1/restapi/oauth/authorize';
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        hasError = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, platform.logout()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        hasError = true;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(hasError).to.equal(true);
                        if (!platform.discoveryInitPromise) return [3 /*break*/, 6];
                        return [4 /*yield*/, platform.discoveryInitPromise];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, platform.discovery().initialData()];
                    case 7:
                        initialData = _a.sent();
                        expect(initialData.authApi.authorizationUri).to.equal(initialDiscoveryData.authApi.authorizationUri);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should login successfully after logout', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData, noErrors, externalData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        logout();
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        initialDiscoveryData.authApi.authorizationUri = 'http://whatever1/restapi/oauth/authorize';
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        return [4 /*yield*/, platform.logout()];
                    case 1:
                        _a.sent();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        noErrors = true;
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 2:
                        _a.sent();
                        expect(noErrors).to.equal(true);
                        return [4 /*yield*/, platform.discovery().externalData()];
                    case 3:
                        externalData = _a.sent();
                        expect(externalData.coreApi.baseUri).to.equal(externalDiscoveryData.coreApi.baseUri);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should trigger refresh external discovery data when Discovery-Required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var externalDiscoveryData, res, discovery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 }, 200, 'OK', {
                            'Discovery-Required': 1,
                            'Access-Control-Expose-Headers': 'Discovery-Required',
                        });
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        externalDiscoveryData.version = '1.0.1';
                        // mock
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        return [4 /*yield*/, platform.get('/restapi/v1.0/foo/1')];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a.sent();
                        if (!platform.discovery().refreshingExternalData) return [3 /*break*/, 4];
                        return [4 /*yield*/, platform.discovery().refreshExternalData()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, platform.discovery().externalData()];
                    case 5:
                        discovery = _a.sent();
                        expect(discovery.version).to.equal(externalDiscoveryData.version);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should trigger refresh external discovery data when external data removed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var externalDiscoveryData, res, discovery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 }, 200, 'OK');
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        externalDiscoveryData.version = '1.0.1';
                        // mock
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        return [4 /*yield*/, platform.discovery().removeExternalData()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, platform.get('/restapi/v1.0/foo/1')];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        _a.sent();
                        if (!platform.discovery().refreshingExternalData) return [3 /*break*/, 5];
                        return [4 /*yield*/, platform.discovery().refreshExternalData()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, platform.discovery().externalData()];
                    case 6:
                        discovery = _a.sent();
                        expect(discovery.version).to.equal(externalDiscoveryData.version);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not throw error when refresh error and start retry cycle', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, discovery;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(20000);
                            apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 }, 200, 'OK', {
                                'Discovery-Required': 1,
                                'Access-Control-Expose-Headers': 'Discovery-Required',
                            });
                            // mock
                            apiCall('GET', '/.well-known/entry-points/external', null, 500);
                            apiCall('GET', '/.well-known/entry-points/external', null, 500);
                            apiCall('GET', '/.well-known/entry-points/external', null, 500);
                            return [4 /*yield*/, platform.get('/restapi/v1.0/foo/1')];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 2:
                            _a.sent();
                            if (!platform.discovery().refreshingExternalData) return [3 /*break*/, 4];
                            return [4 /*yield*/, platform.discovery().refreshExternalData()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [4 /*yield*/, platform.discovery().externalData()];
                        case 5:
                            discovery = _a.sent();
                            expect(discovery.version).to.equal('1.0.0');
                            expect(platform.discovery().externalRetryCycleScheduled).to.equal(true);
                            platform.discovery().cancelExternalRetryCycleTimeout();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('Init discovery with clearCacheOnRefreshError flag ', function () {
        var platform;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData, sdk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        // mock
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData);
                        authentication();
                        sdk = createSdk({
                            enableDiscovery: true,
                            discoveryServer: 'http://whatever',
                            server: '',
                            clearCacheOnRefreshError: true,
                        });
                        platform = sdk.platform();
                        if (!platform.discoveryInitPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, platform.discoveryInitPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        it('should init discovery when login error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, hasError, e_6, initialData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        authentication(502);
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        initialDiscoveryData.authApi.authorizationUri = 'http://whatever1/restapi/oauth/authorize';
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        hasError = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        hasError = true;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(hasError).to.equal(true);
                        if (!platform.discoveryInitPromise) return [3 /*break*/, 6];
                        return [4 /*yield*/, platform.discoveryInitPromise];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, platform.discovery().initialData()];
                    case 7:
                        initialData = _a.sent();
                        expect(initialData.authApi.authorizationUri).to.equal(initialDiscoveryData.authApi.authorizationUri);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should init discovery when refresh error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, hasError, e_7, initialData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authentication();
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 1:
                        _a.sent();
                        cleanFetchMock();
                        tokenRefresh(true);
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        initialDiscoveryData.authApi.authorizationUri = 'http://whatever1/restapi/oauth/authorize';
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        hasError = false;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, platform.refresh()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_7 = _a.sent();
                        hasError = true;
                        return [3 /*break*/, 5];
                    case 5:
                        expect(hasError).to.equal(true);
                        if (!platform.discoveryInitPromise) return [3 /*break*/, 7];
                        return [4 /*yield*/, platform.discoveryInitPromise];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, platform.discovery().initialData()];
                    case 8:
                        initialData = _a.sent();
                        expect(initialData.authApi.authorizationUri).to.equal(initialDiscoveryData.authApi.authorizationUri);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('API request with discovery tag', function () {
        var platform;
        var sdk;
        var discoveryTag = '123312121';
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDiscoveryData, externalDiscoveryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanFetchMock();
                        initialDiscoveryData = getInitialDiscoveryMockData();
                        externalDiscoveryData = getExternalDiscoveryMockData();
                        // mock
                        apiCall('GET', '/.well-known/entry-points/initial?clientId=whatever', initialDiscoveryData);
                        apiCall('GET', '/.well-known/entry-points/external', externalDiscoveryData, 200, 'OK', {
                            'Discovery-Tag': discoveryTag,
                        });
                        authentication();
                        sdk = createSdk({ enableDiscovery: true, discoveryServer: 'http://whatever', server: '' });
                        platform = sdk.platform();
                        return [4 /*yield*/, platform.discovery().init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, platform.login({
                                code: 'whatever',
                                discovery_uri: 'http://whatever/.well-known/entry-points/external',
                                token_uri: 'http://whatever/restapi/oauth/token',
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should save tag in external discovery data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var externalData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.discovery().externalData()];
                    case 1:
                        externalData = _a.sent();
                        expect(externalData.tag).to.equal(discoveryTag);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should send Discovery-Tag header in api request', function () { return __awaiter(void 0, void 0, void 0, function () {
            var request, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiCall('GET', '/restapi/v1.0/foo/1', { increment: 1 });
                        sdk.client().on(sdk.client().events.requestSuccess, function (_, r) {
                            request = r;
                        });
                        return [4 /*yield*/, platform.get('/restapi/v1.0/foo/1')];
                    case 1:
                        res = _a.sent();
                        expect(request.headers.get('discovery-tag')).to.equal(discoveryTag);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=Platform-spec.js.map