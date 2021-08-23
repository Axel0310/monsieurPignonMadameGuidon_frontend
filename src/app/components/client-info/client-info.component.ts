import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  @Input() client!: Client;

  constructor() { }

  ngOnInit(): void {
    this.client = {
      firstName: 'zmudz',
      lastName: 'craquotte',
      phone: '0606060606'
    }
  }

}
