import config from '../../config.js'

let handler = async (m, { text }) => {
    let sender = m.sender
        .split('@')[0]
        .split(':')[0]

    // Owner only
    if (sender !== config.owner) {
        return m.reply(config.botMessage.owner)
    }

    if (!text) {
        return m.reply(
            `⚙️ *BOT MODE*\n\n` +
            `Current mode: *${config.botMode}*\n\n` +
            `Use:\n` +
            `.mode public\n` +
            `.mode self`
        )
    }

    let mode = text.toLowerCase().trim()

    if (mode !== 'public' && mode !== 'self') {
        return m.reply(
            '❌ Invalid mode.\n\n' +
            'Use `.mode public` or `.mode self`'
        )
    }

    config.botMode = mode

    await m.reply(
        `✅ *BOT MODE UPDATED*\n\n` +
        `Mode: *${mode.toUpperCase()}*`
    )
}

handler.command = ['mode']

export default handler