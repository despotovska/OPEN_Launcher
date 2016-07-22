import {DeviceTypes} from '../enums/UserSettingsEnums';
export class StatisticViewModel {
  constructor(
    public username: string,
    public deviceType: DeviceTypes,
    public duration: string,
    public iterationsPassed: number,
    public invalidClicksCount: number) { }
}
