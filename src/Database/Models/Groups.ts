import { ExtendedClient } from "../../common/types";

export async function initGroups(bot: ExtendedClient) {
    let groups = await bot.groups();
    let groupJids = Object.keys(groups);

    for (let i = 0; i < groupJids.length; i++) {
        let hasInDB = await bot.db.has(`groups.${groupJids[i].replace("@g.us", "")}`);
        if (!hasInDB && groups[groupJids[i]].participants.length < 300) {
            let topush = groups[groupJids[i]].participants.map((x) => ({ ...x, sent: 0 }));
            await bot.db.set(`groups.${groupJids[i].replace("@g.us", "")}`, topush);
            bot.consolefy?.info("Group Initiated", groups[groupJids[i]].subject);
        }
    }
}

export async function initSingleGroup(bot: ExtendedClient, jid: string) {
    let metadata = await bot.core.groupMetadata(jid);
    if (metadata.participants.length < 300) {
        let topush = metadata.participants.map((x) => ({ ...x, sent: 0 }));
        await bot.db.set(`groups.${jid.replace("@g.us", "")}`, topush);
        bot.consolefy?.info("Group Initiated", metadata.subject);
    }
}
