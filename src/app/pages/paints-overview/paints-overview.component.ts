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

  constructor(private paintService: PaintService) { 
    this.paints$ = this.paintService.getPaints('ongoing');
  }

}
