import {GameModel} from './GameModel';

export class CategoryModel {
  constructor(public name: string, public games: Array<GameModel>) { }
}
