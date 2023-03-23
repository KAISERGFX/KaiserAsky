function rules(client) {
client.on('message_create', message => {

        if(message.body === '.reglas') {;
                message.reply('*_NO ENVÍAR CONTENIDO PORNOGRAFICO, ZOOFILIA O CUALQUIER FILIA, NO INSULTAR AL BOT, EVITAR HACER SPAM O INUNDACIÓN DE IMÁGENES, EVITAR ENVIAR ARCHIVOS MUY PESADOS, ROMPER UNA DE ESTAS REGLAS PUEDE CONLLEVAR A UN BLOQUEO PERMANENTE._*');
        }
});
}

export { rules };
