import { Cooldown, Ctx } from "@mengkodingan/ckptw";
import axios from "axios";

module.exports = {
    name: "tiktokdl",
    description: "Tiktok downloader.",
    cooldown: 5,
    category: "downloader",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 5000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id!, '❌');
            let url = ctx.args[0];

            let { data } = await axios('https://api.tiklydown.eu.org/api/download?url=' + url);

            if(!data.images && !data.video) return ctx.react(ctx.id!, '❌');
            
            if(data.video) {
                let { data: cover } = await axios(data.video.origin_cover, {
                    responseType: 'arraybuffer'
                });

                ctx.reply({ video: { url: data.video.noWatermark }, caption: data.title, jpegThumbnail: cover });
            } else if(data.images) {
                data.images.map((img: { url: string }) => {
                    ctx.reply({ image: { url: img.url }, caption: data.title });
                });
            }
        } catch (err) {
            ctx.react(ctx.id!, '❌');
            console.log("[TIKTOKDL ERR]", err)
        }
    }
}