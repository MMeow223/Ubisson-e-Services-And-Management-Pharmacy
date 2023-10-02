"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardMedicationComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var CardMedicationComponent = /** @class */ (function () {
    function CardMedicationComponent() {
        // @Input() url: any;
        this.checked = false;
        this.isHidden = true;
    }
    CardMedicationComponent.prototype.ngOnInit = function () {
        this.medication_name = 'Paracetamol';
        this.disp = 'Dispense';
        this.sig = 'Sig';
    };
    CardMedicationComponent.prototype.markAsDone = function (event) {
        this.isHidden = !this.isHidden;
    };
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "image");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "description");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "checked");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "medication_name");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "disp");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "sig");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "refill");
    __decorate([
        core_1.Input()
    ], CardMedicationComponent.prototype, "isHidden");
    CardMedicationComponent = __decorate([
        core_1.Component({
            selector: 'app-card-medication',
            templateUrl: './card-medication.component.html',
            styleUrls: ['./card-medication.component.scss'],
            standalone: true,
            imports: [common_1.CommonModule, angular_1.IonicModule]
        })
    ], CardMedicationComponent);
    return CardMedicationComponent;
}());
exports.CardMedicationComponent = CardMedicationComponent;
