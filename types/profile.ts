export interface IUploadUrl {
  url: string;
}

export interface IUploadedFile {
  file: File;
  name: string;
}

export interface CreateProfileRawForm {
  profile_picture: IUploadedFile[];
  phoneNumber: string;
  nickname?: string;
  birthday: Date;
  maritalStatus: string;
  occupationStatus: string;
  occupation: string;
  placeOfWork: string;
  placeOfResidence: string;
  hobbies: string;
  bio: string;
}

export interface IProfileDto {
  phoneNumber: string;
  occupationStatus: string;
  occupation: string;
  placeOfWork: string;
  placeOfResidence: string;
  hobbies: string[];
  birthday: string;
  maritalStatus: string;
  nickname?: string;
  finalClass: string;
  bio: string;
  profilePictureUrl: string;
}

export interface IProfileUpdateDto extends Partial<IProfileDto>{}

export interface IFullProfile extends IProfileDto {
  current_position: string;
  id: string;
  user_id: string;
}

export interface IRandomProfile {
  id: string;
  fullName: string;
  profilePictureUrl: string;
  nickname?: string;
}

export interface ILimitedProfile {
  id: string;
  fullName: string;
  userId: string;
  occupationStatus: string;
  occupation?: string;
  placeOfWork?: string;
  placeOfResidence?: string;
  hobbies?: string[];
  birthday?: string;
  maritalStatus?: string;
  nickname?: string;
  finalClass?: string;
  bio?: string;
  profilePictureUrl: string;
}