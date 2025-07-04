const makeWASocket = require('@whiskeysockets/baileys').default
const { useMultiFileAuthState } = require('@whiskeysockets/baileys')
let sock

async function connectToWhatsapp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    sock = makeWASocket({ auth: state })
    sock.ev.on('creds.update', saveCreds)
}

async function getProfilePicture(number) {
    try {
        const jid = number + "@s.whatsapp.net"
        const dp = await sock.profilePictureUrl(jid, 'image')
        return dp
    } catch (e) {
        return null
    }
}

module.exports = { connectToWhatsapp, getProfilePicture }