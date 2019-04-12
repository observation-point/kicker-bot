declare module '@kicker/core' {
  type User = {
    id: string;
    login: string;
    fullname: string;
    avatar?: string;
    password: string;
    token?: string;
  };

  export type UserStats = {
    userId: string;
    avatar: string;
    fullname: string;
    rating: number;
    gamesCount: number;
    winsInAttack: number;
    winsInDefense: number;
  };

  export type UserCreation = {
    user: User;
  };
}