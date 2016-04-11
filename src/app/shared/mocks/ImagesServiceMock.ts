import {Observable} from 'rxjs/Rx';

import {IImagesService} from '../services/ImagesService';

export class ImagesServiceMock implements IImagesService {
  getProfileImages() {
    var profileImages = '["./app/assets/images/avatars/default.jpg", "./app/assets/images/avatars/devojce.png"]';
    var obj = JSON.parse(profileImages);
    return Observable.of(obj);
  }

  getPointerImages() {
    var pointerImages = '["./app/assets/images/pointer/small.png", "./app/assets/images/pointer/big.png"]';
    var obj = JSON.parse(pointerImages);
    return Observable.of(obj);
  }
}
