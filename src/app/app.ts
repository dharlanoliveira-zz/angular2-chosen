import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {ChosenOption} from "./chosen";
import {ChosenComponent} from "./chosen";
import {ChosenControlValueAccessor} from "./chosen";
import {ChosenOptionsGroup} from "./chosen";


@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [CORE_DIRECTIVES, ChosenComponent, ChosenControlValueAccessor]
})
export class App {


    // Example 1
    options:Array<ChosenOption> = [{value: "fr", label: "France"}, {value: "uk", "label": "United Kingdom"}, {value: "us", "label": "USA"}];

    selectedOptions = ["fr"];


    // Example 2
    groupOptions:Array<ChosenOption> = [{value: "fr", label: "France", group: "eu"}, {
        "value": "uk",
        "label": "United Kingdom",
        group: "eu"
    }, {value: "us", label: "USA", group: "america"}, {value: "tn", label: "Tunisia", group: "africa"}];

    groups:Array<ChosenOptionsGroup> = [{label: "Europe", value: "eu"}, {label: "Africa", value: "africa"}, {label: "America", value: "america"}];

    groupSelectedOptions = ["tn"];

    constructor() {

    }

}



