import { default as whatsappWeb } from 'whatsapp-web.js';
import igdl from 'fg-ig';
import axios from 'axios';

async function fbdown(msg) {
  switch(true) {
    case msg.body.startsWith('.fb'):
      const link = msg.body.slice(4).trim();
      if (link.length === 0) {
   msg.reply('⚠️ *_Debes ingresar el comando .fb seguido del link de Facebook que quieras descargar._* ⚠️');
        return;
      }

      msg.reply('*_Asky está descargando tu archivo, por favor espera... ⏱️_*');

      igdl(link)
      .then(async (res) => {
        let media = await whatsappWeb.MessageMedia.fromUrl(res.url_list[0], { unsafeMime: true });
        msg.reply(media);
      });
      break;
  }
}

export { fbdown };
