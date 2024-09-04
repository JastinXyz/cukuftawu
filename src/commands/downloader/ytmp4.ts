import { Cooldown, Ctx } from "@mengkodingan/ckptw";

// @ts-ignore
import ytdl from 'node-yt-dl';

module.exports = {
    name: "ytmp4",
    description: "Youtube to MP4.",
    cooldown: 5,
    category: "downloader",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 5000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id!, '❌');
            let url = ctx.args[0];

            let { media } = await ytdl.mp4(url);

            if(!media) return ctx.react(ctx.id!, '❌');
            ctx.reply({ video: { url: media } });
        } catch (err) {
            ctx.react(ctx.id!, '❌');
            console.log("[TIKTOKDL ERR]", err)
        }
    }
}