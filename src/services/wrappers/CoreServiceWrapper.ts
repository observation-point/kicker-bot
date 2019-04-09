import { User } from '@kicker/core';
import { ServiceWrapper } from '../../components/restClient/ServiceWrapper';

class CoreServiceWrapper extends ServiceWrapper {
    public async createUser(
        userCreateData: { login: string; fullname: string; avatar?: string; }
    ): Promise<User> {
        return await this.post<User>('/user', userCreateData);
    }
}

export { CoreServiceWrapper };
