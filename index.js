const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session' }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above');
});

client.on('ready', () => {
    console.log(`${process.env.BOT_NAME || 'Bot'} is ready!`);
});

client.on('message', async msg => {
    if (msg.body === '.ping') {
        msg.reply('pong!');
    } else if (msg.body === '.menu') {
        msg.reply('📋 Menu:
.ping - Test Bot
.owner - Get Owner Number');
    } else if (msg.body === '.owner') {
        msg.reply(`👤 Owner: wa.me/${process.env.OWNER_NUMBER}`);
    }
});

client.initialize();