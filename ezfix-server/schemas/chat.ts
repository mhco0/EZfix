import Utils from "./utils";

export type SenderType = "client" | "provider";

export class Message {
    private sender: SenderType;
    private content: string;

    constructor(sender: SenderType, content: string){
        this.sender = sender;
        this.content = content;
    }

    getContent(){
        return this.content;
    }

    getSender(){
        return this.sender;
    }

    toJson(){
        return {
            type: "message",
            sender: this.sender,
            content: this.content
        };
    }
}

export class TimeMessage extends Message {
    private appointments : Array<any>;

    constructor(sender: SenderType, appointments: Array<any>){
        super(sender, '');
        this.appointments = Utils.copyArray(appointments);
    }

    toJson(){
        return {
            type: "time_message",
            sender: this.getSender(),
            content: '',
            appointments: Utils.copyArray(this.appointments)
        }
    }
}

export class Chat {
    private messagesList: Array<Message>;

    constructor(){
        this.messagesList = [];
    }

    addMessage(sender: SenderType, content: string){
        let message = new Message(sender, content);

        this.messagesList.push(message);
    }

    addTimeMessage(sender: SenderType, appointments: Array<any>){
        let timeMessage = new TimeMessage(sender, appointments);

        this.messagesList.push(timeMessage);
    }

    getMessages(){
        return this.messagesList;
    }
}