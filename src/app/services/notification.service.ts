import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../interfaces/notification'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsList: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

  public getNotificationsList(): Observable<Notification[]> {
      return this.notificationsList.asObservable();
  }

  public pushNotification(type: 'success' | 'failure', message: string, errMsg?: string) {
      this.notificationsList.next([...this.notificationsList.value, {type, message, errMsg}])
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
