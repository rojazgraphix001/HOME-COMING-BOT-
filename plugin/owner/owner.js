import config from '../../config.js'

let handler = async (m) => {
    let sender = m.sender
        .split('@')[0]
        .split(':')[0]

    if (sender !== config.owner) {
        return m.reply(config.botMessage.owner)
    }

    await m.reply(
        `👑 Hello ${config.ownerName}!\n\n` +
        `You are the bot owner.`
    )
}

handler.command = ['owner']

export default handler