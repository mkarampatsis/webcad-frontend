export interface IRoles {
  role: string;
  description: string;
  active: boolean;
}

export interface IUser {
  googleId?: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullname: string;
  photoUrl: string;
  roles: IRoles[];
}

export interface IRegisterUser {
  email: string;
  name: string;
  password: string;
}