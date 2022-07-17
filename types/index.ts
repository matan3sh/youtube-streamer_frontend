export interface Video {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
}

export enum QueryKeys {
  loggedInUser = "loggedInUser",
  videos = "videos",
}

export interface LoggedInUser {
  _id: string;
  email: string;
  username: string;
}
