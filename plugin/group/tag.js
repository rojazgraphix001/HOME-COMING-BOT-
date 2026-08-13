let handler = async (m) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    const mentioned = m.mentionedJid?.[0]

    if (!mentioned) {
        return m.reply(
            '❌ Mention someone.\n\n' +
            'Example: .tag @user'
        )
    }

    await m.reply(
        `👋 Hello @${mentioned.split('@')[0]}!`,
        {
            mentions: [mentioned]
        }
    )
}

handler.command = ['tag']

export default handler