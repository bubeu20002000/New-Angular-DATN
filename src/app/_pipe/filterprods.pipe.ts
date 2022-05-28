import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product.model';

@Pipe({
  name: 'filterprods'
})
export class FilterprodsPipe implements PipeTransform {

  transform(items: any[], filter: Product): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.prodname.indexOf(filter.prodname) !== -1);
  }

}
