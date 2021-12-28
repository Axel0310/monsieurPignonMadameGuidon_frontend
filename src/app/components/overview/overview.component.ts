import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { Paint } from 'src/app/interfaces/paint';
import { Repair } from 'src/app/interfaces/repair';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() items!: Order[] | Paint[] | Repair[];
  @Input() itemsType!: 'order' | 'paint' | 'repair';
  @Output() updateStatusFilterEvent = new EventEmitter<string>();
  @Output() updateItemEvent = new EventEmitter<any>();

  public itemsTypeTranslation: string = '';

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public displayedColumns: string[] = [];

  public selectedItem: Order | Paint | Repair | undefined;

  public statusList: string[] = ['Client notifié', 'Livré'];
  public selectedStatus!: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && this.items) {
      this.dataSource.data = this.items;
      const previousSelectedItem = this.getItemById(this.selectedItem?._id);
      this.selectedItem = previousSelectedItem
        ? previousSelectedItem
        : this.items[0];
    }
  }

  ngOnInit(): void {
    if (this.itemsType === 'order') {
      this.displayedColumns = [
        'client',
        'phone',
        'product',
        'unitPrice',
        'quantity',
        'provider',
        'status',
        'targetDeliveryDate',
      ];
      this.statusList = [
        'A commander',
        'Panier',
        'Commandé',
        ...this.statusList,
      ];
      this.selectedStatus = 'A commander';
    } else if (this.itemsType === 'paint') {
      this.displayedColumns = [
        'client',
        'phone',
        'bikeDescription',
        'status',
        'targetDeliveryDate',
        'color',
      ];
      this.statusList = ['En attente', 'En peinture', ...this.statusList];
      this.selectedStatus = 'En attente';
    } else {
      this.displayedColumns = [
        'client',
        'phone',
        'bikeDescription',
        'status',
        'targetDeliveryDate',
      ];
      this.statusList = ['A faire', 'Fait', ...this.statusList];
      this.selectedStatus = 'A faire';
    }

    this.itemsTypeTranslation =
      this.itemsType === 'order'
        ? 'commande'
        : this.itemsType === 'paint'
        ? 'peinture'
        : 'réparation';
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'client':
          return item.client.lastName;
        case 'phone':
          return item.client.phone;
        case 'product':
          return item.products[0].name;
        case 'unitPrice':
          return item.products[0].price;
        case 'quantity':
          return item.products[0].quantity;
        case 'provider':
          return item.products[0].provider.name;
        case 'targetDeliveryDate': {
          const date = new Date(item.targetDeliveryDate);
          return date;
        }
        default: {
          return item[property];
        }
      }
    };
  }

  updateStatusFilter() {
    this.updateStatusFilterEvent.emit(this.selectedStatus);
  }

  selectItem(item: Order | Paint | Repair) {
    this.selectedItem = item;
  }

  copyToClipboard() {
    const i = this.selectedItem as Paint;
    const getContentToCopy = () => {
      let content: string = '';
      i.expenses.forEach(expense => {
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

  updateItem(updates: any) {
    this.updateItemEvent.emit({ id: this.selectedItem?._id, updates });
    if (updates.status) {
      this.selectedStatus = updates.status;
    }
  }

  getItemById(id: string | undefined) {
    if (id) {
      return (this.items as []).find(
        (item: { _id: string }) => item._id === id
      );
    } else {
      return undefined;
    }
  }
}
