"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@jsonforms/core");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var base_renderer_1 = require("./base.renderer");
var JsonFormsControl = /** @class */ (function (_super) {
    __extends(JsonFormsControl, _super);
    function JsonFormsControl(ngRedux) {
        var _this = _super.call(this) || this;
        _this.ngRedux = ngRedux;
        _this.getEventValue = function (event) { return event.value; };
        _this.validator = function (_c) {
            return _this.error ? { error: _this.error } : null;
        };
        _this.form = new forms_1.FormControl({
            value: '',
            disabled: true
        }, {
            updateOn: 'change',
            validators: _this.validator.bind(_this)
        });
        return _this;
    }
    JsonFormsControl.prototype.onChange = function (ev) {
        var _this = this;
        var path = core_1.composeWithUi(this.uischema, this.path);
        this.ngRedux.dispatch(core_1.Actions.update(path, function () { return _this.getEventValue(ev); }));
        this.triggerValidation();
    };
    JsonFormsControl.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.ngRedux
            .select()
            .subscribe(function (state) {
            var props = _this.mapToProps(state);
            var data = props.data, enabled = props.enabled, errors = props.errors, label = props.label, required = props.required, schema = props.schema, uischema = props.uischema, visible = props.visible;
            _this.label = core_1.computeLabel(core_1.isPlainLabel(label) ? label : label.default, required);
            _this.data = data;
            _this.error = errors ? errors.join('\n') : null;
            _this.enabled = enabled;
            _this.enabled ? _this.form.enable() : _this.form.disable();
            _this.hidden = !visible;
            _this.scopedSchema = core_1.Resolve.schema(schema, uischema.scope);
            _this.description =
                _this.scopedSchema !== undefined ? _this.scopedSchema.description : '';
            _this.id = props.id;
            _this.form.setValue(data);
            _this.mapAdditionalProps(props);
        });
        this.triggerValidation();
    };
    // @ts-ignore
    JsonFormsControl.prototype.mapAdditionalProps = function (props) {
        // do nothing by default
    };
    JsonFormsControl.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    JsonFormsControl.prototype.getOwnProps = function () {
        var props = {
            uischema: this.uischema,
            schema: this.schema,
            path: this.path,
            id: this.id
        };
        if (this.disabled !== undefined) {
            props.enabled = !this.disabled;
        }
        if (this.visible !== undefined) {
            props.visible = this.visible;
        }
        return props;
    };
    JsonFormsControl.prototype.mapToProps = function (state) {
        var props = core_1.mapStateToControlProps(state, this.getOwnProps());
        var dispatch = core_1.mapDispatchToControlProps(this.ngRedux.dispatch);
        return __assign({}, props, dispatch);
    };
    JsonFormsControl.prototype.triggerValidation = function () {
        // these cause the correct update of the error underline, seems to be
        // related to ionic-team/ionic#11640
        this.form.markAsTouched();
        this.form.updateValueAndValidity();
    };
    __decorate([
        core_2.Input(),
        __metadata("design:type", String)
    ], JsonFormsControl.prototype, "id", void 0);
    __decorate([
        core_2.Input(),
        __metadata("design:type", Boolean)
    ], JsonFormsControl.prototype, "disabled", void 0);
    __decorate([
        core_2.Input(),
        __metadata("design:type", Boolean)
    ], JsonFormsControl.prototype, "visible", void 0);
    return JsonFormsControl;
}(base_renderer_1.JsonFormsBaseRenderer));
exports.JsonFormsControl = JsonFormsControl;
//# sourceMappingURL=control.js.map