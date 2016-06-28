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

  constructor(
    public pointerType?: PointerType,
    public pointerSize?: PointerSize,
    public pointerColor?: PointerColor,
    public backgroundColor?: BackgroundColor,
    public deviceType?: DeviceTypes) { }
}
