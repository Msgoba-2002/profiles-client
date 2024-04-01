export interface AuthProfile {
  id: string;
  current_position: string;
  profile_picture: string;
}

export interface IProfile {
  id: string;
  user_id: string;
}

export interface IUploadUrl {
  url: string;
}

export interface IUploadedFile {
  file: File;
  name: string;
}

export interface CreateProfileRawForm {
  profile_picture: IUploadedFile[];
  phone_number: string;
  nickname?: string;
  birthday: Date;
  marital_status: string;
  occupation_status: string;
  occupation: string;
  place_of_work: string;
  place_of_residence: string;
  hobbies: string;
  bio: string;
}

export interface IProfileDto {
  profile_picture: string;
  phone_number: string;
  nickname?: string;
  birthday: Date;
  marital_status: string;
  occupation_status: string;
  occupation: string;
  place_of_work: string;
  place_of_residence: string;
  hobbies: string[];
  bio: string;
  final_class: string;
}

export interface IFullProfile extends IProfileDto {
  current_position: string;
}