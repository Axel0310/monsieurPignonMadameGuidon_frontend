import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Paint } from 'src/app/interfaces/paint';
import { Repair } from 'src/app/interfaces/repair';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() items!: Order[] | Paint[] | Repair[] | null;
  @Input() itemsType!: 'order' | 'paint' | 'repair';

  public itemsTypeTranslation: string = '';

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public displayedColumns: string[] = [];

  public selectedItem: Order | Paint | Repair | undefined;

  @Output() updateStatusFilterEvent = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.items && this.items){
      this.dataSource.data = this.items;
      console.log(this.items);
    }
  }

  ngOnInit(): void {
    if(this.itemsType === 'order') {
      this.displayedColumns = ['client', 'product', 'unitPrice', 'quantity', 'provider', 'status', 'targetDeliveryDate']
    } else if(this.itemsType === 'paint') {
      this.displayedColumns = ['client', 'bikeDescription', 'status', 'targetDeliveryDate', 'color']
    } else {
      this.displayedColumns = ['client', 'bikeDescription', 'status', 'targetDeliveryDate']
    }

    this.itemsTypeTranslation = this.itemsType === 'order' ? 'commande' : this.itemsType === 'paint' ? 'peinture' : 'réparation';
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateStatusFilter(value: string) {
    this.updateStatusFilterEvent.emit(value);
  }

  selectItem(item: Order | Paint | Repair) {
    this.selectedItem = item;
  }

}