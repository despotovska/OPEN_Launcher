import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';

import {UsersPipe} from './UsersPipe';
import {User} from '../models/User';

describe('UsersPipeTests', () => {
  function getUser(name: string): User {
    var user = new User();
    user.name = name;
    return user;
  }

  beforeEachProviders(() => [
    UsersPipe
  ]);

  it('transform_givenPipeArgument_shouldReturnOneUser',
    inject([UsersPipe], (instance) => {
      // Arrange
      let user = getUser('Dragica');

      // Act
      var result = instance.transform([user], ['dr']);

      // Assert
      expect(result).toEqual([user]);
    }));

  it('transform_givenNoPipeArgument_shouldReturnAllUsers',
    inject([UsersPipe], (instance) => {
      // Arrange
      let users: User[] = new Array<User>();
      users[0] = getUser('Dragica');

      // Act
      var result = instance.transform(users, ['']);

      // Assert
      expect(result).toEqual(users);
    }));

  it('transform_givenNoUsers_shouldReturnNoUsers',
    inject([UsersPipe], (instance) => {
      // Arrange
      let users: User[] = new Array<User>();

      // Act
      var result = instance.transform(users, ['']);

      // Assert
      expect(result).toEqual(users);
    }));

  it('transform_givenPipeArgument_shouldReturnMultipleUsers',
    inject([UsersPipe], (instance) => {
      // Arrange
      let users: User[] = new Array<User>();
      users[0] = getUser('Dragica');
      users[1] = getUser('Daniela');

      // Act
      var result = instance.transform(users, ['d']);

      // Assert
      expect(result).toEqual(users);
    }));
});
