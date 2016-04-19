import {Component, Injector} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';
import {UploadPictureService} from './UploadPictureService';

@Component({
  selector: 'upload-picture',
  templateUrl: `./app/components/upload/uploadPicture.html`
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = Injector.resolveAndCreate([AuthService]);
    let authService: AuthService = injector.get(AuthService);
    return authService.isLogged();
  }
)
export class UploadPictureComponent {
  public selectedFiles: File[];
  public selectedImage: string;

  constructor(private uploadPictureService: UploadPictureService) { }

  uploadFile(): void {
    this.uploadPictureService.upload(this.selectedFiles[0]);
    this.resetSelected();
  }

  onChange(event): void {
    this.selectedFiles = event.srcElement.files;
    this.selectedImage = this.selectedFiles[0].name;
  }

  resetSelected(): void {
    this.selectedImage = '';
    this.selectedFiles = undefined;
  }
}
