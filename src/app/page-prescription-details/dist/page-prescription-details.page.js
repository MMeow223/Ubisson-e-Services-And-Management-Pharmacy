"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.PagePrescriptionDetailsPage = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var core_2 = require("@capacitor/core");
var apiHelper_1 = require("../helper/apiHelper");
var card_medication_component_1 = require("../component/card-medication/card-medication.component");
var environment_1 = require("src/environments/environment");
var PagePrescriptionDetailsPage = /** @class */ (function () {
    function PagePrescriptionDetailsPage(route, router) {
        this.route = route;
        this.router = router;
        this.scanResult = '';
    }
    PagePrescriptionDetailsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var navParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiHelper_1.loginHelper('2', 'richardreed', '12345678')];
                    case 1:
                        _a.sent();
                        navParams = history.state.item || '';
                        if (!navParams.startsWith('$Biotective$')) return [3 /*break*/, 3];
                        return [4 /*yield*/, apiHelper_1.authorisedFetch('v1/pharmacist/prescription', 'POST', {
                                prescription: navParams
                            })];
                    case 2:
                        response = _a.sent();
                        console.log(response, response === null || response === void 0 ? void 0 : response.data);
                        if (response == null || (response === null || response === void 0 ? void 0 : response.data) == null) {
                            alert('Invalid QR code');
                            this.router.navigate(['/page-prescription-scan']);
                        }
                        else {
                            this.scanResult = JSON.stringify(response.data);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PagePrescriptionDetailsPage.prototype.generateQuickGuid = function () {
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    };
    PagePrescriptionDetailsPage.prototype.uploadEvidence = function (fileChangeEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var photo, atResponse, access_token, headers, selfLink, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        photo = fileChangeEvent.target.files[0];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, apiHelper_1.authorisedFetch('firebase/token', 'GET')];
                    case 2:
                        atResponse = _a.sent();
                        access_token = atResponse === null || atResponse === void 0 ? void 0 : atResponse.data.access_token;
                        headers = {
                            'Content-Type': photo.type,
                            Authorization: "Bearer " + access_token,
                            'X-Goog-Upload-Header-Content-Type': photo.type,
                            'X-Goog-Upload-Header-Content-Length': photo.size
                        };
                        return [4 /*yield*/, core_2.CapacitorHttp.request({
                                method: 'POST',
                                url: "https://storage.googleapis.com/upload/storage/v1/b/" + environment_1.environment.firebaseProject + "/o?uploadType=media&name=prescription/" + this.generateQuickGuid() + "_" + photo.name,
                                headers: headers,
                                data: photo
                            })];
                    case 3:
                        selfLink = (_a.sent()).data.selfLink;
                        return [4 /*yield*/, apiHelper_1.authorisedFetch('v1/pharmacist/prescription/evidence', 'POST', {
                                id: this.prescription.id,
                                medication_id: this.prescription.medication_id,
                                url: selfLink
                            })];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, selfLink];
                    case 5:
                        error_1 = _a.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PagePrescriptionDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-page-prescription-details',
            templateUrl: './page-prescription-details.page.html',
            styleUrls: ['./page-prescription-details.page.scss'],
            standalone: true,
            imports: [angular_1.IonicModule, common_1.CommonModule, forms_1.FormsModule, card_medication_component_1.CardMedicationComponent]
        })
    ], PagePrescriptionDetailsPage);
    return PagePrescriptionDetailsPage;
}());
exports.PagePrescriptionDetailsPage = PagePrescriptionDetailsPage;
