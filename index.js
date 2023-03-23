import FfmpegPath from '@ffmpeg-installer/ffmpeg';
import WAWebJS from "whatsapp-web.js";
import qrcode from 'qrcode-terminal'
import Spinnies from "spinnies";
import chalk from 'chalk';
import fs from 'fs';
import igdl from 'fg-ig';
import axios from 'axios';
import path from 'path';

import { handleStickerMessage } from './stickers.js';
import { handleMentions } from './all.js';
import { igdown } from './ig.js';
import { ping } from './ping.js';
import { rules } from './rules.js';
import { ttdown } from './tt.js';
import { twdown } from './tw.js';
import { fbdown }  from './fb.js';



const spinnies = new Spinnies();
const ffmpegPath = FfmpegPath.path;
const { Client, LocalAuth, MessageMedia } = WAWebJS;


const client = new Client({
  authStrategy: new LocalAuth({
clientId: "client-one",
dataPath: path.join("./wwebjs_auth/")
}),
  ffmpegPath,
  puppeteer: {
      executablePath: '/usr/bin/google-chrome-stable',
                args: ['--no-sandbox']
        }
});

console.log(chalk.green('\n🤖 Bot de WhatsApp hecho por Rey.\n'));

// Init Bot
client.initialize();

spinnies.add('Connecting', { text: 'Opening Whatsapp Web' })

client.on('loading_screen', (percent, message) => {
  // console.log('', percent, message);
  spinnies.update('Connecting', { text: `Connecting. ${message} ${percent}%`});
});

// On Login
client.on('qr', (qr) => {
  spinnies.add('generateQr', {text: 'Generating QR Code'});
  console.log(chalk.yellow('[!] Scan QR Code Bellow'));
  qrcode.generate(qr, {small: true});
  spinnies.succeed('generateQr', {text: 'QR Code Generated'});
  spinnies.update('Connecting', { text: 'Waiting to scan' })
});

// Authenticated
client.on('authenticated', () => {
  // spinnies.update('Connecting', {text: ''});
  console.log(chalk.green(`✓ Authenticated!                          `))
});

// Auth Failure
client.on('auth_failure', (msg) => {
  console.error('Authentication Failure!', msg);
});

// Bot Ready
client.on('ready', () => {
  spinnies.succeed('Connecting', { text: 'Connected!', successColor: 'greenBright' });
  aboutClient(client);
  console.log('Incoming Messages : \n');
});

//stickers
client.on('message_create', async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  console.log(chalk.cyan(`   ^=^r    ${contact.pushname} : ${msg.body}\n`));

  try {
    switch (msg.body.toLowerCase()) {
      case 'st':
        await handleStickerMessage(msg, chat);
        break;
      case '!error':
        new Error();
        break;
    }
  } catch (error) {
    console.error(error);
  };
});

//IG
client.on('message_create', async (msg, MessageMedia) => {
  await igdown(msg);
});;

//tt
client.on('message_create', async (msg, MessageMedia) => {
  await ttdown(msg);
});;


//tw
client.on('message_create', async (msg, MessageMedia) => {
  await twdown(msg);
});;

//fb
client.on('message_create', async (msg, MessageMedia) => {
  await fbdown(msg);
});;


//todos
client.on('message_create', async (msg) => {
  handleMentions(client, msg);
});

//ping
ping(client);


//rules
rules(client);

// Disconnected
client.on('disconnected', (reason) => {
  console.log('Client was logged out, Reason : ', reason);
});

function aboutClient(client){
  console.log(chalk.cyan(
    '\nAbout Client :' +
    '\n  - Username : ' + client.info.pushname +
    '\n  - Phone    : ' + client.info.wid.user +
    '\n  - Platform : ' + client.info.platform + '\n'
  ));
};
