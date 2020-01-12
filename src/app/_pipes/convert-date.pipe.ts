import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'convertDate'
})
export class ConvertDatePipe implements PipeTransform {

  months = [
    {
      abbreviation: 'Jan',
      name: 'January'
    },
    {
      abbreviation: 'Feb',
      name: 'February'
    },
    {
      abbreviation: 'Mar',
      name: 'March'
    },
    {
      abbreviation: 'Apr',
      name: 'April'
    },
    {
      abbreviation: 'May',
      name: 'May'
    },
    {
      abbreviation: 'Jun',
      name: 'June'
    },
    {
      abbreviation: 'Jul',
      name: 'July'
    },
    {
      abbreviation: 'Aug',
      name: 'August'
    },
    {
      abbreviation: 'Sep',
      name: 'September'
    },
    {
      abbreviation: 'Oct',
      name: 'October'
    },
    {
      abbreviation: 'Nov',
      name: 'November'
    },
    {
      abbreviation: 'Dec',
      name: 'December'
    }
  ];

  transform(startDate: any, endDate: any): any {
    let newStartDate: string;
    // let newEndDate: string;
    startDate = startDate.split('-');
    if (endDate) {
      endDate = endDate.split('-');
      if (startDate[0] !== endDate[0]) {
        newStartDate =
          startDate[2] + ' ' + this.months[parseInt(startDate[1], 10) - 1].abbreviation + ' ' + startDate[0] + ' - ' +
          endDate[2] + ' ' + this.months[parseInt(endDate[1], 10) - 1].abbreviation + ' ' + endDate[0];
        return newStartDate;
      }
      if (startDate[1] !== endDate[1]) {
        newStartDate =
          startDate[2] + ' ' + this.months[parseInt(startDate[1], 10) - 1].abbreviation + ' - ' +
          endDate[2] + ' ' + this.months[parseInt(endDate[1], 10) - 1].abbreviation + ' ' + endDate[0];
        return newStartDate;
      }
      newStartDate =
        startDate[2] + ' - ' +
        endDate[2] + ' ' + this.months[parseInt(endDate[1], 10) - 1].abbreviation + ' ' + endDate[0];
      return newStartDate;
    }
    newStartDate = startDate[2] + ' ' + this.months[parseInt(startDate[1], 10) - 1].abbreviation + ' ' + startDate[0];

    return newStartDate;
  }

}
