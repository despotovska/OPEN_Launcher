import {Component, Input, OnChanges} from 'angular2/core';

import {UserSettingsColorsService} from './UserSettingsColorsService';
import {AlertingService} from '../../shared/services/AlertingService';
import {PointerType, PointerSize, PointerColor, BackgroundColor, DeviceTypes} from '../../shared/enums/UserSettingsEnums';
import {EnumEx} from '../../shared/enums/EnumEx';
import {UserSettings} from '../../shared/models/UserSettings';
import {ImagesService} from '../../shared/services/ImagesService';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'settings',
  templateUrl: './app/components/userSettings/userSettings.html',
  pipes: [TranslatePipe]
})
export class UserSettingsComponent implements OnChanges {
  public availablePointerColors: PointerColor[] = new Array<PointerColor>();
  public allPointerImages: string[] = new Array<string>();
  public backgrounds: string[] = ['IN_COLOR', 'BLACK_AND_WHITE'];
  public devices: string[] = ['MOUSE', 'TOUCHSCREEN', 'TRACKBALL', 'JOYSTICK', 'KEY', 'KEY_AND_TRACKBALL', 'KEY_AND_JOYSTICK'];

  @Input() userSettings: UserSettings;
  ngOnChanges(changes) {
    let changedUserSettings = changes.userSettings.currentValue;
    if (changedUserSettings) {
      this.setBackgroundColorAndPointerColors(this.userSettings.backgroundColor);
      this.selectPointerSize(this.userSettings.pointerSize);
      this.selectPointerColor(this.userSettings.pointerColor);
    }
  }

  constructor(
    private alertingService: AlertingService,
    private pointerColorService: UserSettingsColorsService,
    private imagesService: ImagesService) {

    this.setAvailablePointerImages();
  }

  setAvailablePointerImages(): void {
    this.imagesService.getPointerImages()
      .subscribe(
      data => this.allPointerImages = data,
      err => this.alertingService.addDanger('LOAD_POINTERS_ERROR_MESSAGE'));
  }

  setBackgroundColorAndPointerColors(backgroundColor: BackgroundColor): void {
    this.userSettings.backgroundColor = Number(backgroundColor);
    this.availablePointerColors = this.pointerColorService.getPointerColors(backgroundColor);
  }

  selectBackgroundColor(backgroundColor: BackgroundColor): void {
    this.setBackgroundColorAndPointerColors(backgroundColor);
    this.selectPointerColor(PointerColor.White);
  }

  setDeviceType(deviceType: DeviceTypes): void {
    this.userSettings.deviceType = Number(deviceType);
  }

  selectDeviceType(deviceType: DeviceTypes): void {
    this.setDeviceType(deviceType);
  }

  selectPointerColor(pointerColor: PointerColor): void {
    this.userSettings.pointerColor = pointerColor;
  }

  selectPointerSize(pointerSize: PointerSize): void {
    this.userSettings.pointerSize = pointerSize;
  }

  shouldBeChecked(backgroundColor: BackgroundColor): boolean {
    if (this.userSettings) {
      return this.userSettings.backgroundColor === Number(backgroundColor);
    }
  }

  shouldDeviceTypeBeChecked(deviceType: DeviceTypes): boolean {
    if (this.userSettings) {
      return this.userSettings.deviceType === Number(deviceType);
    }
  }

  shouldApplySelectedPointerColorCss(pointerColor: PointerColor): boolean {
    if (this.userSettings) {
      return this.userSettings.pointerColor === pointerColor;
    }
  }

  shouldApplySelectedPointerSizeCss(pointerSize: PointerSize): boolean {
    if (this.userSettings) {
      return this.userSettings.pointerSize === pointerSize;
    }
  }
}
