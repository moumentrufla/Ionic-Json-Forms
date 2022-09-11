import { ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { JsonFormsState, OwnPropsOfRenderer, UISchemaElement } from '@jsonforms/core';
import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/map';
import { JsonFormsBaseRenderer } from './base.renderer';
export declare class JsonFormsOutlet extends JsonFormsBaseRenderer<UISchemaElement> implements OnInit, OnDestroy {
    private viewContainerRef;
    private componentFactoryResolver;
    private ngRedux;
    private subscription;
    private currentComponentRef;
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver, ngRedux: NgRedux<any>);
    renderProps: OwnPropsOfRenderer;
    ngOnInit(): void;
    update(state: JsonFormsState): void;
    ngOnDestroy(): void;
}
