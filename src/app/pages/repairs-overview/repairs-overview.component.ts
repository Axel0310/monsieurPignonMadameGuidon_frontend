import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Repair } from 'src/app/interfaces/repair';
import { RepairService } from 'src/app/services/repair.service';

@Component({
  selector: 'app-repairs-overview',
  templateUrl: './repairs-overview.component.html',
  styleUrls: ['./repairs-overview.component.scss']
})
export class RepairsOverviewComponent {

  repairs$: Observable<Repair[]>;

  constructor(private repairService: RepairService) { 
    this.repairs$ = this.repairService.getRepairs();
  }

  filterByStatus(status: string) {
    this.repairService.fetchRepairs(status);
  }

  updateRepair(updatedRepair: any) {
    this.repairService.updateRepair(updatedRepair.id, updatedRepair.updates);
  }

}
