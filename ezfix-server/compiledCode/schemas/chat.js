"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.TimeMessage = exports.Message = exports.messageValidContent = void 0;
const utils_1 = require("./utils");
function messageValidContent(messageJson) {
    if (messageJson.type == "message") {
        return messageJson.content != '';
    }
    else if (messageJson.type == "time_message") {
        return (messageJson.appointments.length > 0);
    }
    return false;
}
exports.messageValidContent = messageValidContent;
class Message {
    constructor(sender, content) {
        this.content = content;
        this.sender = sender;
    }
    getContent() {
        return this.content;
    }
    getSender() {
        return this.sender;
    }
    toJson() {
        return {
            type: "message",
            sender: this.sender,
            content: this.content
        };
    }
}
exports.Message = Message;
class TimeMessage extends Message {
    constructor(sender, appointments) {
        super(sender, '');
        this.appointments = utils_1.default.copyArray(appointments);
    }
    toJson() {
        return {
            type: "time_message",
            sender: this.getSender(),
            content: '',
            appointments: utils_1.default.copyArray(this.appointments)
        };
    }
}
exports.TimeMessage = TimeMessage;
class Chat {
    constructor() {
        this.messagesList = [];
    }
    addMessage(sender, content) {
        let message = new Message(sender, content);
        this.messagesList.push(message);
    }
    addTimeMessage(sender, appointments) {
        let timeMessage = new TimeMessage(sender, appointments);
        this.messagesList.push(timeMessage);
    }
    getMessages() {
        return this.messagesList;
    }
}
exports.Chat = Chat;
//# sourceMappingURL=chat.js.map