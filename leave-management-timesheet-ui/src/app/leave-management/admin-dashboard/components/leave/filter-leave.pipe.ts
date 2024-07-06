import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLeave'
})
export class FilterLeavePipe implements PipeTransform {
  transform(leaves: any[], filter: any): any[] {
    if (!leaves || !filter) {
      return leaves;
    }

    return leaves.filter(leave => {
      const matchesName = filter.name ? leave.user.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
      const matchesDate = filter.date ? new Date(leave.from_date) <= new Date(filter.date) && new Date(leave.to_date) >= new Date(filter.date) : true;
      return matchesName && matchesDate;
    });
  }
}
