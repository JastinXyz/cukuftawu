import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function hastebin(text: string) {
    const result = await axios(process.env.HASTE_SERVER + '/documents', {
        method: 'POST',
        data: text
    });

    return `${process.env.HASTE_SERVER}/${result.data.key}`;
}
