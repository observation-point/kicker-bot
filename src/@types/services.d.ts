declare module '@kicker/core' {
  type User = {
    id: string;
    login: string;
    fullname: string;
    avatar?: string;
    password: string;
  };

  export type UserCreation = {
    user: User;
  };
}