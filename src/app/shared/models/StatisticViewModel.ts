import {DeviceType} from '../enums/UserSettingsEnums';
import {Duration} from '../models/Duration';

export interface IStatisticViewModel {
  username: string;
  deviceType: string;
  startTime: Date;
  duration: Duration;
}

export class SetsStatisticViewModel implements IStatisticViewModel {
  constructor(
    public username: string,
    public deviceType: string,
    public startTime: Date,
    public duration: Duration,
    public iterationsPassed: number,
    public invalidClicksCount: number) { }
}
