import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Paint } from 'src/app/interfaces/paint';
import { PaintService } from 'src/app/services/paint.service';

@Component({
  selector: 'app-paints-overview',
  templateUrl: './paints-overview.component.html',
  styleUrls: ['./paints-overview.component.scss']
})
export class PaintsOverviewComponent {

  paints$: Observable<Paint[]>;
  filteredStatus$: Observable<string[]>;
  selectedState$: Observable<string>;
  canLoadMoreHistory$: Observable<boolean>;

  constructor(private paintService: PaintService) { 
    this.paints$ = this.paintService.getPaints();
    this.filteredStatus$ = this.paintService.getFilteredStatus();
    this.selectedState$ = this.paintService.getSelectedState();
    this.canLoadMoreHistory$ = this.paintService.getCanLoadMoreHistory();
  }

  updateStatusFilter(status: string) {
    this.paintService.updateStatusFilter(status);
  }

  updateStateFilter(status: 'ongoing' | 'closed') {
    this.paintService.setFilteredState(status);
  }

  updatePaint(updatedPaint: any) {
    this.paintService.updatePaint(updatedPaint.id, updatedPaint.updates);
  }

  searchPaints(searchInput: string) {
    this.paintService.searchPaints(searchInput);
  }

  loadMoreHistory() {
    this.paintService.fetchPaintsHistory();
  }

}
