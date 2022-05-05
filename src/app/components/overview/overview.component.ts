import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { Paint } from 'src/app/interfaces/paint';
import { Repair } from 'src/app/interfaces/repair';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() items!: Order[] | Paint[] | Repair[];
  @Input() itemsType!: 'order' | 'paint' | 'repair';
  @Input() selectedState$!: Observable<string>;
  @Input() filteredStatus$!: Observable<string[]>;
  @Input() canLoadMoreHistory$!: Observable<boolean>;
  @Input() isLoading$!: Observable<boolean>;
  @Output() updateStatusFilterEvent = new EventEmitter<string>();
  @Output() updateStateFilterEvent = new EventEmitter<string>();
  @Output() updateItemEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() loadMoreHistoryEvent = new EventEmitter();

  public itemsTypeTranslation: string = '';

  public selectedItem: Order | Paint | Repair | undefined;

  public statusList: string[] = ['Client notifié'];

  public panelOpenState = false;

  public isMobileView$: Observable<boolean>;

  public searchInput: string = '';

  public displayLoadMoreHistory$: Observable<boolean> | undefined;

  toggleExpansionPanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  constructor(private screenSize: ScreenSizeService) {
    this.isMobileView$ = this.screenSize.getIsMobileView();
  }

  ngOnInit(): void {
    if (this.itemsType === 'order') {
      this.statusList = [
        'A commander',
        'Panier',
        'Commandé',
        ...this.statusList,
      ];
    } else if (this.itemsType === 'paint') {
      this.statusList = ['En attente', 'En peinture', ...this.statusList];
    } else {
      this.statusList = ['A faire', 'Fait', ...this.statusList];
    }

    this.itemsTypeTranslation =
      this.itemsType === 'order'
        ? 'commande'
        : this.itemsType === 'paint'
        ? 'peinture'
        : 'réparation';

    this.displayLoadMoreHistory$ = combineLatest([
      this.canLoadMoreHistory$,
      this.selectedState$,
    ]).pipe(
      map(([canLoad, state]) => {
        return canLoad && state === 'closed';
      })
    );
  }

  updateFilteredStatus(clickedStatus: string) {
    this.updateStatusFilterEvent.emit(clickedStatus);
  }

  updateStateFilter(clickedState: string) {
    this.updateStateFilterEvent.emit(clickedState);
  }

  selectItem(item: Order | Paint | Repair) {
    this.selectedItem = item;
  }

  updateItem(updates: any) {
    this.updateItemEvent.emit({ id: this.selectedItem?._id, updates });
    if (updates.status) {
      // this.selectedStatus = updates.status;
    }
  }

  onSearch() {
    this.searchEvent.emit(this.searchInput);
  }

  deleteSearch() {
    this.searchInput = '';
    this.searchEvent.emit(this.searchInput);
  }

  loadMoreHistory() {
    this.loadMoreHistoryEvent.emit();
  }
}
