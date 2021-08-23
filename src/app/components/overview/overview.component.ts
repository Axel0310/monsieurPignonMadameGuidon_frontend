import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Paint } from 'src/app/interfaces/paint';
import { Repair } from 'src/app/interfaces/repair';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnChanges{

  @Input() items!: Order[] | Paint[] | Repair[] | null;
  @Input() itemsType!: 'order' | 'paint' | 'repair';

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  public displayedColumns: string[] = ['client', 'clientPhone', 'status', 'targetDeliveryDate']

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.items && this.items){
      this.dataSource.data = this.items;
      console.log(this.items);
    }
  }

  ngOnInit(): void {
    // if(this.itemsType === 'order') {
    //   console.log('coucou')
    //   this.dataSource =new MatTableDataSource<Order>();
    // } else if(this.itemsType === 'paint') {
    //   new MatTableDataSource<Paint>();
    // } else {
    //   new MatTableDataSource<Repair>()
    // }
    // this.dataSource = this.itemsType === 'order' ? new MatTableDataSource<Order>() : this.itemsType === 'paint' ? new MatTableDataSource<Paint>() : new MatTableDataSource<Repair>()
  }


}