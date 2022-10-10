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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
})
export class ItemsTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() items: any;
  @Input() itemsType!: string;
  @Input() selectedItem!: any;
  @Input() displayLoadMoreHistory$!: Observable<boolean>;
  @Input() isLoading$!: Observable<boolean>;
  @Output() selectItemEvent = new EventEmitter<any>();
  @Output() loadMoreHistoryEvent = new EventEmitter();

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
        'deliveryDate',
        'creationDate',
      ];
    } else if (this.itemsType === 'paint') {
      this.displayedColumns = [
        'client',
        'phone',
        'bikeDescription',
        'status',
        'color',
        'deliveryDate',
        'creationDate',
      ];
    } else {
      this.displayedColumns = [
        'client',
        'phone',
        'bikeDescription',
        'status',
        'deliveryDate',
        'creationDate',
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
    this.sort.sort({ id: 'deliveryDate', start: 'desc', disableClear: false });
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'client':
          return item.client.lastName;
        case 'phone':
          return item.client.phone;
        case 'product':
          return item.expenses[0].name;
        case 'unitPrice':
          return item.expenses[0].price;
        case 'quantity':
          return item.expenses[0].quantity;
        case 'provider':
          return item.expenses[0].provider.name;
        case 'deliveryDate': {
          const date = new Date(item.deliveryDate);
          return date;
        }
        case 'creationDate': {
          const date = new Date(item.createdAt);
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

  loadMoreHistory() {
    this.loadMoreHistoryEvent.emit()
  }
}
