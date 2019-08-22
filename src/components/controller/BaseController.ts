
import { MainLogger } from '../log';

export abstract class BaseController {
  [key: string]: Function | any;

  constructor() {
    this.wrapActions();
  }

  private wrapActions() {
    const prototypeOfThis = Object.getPrototypeOf(this);
    const actionNames =
            Object.getOwnPropertyNames(prototypeOfThis)
            .filter(propertyName => propertyName.substring(0, 6) === 'action');
    actionNames.forEach((actionName) => {
      const action = this[actionName].bind(this);

      this[actionName] = async(params: any) => {
        let actionResult = false;
        try {
          await action(params);
          actionResult = true;
        } catch (exception) {
          actionResult = this.handleException(exception);
        }
        return actionResult;
      };
    });

  }

  private handleException(exception: Error): boolean {
    MainLogger.error(exception.message);
    return false;
  }
}
