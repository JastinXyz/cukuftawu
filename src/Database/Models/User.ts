import { ExtendedClient } from "../../common/types";

export async function addUser(bot: ExtendedClient, jid: string) {
    let userExists = await bot.db.has(`users.${jid}`);
    if (!userExists) {
        await bot.db.set(`users.${jid}`, { exp: 0 });
        bot.consolefy?.info("User Initiated", jid);
    }
}
