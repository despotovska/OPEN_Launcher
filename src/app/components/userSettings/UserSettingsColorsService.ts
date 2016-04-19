import {Injectable, bind} from 'angular2/core';

import {GlobalService} from '../../shared/services/GlobalService';
import {PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {EnumEx} from '../../shared/enums/EnumEx';

export interface IUserSettingsColorsService {
  getPointerColors(backgroundColor: BackgroundColor): PointerColor[];
}

@Injectable()
export class UserSettingsColorsService implements IUserSettingsColorsService {
  getPointerColors(backgroundColor: BackgroundColor): PointerColor[] {
    let inColorAvailablePointerColors = [
      PointerColor.White,
      PointerColor.Yellow,
      PointerColor.Green,
      PointerColor.Blue,
      PointerColor.Red
    ];
    let blackAndWhiteAvailablePointerColors = [
      PointerColor.White,
      PointerColor.Yellow
    ];

    return (Number(backgroundColor) === BackgroundColor.BlackAndWhite) ?
      blackAndWhiteAvailablePointerColors :
      inColorAvailablePointerColors;
  }
}

export let userSettingsColorsServiceInjectables: Array<any> = [
  bind(UserSettingsColorsService).toClass(UserSettingsColorsService)
];
