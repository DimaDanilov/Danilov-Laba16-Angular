import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchStr: string): any[] {
    if (searchStr=='')
      return items;
    else{
      let filteredItems = items.filter((item)=>
        ((item.name+' '+item.surname).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1)||
        ((item.surname+' '+item.name).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1))
      return filteredItems;
    }
  }

}
