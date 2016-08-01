import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {AlertingComponent} from './AlertingComponent';

import {AlertingService} from '../../shared/services/AlertingService';

import {Alert} from '../../shared/models/Alert';

describe('AlertingComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    AlertingComponent
  ]);

  it('getCurrentAlerts_shouldBeEqualToAlertingServiceCurrentAlerts',
    inject([AlertingComponent], (instance) => {
      // Arrange
      let expectedResult = instance.alertingService.currentAlerts;

      // Act
      let result = instance.getCurrentAlerts();

      // Assert
      expect(result).toEqual(expectedResult);
    }));

  it('hasAlerts_givenAlertingServiceHasAlerts_shouldReturnTrue',
    inject([AlertingComponent], (instance) => {
      // Arrange
      instance.alertingService.addAlert('info', 'message');

      // Act
      let result = instance.hasAlerts();

      // Assert
      expect(result).toBeTruthy();
    }));

  it('hasAlerts_givenAlertingServiceDoesntHaveAlerts_shouldReturnFalse',
    inject([AlertingComponent], (instance) => {
      // Act
      let result = instance.hasAlerts();

      // Assert
      expect(result).toBeFalsy();
    }));

  it('removeAlert_givenServiceAlertsHasOneCurrentAlert_shouldRemoveAndCurrentAlertsArrayShouldBeEmpty',
    inject([AlertingComponent], (instance) => {
      // Arrange
      let alert: Alert = new Alert('info', 'message');
      instance.alertingService.currentAlerts = [alert];

      // Act
      instance.removeAlert(alert);

      // Assert
      expect(instance.hasAlerts()).toBeFalsy();
    }));
});
