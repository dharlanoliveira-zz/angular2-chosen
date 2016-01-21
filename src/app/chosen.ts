import {CORE_DIRECTIVES } from 'angular2/common';
import {Component, View, OnInit, OnChanges,  AfterViewInit, OnDestroy, EventEmitter, Inject, ElementRef, Input, Output} from 'angular2/core';

import {Injectable } from 'angular2/core';

import {Directive, Renderer,  Self, forwardRef, Provider} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

export interface ChosenOption {
    value: string | number;
    label: string | number;
    group?: string;
}

export interface ChosenOptionsGroup {
    value: string | number;
    label: string | number;
}

@Component({
    selector: 'chosen',
    template: `
<select  [id]="identifier" class="chosen-select" [multiple]="multiple"  >

	<template [ngIf]="options != null">

		<template [ngIf]="optionsGroups == null">

			<option *ngFor="#option of options" [value]="option.value">{{option.label}}</option>

	    </template>

		<template [ngIf]="optionsGroups != null">

            <template ngFor #option [ngForOf]="options" #i="index">

                <template [ngIf]="option.group == null">

        			<option [value]="option.value">{{option.label}}</option>

			    </template>

			</template>

			<optgroup *ngFor="#group of optionsGroups" label="{{group.label}}">

            <template ngFor #option [ngForOf]="options" #i="index">

                <template [ngIf]="option.group == group.value">

			        <option [value]="option.value">{{option.label}}</option>

			    </template>

			</template>

		    </optgroup>

	</template>

	</template>

</select>
    `,
    directives: [CORE_DIRECTIVES]
})
export class ChosenComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    @Output() change:EventEmitter<any>;

    @Input('disable-search') disableSearch:boolean = true;
    @Input('no-results-text')noResulText:string;
    @Input('placeholder-text-multiple') placeholderTextMultiple:string;
    @Input('placeholder-text-single')  placeholderTextSingle:string;
    @Input('search-contains') searchContains:boolean = false;
    @Input('multiple') multiple:boolean;

    @Input() options:Array<ChosenOption>;
    @Input() optionsGroups:Array<ChosenOptionsGroup>;

    chosenConfig:ChosenOptions = {};

    elementRef:ElementRef;
    selectElement:JQuery;

    constructor(@Inject(ElementRef) elementRef:ElementRef) {
        this.elementRef = elementRef;
        this.change = new EventEmitter();
    }

    ngOnInit() {

        if (this.disableSearch != null) {
            this.chosenConfig.disable_search = this.disableSearch;
        }

        if (this.noResulText != null) {
            this.chosenConfig.no_results_text = this.noResulText;
        }

        if (this.placeholderTextMultiple != null) {
            this.chosenConfig.placeholder_text_multiple = this.placeholderTextMultiple;
        }

        if (this.placeholderTextSingle != null) {
            this.chosenConfig.placeholder_text_single = this.placeholderTextSingle;
        }

        if (this.searchContains != null) {
            this.chosenConfig.search_contains = this.searchContains;
        }
    }

    ngOnChanges(changes) {
        if (this.selectElement != null) {
            this.selectElement.trigger("chosen:updated");
        }
    }

    ngAfterViewInit() {

        var el:any = this.elementRef.nativeElement;
        this.selectElement = $(el).find("select");

        this.selectElement.chosen(this.chosenConfig);

        this.selectElement.on('change', (ev, e) => {
            let values = this.selectElement.val();
            this.change.emit(values);
        });

        this.selectElement.trigger("chosen:updated");
    }

    ngOnDestroy() {
        this.selectElement.chosen('destroy');
    }
}

const CHOSEN_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => ChosenControlValueAccessor), multi: true}
));

@Directive({
    selector: 'chosen[ngControl],chosen[ngFormControl],chosen[ngModel]',
    host: {'(change)': 'onChange($event)', '(blur)': 'onTouched()'},
    bindings: [CHOSEN_VALUE_ACCESSOR]
})
export class ChosenControlValueAccessor implements ControlValueAccessor {

    el:any;

    onChange = (_) => {

    };

    onTouched = () => {

    };

    constructor(private _renderer:Renderer, private _elementRef:ElementRef) {
        this.el = this._elementRef.nativeElement;
    }

    writeValue(value:any):void {
        setTimeout(()=> {
            var selectElement = $(this.el).find("select");
            selectElement.val(value);
            selectElement.trigger('chosen:updated');
        });
    }

    registerOnChange(fn:(_:any) => {}):void {
        this.onChange = fn;
    }

    registerOnTouched(fn:() => {}):void {
        this.onTouched = fn;
    }
}

