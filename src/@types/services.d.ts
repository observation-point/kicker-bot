declare module '@kicker/core' {
  export type User = {
    id: string;
    login: string;
    fullname: string;
    avatar?: string;
    password: string;
  };
}