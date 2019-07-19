import {Pipe, PipeTransform} from '@angular/core';

// Pipe is used to create a key for each column/field from specified array.

@Pipe({name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        for(let key in value) {
            keys.push(key);
        }
        return keys;
    }
} 