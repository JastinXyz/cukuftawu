import { Cooldown, Ctx, italic, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "quotly",
    description: "Buat sticker quotly.",
    cooldown: 4,
    category: "tools",
    args: ["<username>|<argument>"],
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));
            let [username, message] = ctx.args.join(' ').split("|");

            if(!username || !message) return ctx.reply(generateMessage('invalidUsage', { ctx, args: 'siapa kek|haha lucu' }));

            const sticker = new Sticker(`https://fastrestapis.fasturl.cloud/maker/quotly?name=${encodeURIComponent(username)}&text=${encodeURIComponent(message)}&bgColor=%23FFFFFF`, {
                pack: config.sticker.pack,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.sendMessage(ctx.id!, await sticker.toMessage());
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[QUOTLY ERR]", err)
        }
    }
}