import { resolve } from 'path';
import { requireConfigsByPattern } from './requireConfigObject';

type FullConfiguration = {
    [key: string]: Configuration;
};

type Configuration = {
    [key: string]: any;
};

/*
 * @class AppConfigBuilder
 * @classdesc Реквайрит содержимое указанной папки,
 * сохраняя в памяти в виде структуры Map
 */
class AppConfigLoader {
    private configPath: string;
    private fullConfig: Map<string, Configuration>;

    constructor(pathToConfigDir: string) {
        const wildcard = '*';
        this.configPath = resolve(pathToConfigDir, wildcard);
        this.fullConfig = new Map<string, Configuration>();
        this.init();
    }

   /*
    * @param {string} name Название файла из папки конфигов. Без расширения
    */
    public getConfig<T extends Configuration>(name: string): T | never {
        const config = this.fullConfig.get(name);
        if (!config) {
            throw new Error(`Config not found! Name: ${name}`);
        }
        return config as T;
    }

    public getFull(): FullConfiguration {
        const configObject: FullConfiguration = {};
        [...this.fullConfig].forEach((config) => {
            configObject[config[0]] = config[1];
        });
        return configObject;
    }

    public print(): void {
        [...this.fullConfig].forEach((config) => {
            try {
                console.log(JSON.stringify(config[1], null, 2));
            } catch (error) {
                console.error(`Error: Config parse error - ${config[0]}`);
            }
        });
    }

    private init(): void {
        requireConfigsByPattern([this.configPath])
                .forEach((config) => {
                this.fullConfig.set(config.name, config.content);
            });
    }
}

export { AppConfigLoader };
