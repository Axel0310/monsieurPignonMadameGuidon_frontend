import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  
  transform(phone: string) {
    let formatedPhone: string = '';
    [...phone].forEach((char, i) => {
      const spacer = i % 2 === 1 && i !== 9 ? '.' : ''
      formatedPhone = formatedPhone + char + spacer;
    });
    return formatedPhone;
  }
  
} 