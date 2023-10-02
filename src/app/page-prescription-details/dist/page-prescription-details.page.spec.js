"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var page_prescription_details_page_1 = require("./page-prescription-details.page");
describe('PagePrescriptionDetailsPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        fixture = testing_1.TestBed.createComponent(page_prescription_details_page_1.PagePrescriptionDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
