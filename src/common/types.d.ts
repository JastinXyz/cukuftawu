import { Client } from "@mengkodingan/ckptw";
import { QuickDB } from "quick.db";

export interface Config {
    client: Client;
    commandHandlerLog: boolean;
    botOwnerID: Array<string>;
    hasteServer: string;
    sticker: { pack: string; author: string };
    message: {
        cooldown: string;
        invalidUsage: string;
        error: string;
        onlyOwner: string;
        onlyGroup: string;
        onlyAdmin: string;
        maxCharacter: string;
        banned: string;
    };
}

interface ExtendedClient extends Client {
    db: QuickDB;
    sendFile: (jid: any, path: any, fileName: string | undefined, caption: string | undefined, quoted: any, options?: {}) => Promise<any>;
    getFile: (path: string | Buffer) => Promise<{ res: any, mime: string, ext: string, data: Buffer }>;
}