import {Injectable, bind} from 'angular2/core';
import {Http} from 'angular2/http';

import {GlobalService} from './GlobalService';

import {User} from '../models/User';

export interface IImagesService {
  getProfileImages(): any;
  getPointerImages(): any;
}

@Injectable()
export class ImagesService implements IImagesService {
  constructor(private http: Http, private globalService: GlobalService) { }

  getProfileImages() {
    return this.http.get(this.globalService.URL_GETPROFILE_IMAGES)
      .map(res => {
        return res.json();
      });
  }

  getPointerImages() {
    return this.http.get(this.globalService.URL_GETPOINTER_IMAGES)
      .map(res => {
        return res.json();
      });
  }
}

export let imagesServiceInjectables: Array<any> = [bind(ImagesService).toClass(ImagesService)];
