import {Component, Injector} from 'angular2/core';
import {Router, CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';
import {UploadPictureService} from './UploadPictureService';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {appInjector} from '../../../appInjector';

@Component({
  selector: 'upload-picture',
  templateUrl: `./app/components/upload/uploadPicture.html`,
  pipes: [TranslatePipe]
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = appInjector();
    let authService: AuthService = injector.get(AuthService);
    let router: Router = injector.get(Router);
    let isLogged = authService.isLogged();

    if (!isLogged) {
      router.navigate(['/Login']);
    }
    return isLogged;
  }
)
export class UploadPictureComponent {
  public selectedFile: File;
  public selectedImage: string;
  public selectedImagePath: string;

  constructor(private uploadPictureService: UploadPictureService) { }

  uploadFile(): void {
    this.uploadPictureService.upload(this.selectedFile);
    this.resetSelected();
  }

  onChange(event): void {
    this.selectedFile = event.srcElement.files[0];
    this.selectedImage = this.selectedFile.name;

    this.selectedImagePath = '';

    let reader = new FileReader();

    reader.addEventListener('load', (eventListener) => {
      this.selectedImagePath = (<IDBOpenDBRequest>eventListener.target).result;
    }, false);
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  resetSelected(): void {
    this.selectedImage = '';
    this.selectedFile = undefined;
  }
}
