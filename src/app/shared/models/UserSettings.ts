import {
  PointerColor,
  PointerSize,
  PointerType,
  BackgroundColor,
  DeviceType} from '../enums/UserSettingsEnums';

export class UserSettings {
  constructor(
    public pointerType?: PointerType,
    public pointerSize?: PointerSize,
    public pointerColor?: PointerColor,
    public backgroundColor?: BackgroundColor,
    public deviceType?: DeviceType) { }
}
