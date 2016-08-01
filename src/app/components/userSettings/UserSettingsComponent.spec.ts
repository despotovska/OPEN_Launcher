import {
  beforeEachProviders,
  it,
  inject,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {UserSettingsComponent} from './UserSettingsComponent';
import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, PointerSize, BackgroundColor, DeviceType} from '../../shared/enums/UserSettingsEnums';
import {Alert} from '../../shared/models/Alert';
import {AlertingService} from '../../shared/services/AlertingService';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserSettings} from '../../shared/models/UserSettings';

import {ImagesServiceMock} from '../../shared/mocks/ImagesServiceMock';

describe('UserSettingsComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    UserSettingsColorsService,
    provide(ImagesService, { useClass: ImagesServiceMock }),
    UserSettingsComponent
  ]);

  it('setAvailablePointerImages_givenAvailableImageService_shouldSetAllPointerImages',
    inject([UserSettingsComponent], (instance) => {
      // Arrange
      let allPointerImagesLocal = ['./app/assets/images/pointer/small.png', './app/assets/images/pointer/big.png'];
      spyOn(instance.imagesService, 'getPointerImages').and.callThrough();

      // Act
      instance.setAvailablePointerImages();

      // Assert
      expect(instance.allPointerImages).toEqual(allPointerImagesLocal);
      expect(instance.imagesService.getPointerImages).toHaveBeenCalled();
    }));

  it('setAvailablePointerImages_givenUnavailableImageService_shouldShowAlertForDanger',
    inject([UserSettingsComponent], (instance) => {
      // Arrange
      spyOn(instance.imagesService, 'getPointerImages').and.callFake(() => { return Observable.throw(new Error()); });
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });

      // Act
      instance.setAvailablePointerImages();

      // Assert
      expect(instance.imagesService.getPointerImages).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('LOAD_POINTERS_ERROR_MESSAGE');
    }));

  it('setBackgroundColorAndPointerColors_givenBlackAndWhiteBgColor_shouldSetBgColorAndLoadPointerColors',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let bgColor: BackgroundColor = BackgroundColor.BlackAndWhite;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.backgroundColor = BackgroundColor.InColor;
        fixture.detectChanges();
        spyOn(instance.pointerColorService, 'getPointerColors').and.callFake(() => { });

        // Act
        instance.setBackgroundColorAndPointerColors(bgColor);

        // Assert
        expect(instance.userSettings.backgroundColor).toEqual(bgColor);
        expect(instance.pointerColorService.getPointerColors).toHaveBeenCalledWith(bgColor);
      });
    }));

  it('setDeviceType_givenMouseDeviceType_shouldSetDeviceType',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let deviceType: DeviceType = DeviceType.Mouse;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.deviceType = DeviceType.Mouse;

        // Act
        instance.setDeviceType(deviceType);

        // Assert
        expect(instance.userSettings.deviceType).toEqual(deviceType);
      });
    }));

  it('selectBackgroundColor_givenBlackAndWhiteBgColor_shouldCallSetBackgroundMethodAndSetPointerDefaults',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let nonDefaultPointerColor: PointerColor = PointerColor.Blue;
        let defaultPointerColor: PointerColor = PointerColor.White;
        let bgColor: BackgroundColor = BackgroundColor.BlackAndWhite;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.backgroundColor = BackgroundColor.InColor;
        instance.userSettings.pointerColor = nonDefaultPointerColor;
        fixture.detectChanges();
        spyOn(instance, 'setBackgroundColorAndPointerColors').and.callThrough();
        spyOn(instance, 'selectPointerColor').and.callThrough();

        // Act
        instance.selectBackgroundColor(bgColor);

        // Assert
        expect(instance.setBackgroundColorAndPointerColors).toHaveBeenCalledWith(bgColor);
        expect(instance.selectPointerColor).toHaveBeenCalledWith(defaultPointerColor);
      });
    }));

  it('selectDeviceType_givenMouseDeviceType_shouldCallSetDeviceTypeMethod',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let deviceType: DeviceType = DeviceType.Touchscreen;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.deviceType = DeviceType.Touchscreen;
        spyOn(instance, 'setDeviceType').and.callThrough();

        // Act
        instance.selectDeviceType(deviceType);

        // Assert
        expect(instance.setDeviceType).toHaveBeenCalledWith(deviceType);
      });
    }));

  it('selectPointerColor_givenPointerColor_shouldSetPointerColor',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let defaultPointerColor: PointerColor = PointerColor.White;
        let newPointerColor: PointerColor = PointerColor.Blue;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.pointerColor = defaultPointerColor;
        fixture.detectChanges();

        // Act
        instance.selectPointerColor(newPointerColor);

        // Assert
        expect(instance.userSettings.pointerColor).toEqual(newPointerColor);
      });
    }));

  it('selectPointerSize_givenPointerSize_shouldSetPointerSize',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let defaultPointerSize: PointerSize = PointerSize.Small;
        let newPointerSize: PointerSize = PointerSize.Medium;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.pointerSize = defaultPointerSize;
        fixture.detectChanges();

        // Act
        instance.selectPointerSize(newPointerSize);

        // Assert
        expect(instance.userSettings.pointerSize).toEqual(newPointerSize);
      });
    }));

  it('shouldBeChecked_givenSelectedBgColor_shouldBeTruthy',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let selectedBgColor: BackgroundColor = BackgroundColor.InColor;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.backgroundColor = selectedBgColor;
        fixture.detectChanges();

        // Act
        let checked = instance.shouldBeChecked(selectedBgColor);

        // Assert
        expect(checked).toBeTruthy();
      });
    }));

  it('shouldApplySelectedPointerColorCss_givenSelectedPointerColor_shouldBeTruthy',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let selectedPointerColor: PointerColor = PointerColor.White;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.pointerColor = selectedPointerColor;
        fixture.detectChanges();

        // Act
        let shouldApplyCss = instance.shouldApplySelectedPointerColorCss(selectedPointerColor);

        // Assert
        expect(shouldApplyCss).toBeTruthy();
      });
    }));

  it('shouldApplySelectedPointerSizeCss_givenPointerSizeDiffenrentThanSelected_shouldBeFalsy',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let selectedPointerSize: PointerSize = PointerSize.Small;
        let otherPointerSize: PointerSize = PointerSize.Medium;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.pointerSize = selectedPointerSize;
        fixture.detectChanges();

        // Act
        let shouldApplyCss = instance.shouldApplySelectedPointerSizeCss(otherPointerSize);

        // Assert
        expect(shouldApplyCss).toBeFalsy();
      });
    }));

  it('shouldDeviceTypeBeChecked_givenSelectedDeviceType_shouldBeTruthy',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        let selectedDeviceType: DeviceType = DeviceType.Mouse;
        let instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.deviceType = selectedDeviceType;

        // Act
        let checked = instance.shouldDeviceTypeBeChecked(selectedDeviceType);

        // Assert
        expect(checked).toBeTruthy();
      });
    }));
});
