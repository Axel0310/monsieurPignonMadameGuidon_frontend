import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input() notification!: Notification;
  @Input() index!: number;

  constructor(private notifService: NotificationService){}

  closeNotification() {
    this.notifService.closeNotification(this.index);
  }

}
