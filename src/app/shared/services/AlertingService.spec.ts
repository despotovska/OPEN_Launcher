import {
  beforeEachProviders,
  it,
  inject,
} from 'angular2/testing';

import {AlertingService} from './AlertingService';

describe('AlertingServiceTests', () => {
  beforeEachProviders(() => [
    AlertingService
  ]);

  it('addAlert_givenAlert_currentAlertsLengthShouldBeEqualToOne',
    inject([AlertingService], (instance) => {
      // Act
      instance.addAlert('type', 'message');

      // Assert
      expect(instance.currentAlerts.length).toEqual(1);
    }));

  it('addSuccess_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeSuccess',
    inject([AlertingService], (instance) => {
      // Act
      instance.addSuccess('message');

      // Assert
      expect(instance.currentAlerts[0].type).toEqual('success');
    }));

  it('addInfo_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeInfo',
    inject([AlertingService], (instance) => {
      // Act
      instance.addInfo('message');

      // Assert
      expect(instance.currentAlerts[0].type).toEqual('info');
    }));

  it('addWarning_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeWarning',
    inject([AlertingService], (instance) => {
      // Act
      instance.addWarning('message');

      // Assert
      expect(instance.currentAlerts[0].type).toEqual('warning');
    }));

  it('addDanger_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeDanger',
    inject([AlertingService], (instance) => {
      // Act
      instance.addDanger('message');

      // Assert
      expect(instance.currentAlerts[0].type).toEqual('danger');
    }));

  it('removeAlert_givenCurrentAlertsArrayHasOneAlert_shouldRemoveAndCurrentAlertsArrayShouldBeEmpty',
    inject([AlertingService], (instance) => {
      // Arrange
      instance.addDanger('message');
      var noAlerts = instance.currentAlerts.length;

      // Act
      instance.removeAlert(instance.currentAlerts[0]);

      // Assert
      expect(instance.currentAlerts.length).toEqual(noAlerts - 1);
    }));
});
