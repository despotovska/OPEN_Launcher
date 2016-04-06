import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';

import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

describe('UserSettingsColorsServiceTests', () => {
  beforeEachProviders(() => [
    UserSettingsColorsService
  ]);

  it('getPointerColors_givenBlackAndWhiteBgColor_getsWhiteAndYellowPointer',
    inject([UserSettingsColorsService], (instance) => {
      // Act
      var pointerColors = instance.getPointerColors(BackgroundColor.BlackAndWhite);

      // Assert
      expect(pointerColors.length).toEqual(2);
    }));

  it('getPointerColors_givenInColorBgColor_getsAllColorsAvailableFromEnums',
    inject([UserSettingsColorsService], (instance) => {
      // Act
      var inColorAvailablePointerColor = instance.getPointerColors(BackgroundColor.InColor);

      // Assert
      expect(inColorAvailablePointerColor.length).toEqual(5);
    }));
});
