export class MessageHandler {
    [key: string]: Function | string[];

    public eventNameList: string[] = [];

    public on(message: string, handler: Function): void | never {
        if (typeof handler !== 'function') {
            const type = toString.call(handler);
            const msg =
                `EventHandler. on() requires` +
                ` callback functions but got a ${type}`;
            throw new Error(msg);
        }
        this.eventNameList.push(message);
        this[message] = handler;
    }
}