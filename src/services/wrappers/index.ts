import { configLoader } from '../../components/configLoader';
import { ServicesConfig } from '../../components/config';
import { CoreServiceWrapper } from './CoreServiceWrapper';

const config = configLoader.getConfig<ServicesConfig>('services');

export const coreService = new CoreServiceWrapper(config.core.path, config.core.token);
