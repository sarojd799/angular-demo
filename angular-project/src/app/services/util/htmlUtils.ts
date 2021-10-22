import { ElementRef, Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export default class HTMLUtils {

    scrollToBottomOfDiv(elem: ElementRef<any>) {
        if (elem && elem.nativeElement) {
            elem.nativeElement.scrollTop = elem.nativeElement.scrollHeight;
        }
    }
}