import {DeviceType} from '../enums/UserSettingsEnums';
import {Duration} from '../models/Duration';
export class StatisticViewModel {
  constructor(
    public username: string,
    public deviceType: DeviceType,
    public duration: Duration,
    public iterationsPassed: number,
    public invalidClicksCount: number) { }
}
