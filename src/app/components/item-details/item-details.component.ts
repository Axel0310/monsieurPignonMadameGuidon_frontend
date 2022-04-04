import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnChanges {
  @Input() item: any;
  @Input() itemType!: string;
  @Output() updateItemEvent = new EventEmitter<any>();


  minDate: Date = new Date();

  bikeDescription = new FormControl('');
  comment = new FormControl('');
  commercialOpportunity = new FormControl('');
  deliveryDate = new FormControl(this.minDate);

  ngOnChanges() {
    if(this.item) {
       this.bikeDescription.setValue(this.item.bikeDescription !== '' ? this.item.bikeDescription : 'Non renseignée');
       this.comment.setValue(this.item.comment !== '' ? this.item.comment : 'Non renseignée')
       this.commercialOpportunity.setValue(this.item.commercialOpportunity !== '' ? this.item.commercialOpportunity : 'Non renseignée')
       this.deliveryDate.setValue(this.item.deliveryDate)
    }
  }

  copyToClipboard() {
    const getContentToCopy = () => {
      let content: string = '';
      this.item.expenses.forEach((expense: any) => {
        content =
          content + `${expense.name},${expense.price},${expense.quantity};`;
      });
      return content;
    };

    navigator.clipboard.writeText(getContentToCopy()).then(
      function () {
        console.log('Copied into clipboard');
      },
      function () {
        console.log('Failed to copy into clipboard');
      }
    );
  }

  prepareUpdate(fieldName: keyof ItemDetailsComponent) {
      this.updateItem({[fieldName]: this[fieldName].value});
      this[fieldName].reset();
  }

  resetInput(fieldName: keyof ItemDetailsComponent) {
    this[fieldName].reset(this.item[fieldName] !== '' ? this.item[fieldName] : 'Non renseignée')
  }

  updateItem(update: any) {
    console.log(update)
    this.updateItemEvent.emit(update);
  }

  onEnterUp(fieldName: keyof ItemDetailsComponent) {
    if(this[fieldName].dirty) {
      this.prepareUpdate(fieldName)
    }
  }
}
