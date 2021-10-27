import { ElementRef, Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export default class HTMLUtils {

    scrollToBottomOfDiv(elem: ElementRef<any>, id: string = '') {
        if (elem && elem.nativeElement) {
            setTimeout(() => {
                elem.nativeElement.scrollTop = elem.nativeElement.scrollHeight - elem.nativeElement.clientHeight;
            })
        }
    }
}