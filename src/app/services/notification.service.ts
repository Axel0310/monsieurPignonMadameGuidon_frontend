import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../interfaces/notification'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsList: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([{
      type: 'success',
      message: 'Item a été mis à jour'
  },
  {
    type: 'failure',
    message: 'Item na pas pu être mis à jour'
}]);

  public getNotificationsList(): Observable<Notification[]> {
      return this.notificationsList.asObservable();
  }

  public pushNotification(type: 'success' | 'failure', message: string) {
      this.notificationsList.next([...this.notificationsList.value, {type, message}])
      setTimeout(() => {
        this.removeOldestNotification()
      }, 5000)
  }

  public closeNotification(index: number) {
    const updatedNotifArray = [...this.notificationsList.value];
    updatedNotifArray.splice(index, 1);
    this.notificationsList.next(updatedNotifArray)
  }

  private removeOldestNotification() {
    const updatedNotifArray = [...this.notificationsList.value];
    updatedNotifArray.shift();
    this.notificationsList.next(updatedNotifArray)
  }
}
