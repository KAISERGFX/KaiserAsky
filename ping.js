function ping(client) {
  client.on('message_create', message => {
    if (message.body === '.ping') {
      const timestamp = new Date(); // Obtiene la marca de tiempo actual
      message.reply('*_⏱️MIDIENDO LATENCIA⏱️_*').then(sentMessage => {
        const latency = new Date() - timestamp; // Calcula la diferencia de tiempo
        message.reply(`*_Tu ping actual es de_*: ${latency} ms`); // Envía un nuevo mensaje con la latencia medida
      });
    }
  });
}

export { ping };
