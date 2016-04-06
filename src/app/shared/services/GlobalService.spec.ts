import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';

import {GlobalService} from './GlobalService';

describe('GlobalServiceTests', () => {
  beforeEachProviders(() => [
    GlobalService
  ]);

  it('URL_GETUSER_givenUsername_shouldGetApiUserPath', inject([GlobalService], (instance) => {
    expect(instance.URL_GETUSER('eljesa')).toEqual('http://localhost:3000/api/getAllUsers/eljesa');
  }));

  it('URL_DELETEUSER_givenUsername_shouldGetApiDeleteUserPath', inject([GlobalService], (instance) => {
    expect(instance.URL_DELETEUSER('eljesa')).toEqual('http://localhost:3000/api/deleteUser/eljesa');
  }));

  it('URL_GET_USERSETTINGS_givenUsername_shouldGetApiUserSettingsPath', inject([GlobalService], (instance) => {
    expect(instance.URL_GET_USERSETTINGS('eljesa')).toEqual('http://localhost:3000/api/getUserSettings/eljesa');
  }));

  it('URL_SAVE_USERSETTINGS_givenUsername_shouldGetApiSaveUserSettingsPath', inject([GlobalService], (instance) => {
    expect(instance.URL_SAVE_USERSETTINGS('eljesa')).toEqual('http://localhost:3000/api/saveUserSettings/eljesa');
  }));
});
