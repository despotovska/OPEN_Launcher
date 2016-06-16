import {Component} from 'angular2/core';

import {AlertingService} from '../../shared/services/AlertingService';
import {Alert} from '../../shared/models/Alert';

@Component({
  selector: 'alerts',
  template: `
        <div *ngIf="hasAlerts()">
            <div *ngFor="#alert of getCurrentAlerts()" class="alert alert-{{alert.type}} shadow text-center">
                <label id="messagelabel">{{ alert.message }}</label>
                <div class="close" (click)="removeAlert(alert)">
                    <span class="glyphicon glyphicon-remove"></span>
                </div>
            </div>
        </div>
        `
})
export class AlertingComponent {
  constructor(private alertingService: AlertingService) { }

  getCurrentAlerts(): Alert[] {
    return this.alertingService.currentAlerts;
  }

  hasAlerts(): boolean {
    return this.alertingService.currentAlerts.length > 0;
  }

  removeAlert(alert: Alert) {
    this.alertingService.removeAlert(alert);
  }
}
