import {
  beforeEachProviders,
  it
} from 'angular2/testing';

import {AlertingService} from './AlertingService';

describe('AlertingServiceTests', () => {
  var instance: AlertingService = null;

  beforeEach(() => {
    instance = new AlertingService();
  });

  it('addAlert_givenAlert_currentAlertsLengthShouldBeEqualToOne', () => {
    // Act
    instance.addAlert('type', 'message');

    // Assert
    expect(instance.currentAlerts.length).toEqual(1);
  });

  it('addSuccess_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeSuccess', () => {
    // Act
    instance.addSuccess('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('success');
  });

  it('addInfo_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeInfo', () => {
    // Act
    instance.addInfo('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('info');
  });

  it('addWarning_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeWarning', () => {
    // Act
    instance.addWarning('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('warning');
  });

  it('addDanger_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeDanger', () => {
    // Act
    instance.addDanger('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('danger');
  });

  it('removeAlert_givenCurrentAlertsArrayHasOneAlert_shouldRemoveAndCurrentAlertsArrayShouldBeEmpty', () => {
    // Arrange
    instance.addDanger('message');
    var noAlerts = instance.currentAlerts.length;

    // Act
    instance.removeAlert(instance.currentAlerts[0]);

    // Assert
    expect(instance.currentAlerts.length).toEqual(noAlerts - 1);
  });
});
