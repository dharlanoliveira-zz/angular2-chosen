import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {ChosenOption} from "./chosen";
import {ChosenOptionsGroup} from "./chosen";
import {Chosen} from "./chosen";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    directives: [CORE_DIRECTIVES, Chosen]
})
export class App {

    options:Array<ChosenOption> = null;

    selectedOptions = null;

    // Example 2
    groupOptions:Array<ChosenOption> = null;

    groups:Array<ChosenOptionsGroup> = null;

    groupSelectedOptions = null;

    // example 3
    groupSelectedOptions2 = "fr";

    constructor() {

        // Example 1 (async ref data before async data)
        setTimeout(() => {
            this.options = [{value: "fr", label: "France"}, {value: "uk", "label": "United Kingdom"}, {
                value: "us",
                "label": "USA"
            }];

        }, 100);

        setTimeout(() => {
            this.selectedOptions = ["fr"];
        }, 200);


        // Example 2 (async data before async ref data)
        setTimeout(() => {
            this.groupOptions = [{value: "fr", label: "France", group: "eu"},
                {value: "uk", label: "United Kingdom", group: "eu"},
                {value: "us", label: "USA", group: "america"},
                {value: "tn", label: "Tunisia", group: "africa"}];

            this.groups = [{label: "Europe", value: "eu"}, {label: "Africa", value: "africa"}, {
                label: "America",
                value: "america"
            }];
        }, 200);

        setTimeout(() => {
            this.groupSelectedOptions = ["tn"];
        }, 100);

        // Example 3 (sync data before ref data)
        this.groupSelectedOptions2 = "fr";

    }
}



