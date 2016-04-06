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
    var inColorAvailablePointerColors = [
      PointerColor.White,
      PointerColor.Yellow,
      PointerColor.Green,
      PointerColor.Blue,
      PointerColor.Red
    ];
    var blackAndWhiteAvailablePointerColors = [
      PointerColor.White,
      PointerColor.Yellow
    ];

    return (Number(backgroundColor) === BackgroundColor.BlackAndWhite) ?
      blackAndWhiteAvailablePointerColors :
      inColorAvailablePointerColors;
  }
}

export var userSettingsColorsServiceInjectables: Array<any> = [
  bind(UserSettingsColorsService).toClass(UserSettingsColorsService)
];
