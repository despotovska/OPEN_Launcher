import {
  PointerColor,
  PointerSize,
  PointerType,
  BackgroundColor,
  DeviceType} from '../enums/UserSettingsEnums';

export interface IUserSettings {
  pointerType: PointerType;
  pointerSize: PointerSize;
  pointerColor: PointerColor;
  backgroundColor: BackgroundColor;
  deviceType: DeviceType;
}

export class UserSettings implements IUserSettings {

  constructor(
    public pointerType?: PointerType,
    public pointerSize?: PointerSize,
    public pointerColor?: PointerColor,
    public backgroundColor?: BackgroundColor,
    public deviceType?: DeviceType) { }
}
