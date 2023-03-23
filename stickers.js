import WAWebJS from "whatsapp-web.js";
import chalk from 'chalk';

async function handleStickerMessage(msg, chat, contact) {
  switch (msg.body.toLowerCase()) {
    case "st":
      if (msg.hasMedia) {
        setTimeout(() => {
          msg.react('🐹');
          msg.reply(
            "*_Cargando Sticker, espera un poco y evita el spam._*"
          );
        }, 250);
        const media = await msg.downloadMedia();
        chat.sendMessage(media, {
          sendMediaAsSticker: true,
          quotedMessageId: msg.id._serialized,
          stickerName: "AskyBot",
        });

    //   console.log(chalk.green(`   ^=^r    ${contact.pushname} : Sticker sent!\n`));

      } else {
        msg.reply('*_Envia una imagen con el siguiente comando: st , evita hacer spam o de lo contrario serás bloqueado_*'
        );
      }
      break;
    case "!error":
      // console.log(new Error());
      new Error();
      break;
  }
}

export { handleStickerMessage };
