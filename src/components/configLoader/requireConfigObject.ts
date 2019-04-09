import * as path from 'path';

export type ConfigFile = {
    name: string;
    content: any;
};

function removeFromNodeCache(id: string): void {
    delete require.cache[require.resolve(id)];
}

export function requireConfigsByPattern(directories: string[]): ConfigFile[] {
    const formats = ['.js', '.json'];
    const allFiles = directories.reduce(
        (allDirs, dir) => allDirs.concat(require('glob').sync(path.normalize(dir))),
        [] as string[]
    );

    return allFiles
        .filter((file) => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
        })
        .map((pathTofile) => {
            const fileName = path.basename(pathTofile);
            removeFromNodeCache(pathTofile);
            const config: ConfigFile = {
                name: fileName.slice(0, fileName.lastIndexOf(formats[0])),
                content: require(pathTofile),
            };
            return config;
        })
        .filter(loaded => loaded.content);
}
