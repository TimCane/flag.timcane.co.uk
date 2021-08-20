import { Observable } from "rxjs";

export class Wait {
    static atleast(milliseconds: number = 1000): Observable<void> {
        return new Observable(o => {
            console.log("creating timeout");
            var timeoutId = window.setTimeout(() => {
                console.log("done timeout");
                window.clearTimeout(timeoutId);
                o.next();
                o.complete();
            }, milliseconds);
        })
    }
}
