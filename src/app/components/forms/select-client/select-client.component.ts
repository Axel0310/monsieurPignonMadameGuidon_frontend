import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss'],
})
export class SelectClientComponent implements OnDestroy {

  @Output() isClientFormValidEvent = new EventEmitter<boolean>();

  public clientFormSelector: 'newClient' | 'existingClient' = 'existingClient';

  newClientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  get firstName() {
    return this.newClientForm.get('firstName');
  }
  get lastName() {
    return this.newClientForm.get('lastName');
  }
  get phone() {
    return this.newClientForm.get('phone');
  }

  public nameSearch: string = '';
  public fetchedClients: BehaviorSubject<Client[]> = new BehaviorSubject<
    Client[]
  >([]);
  public selectedClient: Observable<Client | undefined>;

  constructor(private clientService: ClientService) {
    this.selectedClient = this.clientService.currentClient$;
  }

  onNameSearch(name: string) {
    if (name) {
      this.clientService.searchClient(name).subscribe((fetchtedClients) => {
        this.fetchedClients.next(fetchtedClients);
      });
    } else {
      this.fetchedClients.next([]);
    }
  }

  onClientSelected(client: Client) {
    this.clientService.setCurrentClient(client);
    this.nameSearch = '';
    this.fetchedClients.next([]);
  }

  onNewClientFormChange() {
    this.clientService.setClientToBeCreated(this.newClientForm.value)
    this.isClientFormValidEvent.emit(this.newClientForm.valid);
  }

  resetClientSelection(clientFormSelected: 'existingClient' | 'newClient') {
    if(clientFormSelected === 'existingClient') {
      this.clientService.resetClientToBeCreated();
      this.newClientForm.reset();
      this.isClientFormValidEvent.emit(false);
    } else {
      this.clientService.resetCurrentClient();
    }
  }

  ngOnDestroy(): void {
    this.clientService.resetCurrentClient();
    this.clientService.resetClientToBeCreated();
  }
}
