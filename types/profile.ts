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
  birthday: string;
  marital_status: string;
  occupation_status: string;
  occupation: string;
  place_of_work: string;
  place_of_residence: string;
  hobbies: string[];
  bio: string;
  final_class: string;
}

export interface IProfileUpdateDto extends Partial<IProfileDto>{}

export interface IFullProfile extends IProfileDto {
  current_position: string;
  id: string;
  user_id: string;
}

export interface IRandomProfile {
  id: string;
  first_name: string;
  last_name: string;
  Profile: {
    id: string;
    profile_picture: string;
    nickname?: string;
  }
}

export interface ILimitedProfile {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  id: string;
  bio: string;
  birthday: string;
  final_class: string;
  hobbies: string[];
  marital_status: string;
  nickname?: string;
  occupation?: string;
  occupation_status: string;
  place_of_work?: string;
  place_of_residence: string;
  profile_picture: string;
}