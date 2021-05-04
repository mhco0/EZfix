import request = require("request-promise");
import { Chat, Message, TimeMessage } from "../schemas/chat";
import Utils from "../schemas/utils";


var base_url = "http://localhost:3000";

describe("The server", () => {
    var server: any;

    beforeAll(() => { server = require('../ezfix-server') });

    afterAll(() => { server.closeServer() });

    it("adding a new message to chat service", () => {
        let options: any = {
            method: 'POST', uri: (base_url + "/chat/1"), body: {
                bytes : JSON.stringify({
                    type : 'message',
                    content: 'a new message teste'
                })
            }, json: true
        };

        return request.post(options).then((body : any) => {
                expect(body).toEqual({
                    "success" : "message added on chat service"
                });
            }).catch((error: any) => {
                expect(error).toEqual(null);
            });
    });

    it("failing in add a new message to chat service", () => {
        let options: any = {
            method: 'POST', uri: (base_url + "/chat/1"), body: {
                bytes : JSON.stringify({
                    type : 'message',
                    content: ''
                })
            }, json: true
        };

        return request.post(options).then((body : any) => {
                expect(body).toEqual({
                    "failure" : "message not added on chat service"
                });
            }).catch((error: any) => {
                expect(error).toEqual(null);
            });
    });

    it("getting some messages from server", async () => {
        let optionsPost: any = {
            method: 'POST', uri: (base_url + "/chat/1"), body: {
                bytes : JSON.stringify({
                    type : 'message',
                    content: 'some text'
                })
            }, json: true
        };

        let optionsGet: any = {
            method: 'GET', uri: (base_url + "/chat/1"),
            json: true
        };

        await request.post(optionsPost).then((body : any) => {
                expect(body).toEqual({
                    "success" : "message added on chat service"
                });
            }).catch((error: any) => {
                expect(error).toEqual(null);
            });

        return request.get(optionsGet).then((body : any) => {
            const messageList: any = JSON.parse(body.bytes);
            
            expect(messageList[messageList.length - 1].content).toEqual('some text');
        }).catch((error: any) => {
            expect(error).toEqual(null);
        });
    });

    it("testing if a needCensorship is working", () => {
        let text: string = "arrombado";
        let card: string = "5212345678901234";

        expect(Utils.needCensorship(text)).toEqual(true);
        expect(Utils.needCensorship(card)).toEqual(true);
    });

    it("checking json transform", () => {
        let message: Message = new Message("client", 'texto');
        let timeMessage: TimeMessage = new TimeMessage('provider', [{begin: "00:00", end: "23:59"}]);

        let messageConverted: any =  {
            type: 'message',
            sender: 'client',
            content: 'texto'
        };

        let timeConverted: any = {
            type: 'time_message',
            sender: 'provider',
            content: '',
            appointments: [{begin: "00:00", end: "23:59"}]
        };

        expect(message.toJson()).toEqual(messageConverted);

        expect(timeMessage.toJson()).toEqual(timeConverted);
    });

    it("create a new Chat and see if the add is working", () => {
        let chatForMessage: Chat = new Chat();
        let chatForTimeMessage: Chat = new Chat();

        for(let i = 0; i < 3; i++){

            chatForMessage.addMessage("client", 'texto');
            chatForTimeMessage.addTimeMessage('provider', [{begin: "00:00", end: "23:59"}]);
        }

        let messageArray = chatForMessage.getMessages();
        let messageTimeArray = chatForTimeMessage.getMessages();

        expect(messageArray.length).toEqual(3);
        expect(messageTimeArray.length).toEqual(3);

        for(let i = 0; i < 3; i++){
            let messageConverted: any =  {
                type: 'message',
                sender: 'client',
                content: 'texto'
            };

            let timeConverted: any = {
                type: 'time_message',
                sender: 'provider',
                content: '',
                appointments: [{begin: "00:00", end: "23:59"}]
            };

            expect(messageArray[i].toJson()).toEqual(messageConverted);
            expect(messageTimeArray[i].toJson()).toEqual(timeConverted);
        }
    });
})