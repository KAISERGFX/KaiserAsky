import WAWebJS from "whatsapp-web.js";

const { Client } = WAWebJS;

async function handleMentions(client, msg) {

    if(msg.body === '.all') {
        const chat = await msg.getChat();

        let text = "";
        let mentions = [];


        let admins =
        chat.participants.find(admin =>
        admin.id._serialized ==
        msg.author);
        if (admins.isAdmin)

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);

            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
}
export { handleMentions };
