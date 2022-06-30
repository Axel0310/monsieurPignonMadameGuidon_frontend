import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss'],
})
export class ManageClientsComponent {

  public clients$: Observable<Client[]>;

  newClientForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  updatedClientForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  public clientBeingUpdated: Client | undefined = undefined;

  constructor(private clientService: ClientService) {
    this.clients$ = this.clientService.getClients();
  }

  createClient() {
    this.clientService.createClient(this.newClientForm.value).subscribe(createdClient => {
      if(createdClient) {
        this.newClientForm.reset();
     }
    });
  
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id).subscribe();
  }

  updateClient() {
    if(this.clientBeingUpdated) {
      this.clientService.updateClient(this.clientBeingUpdated._id, this.updatedClientForm.value).subscribe(updatedClient => {
        this.toggleEditing();
      })
    }
  }

  toggleEditing(client?: Client) {
    if(client) {
      this.clientBeingUpdated = client;
      this.updatedClientForm.setValue({
        lastName: client.lastName,
        firstName: client.firstName,
        phone: client.phone,
      })
    } else {
      this.clientBeingUpdated = undefined;
      this.updatedClientForm.reset;
    }
  }

}
