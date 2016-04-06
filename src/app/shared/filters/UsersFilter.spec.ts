import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';

import {UsersFilter} from './UsersFilter';
import {User} from '../models/User';

describe('UsersFilterTests', () => {
  function getUser() {
    var user = new User();
    user.name = 'dragica';
    return user;
  }

  beforeEachProviders(() => [
    UsersFilter
  ]);

  it('transform_givenFilter_shouldFilterWithOneUser',
    inject([UsersFilter], (instance) => {
      // Arrange
      let user = getUser();

      // Act
      var result = instance.transform([user], ['dr']);

      // Assert
      expect(result).toEqual([user]);
    }));

  it('transform_givenNoFilter_shouldReturnAllUsers',
    inject([UsersFilter], (instance) => {
      // Arrange
      let user = getUser();
      let users: User[] = new Array<User>();
      users[0] = user;

      // Act
      var result = instance.transform(users, ['']);

      // Assert
      expect(result).toEqual(users);
    }));

  it('transform_givenNoUsers_shouldReturnNoUsers',
    inject([UsersFilter], (instance) => {
      // Arrange
      let users: User[] = new Array<User>();

      // Act
      var result = instance.transform(users, ['']);

      // Assert
      expect(result).toEqual(users);
    }));

  it('transform_givenFilter_shouldFilterWithMultipleUsers',
    inject([UsersFilter], (instance) => {
      // Arrange
      let user1 = new User();
      user1.name = 'Daniela';
      let user2 = new User();
      user2.name = 'Dragica';
      let users: User[] = new Array<User>();
      users[0] = user1;
      users[1] = user2;

      // Act
      var result = instance.transform(users, ['d']);

      // Assert
      expect(result).toEqual(users);
    }));
});
