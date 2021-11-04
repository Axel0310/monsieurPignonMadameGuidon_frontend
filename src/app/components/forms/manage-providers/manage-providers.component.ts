import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss'],
})
export class ManageProvidersComponent {

  public providers$: Observable<Provider[]>;

  public faTrashAlt = faTrashAlt;

  providerForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private providersService: ProviderService) {
    this.providers$ = this.providersService.getProviders();
  }

  onSubmit() {
    this.providersService.createProvider(this.providerForm.value.name).subscribe(createdProvider => {
      if(createdProvider) this.providerForm.reset();
    });
  }

  deleteProvider(id: string) {
    this.providersService.deleteProvider(id).subscribe();
  }
}
