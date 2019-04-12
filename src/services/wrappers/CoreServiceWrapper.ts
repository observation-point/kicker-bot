import { UserCreation, UserStats } from '@kicker/core';
import { ServiceWrapper } from '../../components/restClient/ServiceWrapper';

class CoreServiceWrapper extends ServiceWrapper {
    public async createUser(
        userCreateData: { login: string; fullname: string; avatar?: string; }
    ): Promise<UserCreation> {
        return await this.post<UserCreation>('/user', userCreateData);
    }

    public async getStats(userLogin: string): Promise<UserStats> {
        return await this.get<UserStats>('/user/stats', { login: userLogin });
    }
}

export { CoreServiceWrapper };
