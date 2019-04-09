import { UserCreation } from '@kicker/core';
import { ServiceWrapper } from '../../components/restClient/ServiceWrapper';

class CoreServiceWrapper extends ServiceWrapper {
    public async createUser(
        userCreateData: { login: string; fullname: string; avatar?: string; }
    ): Promise<UserCreation> {
        return await this.post<UserCreation>('/user', userCreateData);
    }
}

export { CoreServiceWrapper };
