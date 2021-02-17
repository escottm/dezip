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
import Convert from 'xml-js';
import { ZIP } from './constants#nocommit';
//  initialize logger
//  **comment out** the next 2 lines if you don't have "clog"
//import {clog} from '../clog'
//clog( null, 'ZIP');
// uncomment the next line if you have "clog"
var clog = function () {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i] = arguments[_i];
    }
    return console.log(stuff);
};
export var ZIP5_PATTERN = /^(\d\d\d\d\d)$/;
//  requires a USPS USERID and URI, supplied here by importing ./constants#nocommit
var zipApiZip5 = function (zip) { return '<Zip5>' + zip + '</Zip5>'; };
var zipApiQvars = function (zip) {
    return 'API=CityStateLookup&' +
        ("XML=<CityStateLookupRequest USERID=\"" + ZIP.ZIP_API_ID + "\">") +
        ("<ZipCode ID='0'>" + zipApiZip5(zip) + "</ZipCode>") +
        '</CityStateLookupRequest>';
};
var zipApiUrl = function (zip) { return ZIP.ZIP_API_BASEURL + "?" + zipApiQvars(zip); };
;
export function deZip(zip) {
    return __awaiter(this, void 0, void 0, function () {
        var url, fetchOpts, result, xmlResponse, response, zErr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = zipApiUrl(zip);
                    if (!url) {
                        clog('!!Error: no API. Is the .env file missing?');
                        return [2 /*return*/, ({ city: 'no_api', state: 'no_api' })];
                    }
                    fetchOpts = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'text/plain'
                        },
                        mode: "cors"
                    };
                    return [4 /*yield*/, fetch(url, fetchOpts)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.text()];
                case 2:
                    xmlResponse = _a.sent();
                    if (!xmlResponse) {
                        clog('Error: no xmlResponse');
                        return [2 /*return*/, ({ city: 'not_found', state: 'not_found' })];
                    }
                    clog('xmlResponse:\n' + xmlResponse);
                    response = Convert.xml2js(xmlResponse, { compact: true });
                    clog('Response: \n' + JSON.stringify(response));
                    zErr = response.CityStateLookupResponse.ZipCode.Error;
                    if (zErr) {
                        clog('!!Error: ' + zErr.Description._text);
                        return [2 /*return*/, ({ city: '', state: '', error: zErr.Description._text })];
                    }
                    return [2 /*return*/, ({ city: response.CityStateLookupResponse.ZipCode.City._text,
                            state: response.CityStateLookupResponse.ZipCode.State._text })];
            }
        });
    });
}
