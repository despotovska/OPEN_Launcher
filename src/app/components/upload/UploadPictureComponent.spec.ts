import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {UploadPictureComponent} from './UploadPictureComponent';
import {UploadPictureService} from './UploadPictureService';
import {GlobalService} from '../../shared/services/GlobalService';
import {AlertingService} from '../alerting/AlertingService';

describe('UploadPictureComponentTests', () => {
  beforeEachProviders(() => [
    GlobalService,
    AlertingService,
    UploadPictureService,
    UploadPictureComponent
  ]);

  it('uploadFile_givenAvailableUploadPictureService_shouldResetSelectedImageAndFile',
    inject([UploadPictureComponent], (instance) => {
      // Arrange
      instance.selectedFiles = new Array<File>();
      spyOn(instance.uploadPictureService, 'upload').and.callFake(() => { });
      spyOn(instance, 'resetSelected').and.callFake(() => { });

      // Act
      instance.uploadFile();

      // Assert
      expect(instance.uploadPictureService.upload).toHaveBeenCalledWith(instance.selectedFiles[0]);
      expect(instance.resetSelected).toHaveBeenCalled();
    }));

  it('resetSelected_givenSelectedImage_shouldResetSelectedImageAndFile',
    inject([UploadPictureComponent], (instance) => {
      // Arrange
      instance.selectedFiles = new Array<File>();
      instance.selectedImage = 'image';

      // Act
      instance.resetSelected();

      // Assert
      expect(instance.selectedImage).toEqual('');
    }));
});
