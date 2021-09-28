import { Component, Input } from '@angular/core';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent {

  @Input() client!: Client;

}
