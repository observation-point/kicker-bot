declare module '@kicker/core' {
  export type User = {
    id: number;
    login: string;
    fullname: string;
    avatar?: string;
    password?: string;
  };
}