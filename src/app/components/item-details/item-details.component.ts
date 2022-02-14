import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {

  @Input() item: any;
  @Input() itemType!: string;
  @Output() updateItemEvent = new EventEmitter<any>();

  copyToClipboard() {
    const getContentToCopy = () => {
      let content: string = '';
      this.item.expenses.forEach((expense: any) => {
        content = content + `${expense.name},${expense.price},${expense.quantity};`
      })
      return content;
    }

    navigator.clipboard.writeText(getContentToCopy()).then(
      function () {
        console.log('Copied into clipboard');
      },
      function () {
        console.log('Failed to copy into clipboard');
      }
    );
  }

  updateItem(update: any) {
    this.updateItemEvent.emit(update);
  }

}
