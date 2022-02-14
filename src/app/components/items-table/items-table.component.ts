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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
})
export class ItemsTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() items: any;
  @Input() itemsType!: string;
  @Input() selectedItem!: any;
  @Output() selectItemEvent = new EventEmitter<any>();

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public displayedColumns: string[] = [];

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
    } else if (this.itemsType === 'paint') {
      this.displayedColumns = [
        'client',
        'phone',
        'bikeDescription',
        'status',
        'targetDeliveryDate',
        'color',
      ];
    } else {
      this.displayedColumns = [
        'client',
        'phone',
        'bikeDescription',
        'status',
        'targetDeliveryDate',
      ];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && this.items) {
      this.dataSource.data = this.items;
      const previousSelectedItem = this.getItemById(this.selectedItem?._id);
      const newSelectedItem = previousSelectedItem
        ? previousSelectedItem
        : this.items[0];
      this.selectItem(newSelectedItem);
    }
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

  getItemById(id: string | undefined) {
    if (id) {
      return (this.items as []).find(
        (item: { _id: string }) => item._id === id
      );
    } else {
      return undefined;
    }
  }

  selectItem(item: any) {
    this.selectItemEvent.emit(item);
  }
}
