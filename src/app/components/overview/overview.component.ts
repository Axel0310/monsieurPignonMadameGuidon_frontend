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
import { MatDialog } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() items!: Order[] | Paint[] | Repair[] | null;
  @Input() itemsType!: 'order' | 'paint' | 'repair';

  public itemsTypeTranslation: string = '';

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public displayedColumns: string[] = [];

  public selectedItem: Order | Paint | Repair | undefined;

  @Output() updateStatusFilterEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && this.items) {
      this.dataSource.data = this.items;
      this.selectedItem = this.items[0];
      console.log(this.items);
    }
  }

  ngOnInit(): void {
    if (this.itemsType === 'order') {
      this.displayedColumns = [
        'client',
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
        'bikeDescription',
        'status',
        'targetDeliveryDate',
        'color',
      ];
    } else {
      this.displayedColumns = [
        'client',
        'bikeDescription',
        'status',
        'targetDeliveryDate',
      ];
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
        case 'client': return item.client.lastName;
        case 'product': return item.products[0].name;
        case 'unitPrice': return item.products[0].price;
        case 'quantity': return item.products[0].quantity;
        case 'provider': return item.products[0].provider;
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

  updateStatusFilter(value: string) {
    this.updateStatusFilterEvent.emit(value);
  }

  selectItem(item: Order | Paint | Repair) {
    this.selectedItem = item;
  }

  copyToClipboard() {
    navigator.clipboard.writeText('hello world').then(
      function () {
        console.log('Copied into clipboard');
      },
      function () {
        console.log('Failed to copy into clipboard');
      }
    );
  }

  openItemCreationDialog(): void {
    const dialogRef = this.dialog.open(ItemCreationDialogComponent, {
      width: 'fit-content',
      data: {itemType: this.itemsType}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
