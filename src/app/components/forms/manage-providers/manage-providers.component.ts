import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss'],
})
export class ManageProvidersComponent {

  public providers$: Observable<Provider[]>;

  newProvider = new FormControl('', Validators.required);

  updatedProvider = new FormControl('', Validators.required);

  public providerBeingUpdated: Provider | undefined = undefined;

  constructor(private providersService: ProviderService) {
    this.providers$ = this.providersService.getProviders();
  }

  createProvider() {
    this.providersService.createProvider(this.newProvider.value).subscribe(createdProvider => {
      if(createdProvider) this.newProvider.reset();
    });
  }

  deleteProvider(id: string) {
    this.providersService.deleteProvider(id).subscribe();
  }

  updateProvider() {
    if(this.providerBeingUpdated) {
      this.providersService.updateProvider(this.providerBeingUpdated._id, {name: this.updatedProvider.value}).subscribe(updatedProvider => {
        this.toggleEditing();
      })
    }
  }

  toggleEditing(provider?: Provider) {
    if(provider) {
      this.providerBeingUpdated = provider;
      this.updatedProvider.setValue(provider.name)
    } else {
      this.providerBeingUpdated = undefined;
      this.updatedProvider.reset();
    }
  }
}
