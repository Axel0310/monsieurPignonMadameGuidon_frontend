import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnChanges {
  @Input() item: any;
  @Input() itemType!: string;
  @Output() updateItemEvent = new EventEmitter<any>();


  public minDate: Date = new Date();

  bikeDescription = new FormControl('');
  comment = new FormControl('');
  commercialOpportunity = new FormControl('');
  deliveryDate = new FormControl(this.minDate, Validators.required);

  ngOnChanges() {
    if(this.item) {
       this.bikeDescription.setValue(this.item.bikeDescription !== '' ? this.item.bikeDescription : 'Non renseignée');
       this.comment.setValue(this.item.comment !== '' ? this.item.comment : 'Non renseignée')
       this.commercialOpportunity.setValue(this.item.commercialOpportunity !== '' ? this.item.commercialOpportunity : 'Non renseignée')
       this.deliveryDate.setValue(this.item.deliveryDate)
    }
  }

  prepareUpdate(fieldName: keyof ItemDetailsComponent) {
    if(fieldName !== 'deliveryDate') {
      this[fieldName].setValue(this[fieldName].value.trim())
    }
      this.updateItem({[fieldName]: this[fieldName].value});
      this[fieldName].reset();
  }

  resetInput(fieldName: keyof ItemDetailsComponent) {
    this[fieldName].reset(this.item[fieldName] !== '' ? this.item[fieldName] : 'Non renseignée')
  }

  updateItem(update: any) {
    this.updateItemEvent.emit(update);
    (document.activeElement as HTMLElement)?.blur();
  }

  onEnterUp(fieldName: keyof ItemDetailsComponent) {
    if(this[fieldName].dirty) {
      this.prepareUpdate(fieldName)
    }
  }
}
