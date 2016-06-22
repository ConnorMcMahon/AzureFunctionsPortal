import {Component, Input, Inject, ElementRef} from '@angular/core';
import {PopOverComponent} from './pop-over.component';
import {UtilitiesService} from '../services/utilities.service';

@Component({
    selector: 'copy-input',
    templateUrl: 'templates/copy-input.component.html',
    styleUrls: ['styles/copy-input.style.css'],
    directives: [PopOverComponent]
})

export class CopyInputComponent {
    @Input() selectOnClick: boolean = true;
    @Input() content: string;

    constructor(
        @Inject(ElementRef) private elementRef: ElementRef,
        private _utilities: UtilitiesService) { }

    // highlightText(event: Event) {
    //     if (this.selectOnClick) {
    //         console.log(event);
    //         this._utilities.highlightText(<Element>event.target);
    //     }
    // }

    copyToClipboard(event) {
        console.log(this.elementRef.nativeElement);
        this._utilities.copyContentToClipboard(this.elementRef.nativeElement.querySelector('#url'));
    }

    getUrl(){
        var urlSection = <HTMLInputElement>this.elementRef.nativeElement.querySelector("#url");
        return urlSection != undefined ? urlSection.value : undefined;
    }
}