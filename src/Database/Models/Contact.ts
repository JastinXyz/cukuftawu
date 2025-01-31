import { ExtendedClient } from "../../common/types";

export async function addContact(bot: ExtendedClient, jid: string) {
    let contacts = await bot.db.get('contacts') || [];
    let contactExists = contacts.some((contact: { id: string }) => contact.id === jid);
    if (!contactExists) {
        await bot.db.push('contacts', { id: jid });
        bot.consolefy?.info("Contact Initiated", jid);
    }
}