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

    var reader = new FileReader();
    
    reader.addEventListener("load", (event)=>{
                this.selectedImagePath = (<IDBOpenDBRequest>event.target).result;
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
