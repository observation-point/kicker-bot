import { MessageHandler } from '../../components/discord/MessageHandler';
import { MessageController } from './Controller';

const messageController = new MessageController();
const supportedMessages = MessageController.MESSAGES;

export const messageHandler = new MessageHandler();

messageHandler.on(supportedMessages.HELP, messageController.actionGetHelp);
messageHandler.on(supportedMessages.ADD_ME, messageController.actionAddMe);
