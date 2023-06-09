"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../test/test");
var createResponse = function (sdk, json, status, statusText, headers) {
    var path = "/restapi/v1.0/foo".concat(Date.now());
    (0, test_1.apiCall)('GET', path, json, status, statusText, headers);
    return sdk.platform().get(path);
};
describe('RingCentral.http.Client', function () {
    describe('createRequest', function () {
        it('sets default headers & properties for GET', (0, test_1.asyncTest)(function (sdk) {
            var request = sdk.client().createRequest({ url: 'http://foo/bar', query: { foo: 'foo' } });
            (0, test_1.expect)(request.headers.get('Content-Type')).to.equal('application/json');
            (0, test_1.expect)(request.url).to.equal('http://foo/bar?foo=foo');
            (0, test_1.expect)(request.method).to.equal('GET');
        }));
        it('sets default headers & properties for POST', (0, test_1.asyncTest)(function (sdk) {
            var request = sdk.client().createRequest({ url: 'http://foo/bar', method: 'POST', body: { foo: 'bar' } });
            (0, test_1.expect)(request.headers.get('Content-Type')).to.equal('application/json');
            (0, test_1.expect)(request.url).to.equal('http://foo/bar');
            (0, test_1.expect)(request.method).to.equal('POST');
            (0, test_1.expect)(request['originalBody']).to.equal(JSON.stringify({ foo: 'bar' }));
        }));
        it('validates the method', (0, test_1.asyncTest)(function (sdk) {
            (0, test_1.expect)(function () {
                sdk.client().createRequest({ url: 'http://foo/bar', method: 'foo' });
            }).to.throw();
        }));
    });
    var goodMultipartMixedResponse = '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\r\n' +
        '\r\n' +
        '{\n' +
        '  "response" : [ {\n' +
        '    "status" : 200\n' +
        '  }, {\n' +
        '    "status" : 200\n' +
        '  } ]\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "foo" : "bar"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "baz" : "qux"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248--\n';
    var multipartMixedResponseWithErrorPart = '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "response" : [ {\n' +
        '    "status" : 200\n' +
        '  }, {\n' +
        '    "status" : 404\n' +
        '  }, {\n' +
        '    "status" : 200\n' +
        '  } ]\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "foo" : "bar"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "message" : "object not found"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "baz" : "qux"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248--\n';
    var badMultipartMixedResponse = '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        'THIS IS JUNK AND CANNOT BE PARSED AS JSON\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "foo" : "bar"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248\n' +
        'Content-Type: application/json\n' +
        '\n' +
        '{\n' +
        '  "baz" : "qux"\n' +
        '}\n' +
        '--Boundary_1245_945802293_1394135045248--\n';
    var multipartResponseHeaders = {
        'content-type': 'multipart/mixed; boundary=Boundary_1245_945802293_1394135045248',
    };
    var jsonResponseHeaders = { 'content-type': 'application/json; encoding=utf8' };
    describe('constructor tests', function () {
        it('parses OK headers into object', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, '{}', 200, 'OK', jsonResponseHeaders)];
                    case 1:
                        res = _a.sent();
                        (0, test_1.expect)(sdk.client().isJson(res)).to.equal(true);
                        return [2 /*return*/];
                }
            });
        }); }));
        it('parses Multi-Status headers into object', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, '{}', 207, 'Multi-Status', multipartResponseHeaders)];
                    case 1:
                        res = _a.sent();
                        (0, test_1.expect)(sdk.client().isMultipart(res)).to.equal(true);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('multipart', function () {
        it('calls the success callback after parsing a good multi-part/mixed response', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, goodMultipartMixedResponse, 207, 'Multi-Status', multipartResponseHeaders)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, sdk.client().multipart(res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('calls the success callback for all individual parts that are parsed (including errors)', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res, multipart, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, multipartMixedResponseWithErrorPart, 207, 'Multi-Status', multipartResponseHeaders)];
                    case 1:
                        res = _c.sent();
                        return [4 /*yield*/, sdk.client().multipart(res)];
                    case 2:
                        multipart = _c.sent();
                        (0, test_1.expect)(multipart.length).to.equal(3);
                        _a = test_1.expect;
                        return [4 /*yield*/, multipart[0].json()];
                    case 3:
                        _a.apply(void 0, [(_c.sent()).foo]).to.be.equal('bar');
                        (0, test_1.expect)(multipart[0].status).to.be.equal(200);
                        (0, test_1.expect)(sdk.client().error(multipart[1])).to.be.not.equal(null); //FIXME
                        _b = test_1.expect;
                        return [4 /*yield*/, multipart[2].json()];
                    case 4:
                        _b.apply(void 0, [(_c.sent()).baz]).to.be.equal('qux');
                        (0, test_1.expect)(multipart[2].status).to.be.equal(200);
                        return [2 /*return*/];
                }
            });
        }); }));
        it('calls the error callback if it fails to parse the parts info block', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, badMultipartMixedResponse, 207, 'Multi-Status', multipartResponseHeaders)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sdk.client().multipart(res)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('calls the error callback if it is unable to parse the JSON data, passing the error object', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, 'THIS IS JUNK', 200, 'OK', jsonResponseHeaders)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.json()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('uses the error_description property of the JSON data when there is an error but no message property', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createResponse(sdk, '{"error_description": "ERROR"}', 404, 'Error', jsonResponseHeaders)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 'ERROR')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('uses the description property of the JSON data when there is an error but no message or error_description properties', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createResponse(sdk, '{"description": "ERROR"}', 404, 'Error', jsonResponseHeaders)];
                                    case 1: return [4 /*yield*/, _a.sent()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 'ERROR')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('throws an error when no body', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createResponse(sdk, '', 207, 'Multi-Status', multipartResponseHeaders)];
                                    case 1:
                                        res = _a.sent();
                                        return [4 /*yield*/, sdk.client().multipart(res)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 'No response body')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('throws an error when not multipart', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createResponse(sdk, '', 207, 'Multi-Status', jsonResponseHeaders)];
                                    case 1:
                                        res = _a.sent();
                                        return [4 /*yield*/, sdk.client().multipart(res)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 'Response is not multipart')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        it('throws an error when no boundary', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, test_1.expectThrows)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createResponse(sdk, 'foobarbaz', 207, 'Multi-Status', {
                                            'content-type': 'multipart/mixed',
                                        })];
                                    case 1:
                                        res = _a.sent();
                                        return [4 /*yield*/, sdk.client().multipart(res)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 'Cannot find boundary')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    describe('toMultipart', function () {
        it('returns an array with self if not multipart', (0, test_1.asyncTest)(function (sdk) { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, createResponse(sdk, '{}', 200, 'OK', jsonResponseHeaders)];
                    case 1:
                        res = _b.sent();
                        _a = test_1.expect;
                        return [4 /*yield*/, sdk.client().toMultipart(res)];
                    case 2:
                        _a.apply(void 0, [(_b.sent())[0]]).to.equal(res);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
//# sourceMappingURL=Client-spec.js.map