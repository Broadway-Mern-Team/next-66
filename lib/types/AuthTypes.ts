import {LoginData} from "@/components/auth/LoginForm"

export type ImageType = {
  name: string;
  path: string;
  size: number;
  url: string;
};

export interface IUserDetail {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  phone: string;
  image: ImageType;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthContextType = {
  loggedInUser: null | IUserDetail;
  login: (data: LoginData) => Promise<void | IUserDetail>;
  getLoggedInUser: () => Promise<void | IUserDetail>;
};

export type LoginReponse =  {
  result: {
    token: string, refreshToken: string
  },
  message: string
}

export type GetUserDetailReponse =  {
  result: IUserDetail,
  message: string
}
