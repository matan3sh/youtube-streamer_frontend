export enum QueryKeys {
  loggedInUser = "loggedInUser",
  videos = "videos",
}

export interface LoggedInUser {
  _id: string;
  email: string;
  username: string;
}
