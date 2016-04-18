import {globalServiceInjectables} from './GlobalService';
import {userServiceInjectables} from './UserService';
import {userSettingsServiceInjectables} from './UserSettingsService';
import {imagesServiceInjectables} from './ImagesService';
import {userValidationServiceInjectables} from './UserValidationService';
import {uploadPictureServiceInjectables} from '../../components/upload/UploadPictureService';
import {alertingServiceInjectables} from '../../shared/services/AlertingService';
import {userSettingsColorsServiceInjectables} from '../../components/userSettings/UserSettingsColorsService';

export * from './GlobalService';
export * from './UserService';
export * from './UserSettingsService';
export * from './ImagesService';
export * from './UserValidationService';
export * from './AlertingService';
export * from '../../components/upload/UploadPictureService';
export * from '../../components/userSettings/UserSettingsColorsService';

export var servicesInjectables: Array<any> = [
  globalServiceInjectables,
  uploadPictureServiceInjectables,
  userServiceInjectables,
  userSettingsServiceInjectables,
  imagesServiceInjectables,
  alertingServiceInjectables,
  userSettingsColorsServiceInjectables,
  userValidationServiceInjectables
];
