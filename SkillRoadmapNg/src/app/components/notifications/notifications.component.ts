import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  mynotifications: Notification[] = []

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getByEmpployee(localStorage.getItem('currentuser'))
    .subscribe((data: Notification[] | any) => {
      this.mynotifications = data;
      this.mynotifications.forEach(n => {
        n.sendingDate = new Date(n.sendingDate);
      });
    });
  }
}
