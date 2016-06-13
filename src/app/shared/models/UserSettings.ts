import {
  PointerColor,
  PointerSize,
  PointerType,
  BackgroundColor,
  DeviceTypes} from '../enums/UserSettingsEnums';

export interface IUserSettings {
  pointerType: PointerType;
  pointerSize: PointerSize;
  pointerColor: PointerColor;
  backgroundColor: BackgroundColor;
  deviceType: DeviceTypes;
}

export class UserSettings implements IUserSettings {
  pointerType: PointerType;
  pointerSize: PointerSize;
  pointerColor: PointerColor;
  backgroundColor: BackgroundColor;
  deviceType: DeviceTypes;
}
