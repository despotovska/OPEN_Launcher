// Class that represents the statistic entity from db
export class Statistic {
  constructor(
    public sessionID: string,
    public username: string,
    public gameName: string,
    public deviceType: number,
    public startTime: string,
    public endTime: string,
    public iterationsPassed: number,
    public invalidClicksCount: number) { }
}
