import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

// export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
//     // Extract the uploaded File
//     const file = control.value as File;
//     //Read the file. Note that loadend gives more info 
//     const fileReader = new FileReader();
//     const FrObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
//         fileReader.addEventListener("loadend", ()=> {
       
//         });
//         fileReader.readAsArrayBuffer(file);
//     });
// };