import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], lastsort: number, sortType: number): any {
    if (sortType==0)
      if (lastsort!=0){
        return items.sort(function(a, b) { 
          return a.id - b.id;
        });
      }
      else {
        return items.sort(function(a, b) { 
          return b.id - a.id;
        });
      }
    else 
      if (lastsort!=2){
        return items.sort(function(a, b) {          
          return Date.parse(a.birthdate) - Date.parse(b.birthdate);
        });
      }
      else {
        return items.sort(function(a, b) {
          return Date.parse(b.birthdate) - Date.parse(a.birthdate);
        });
      }
  }
}
