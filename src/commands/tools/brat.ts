import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "brat",
    aliases: ['sbrat', 'stikerbrat', 'stickerbrat'],
    description: "Buat sticker brat.",
    cooldown: 20,
    category: "tools",
    args: ["<argument>"],
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));

            const sticker = new Sticker(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(ctx.args.join(' '))}`, {
                pack: config.sticker.pack,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.reply(await sticker.toMessage());
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[BRAT ERR]", err)
        }
    }
}