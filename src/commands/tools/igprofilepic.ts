import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";
import axios from "axios";
import bot from "../../client";

module.exports = {
    name: "igprofilepic",
    aliases: ['igpp'],
    description: "Mendapatkan profile picture dari username Instagram.",
    cooldown: 15,
    category: "tools",
    args: ["<argument>"],
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));

            let res = await axios.get(`https://api.dotmydotid.my.id/api/ig/profilepic?username=${ctx.args[0]}`, {
                responseType: 'arraybuffer'
            });

            if(res.data.error) return ctx.reply(generateMessage('error', { ctx }));

            bot.sendFile(ctx.id, res.data, '', '', ctx.msg);
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[IGPROFILEPIC ERR]", err)
        }
    }
}