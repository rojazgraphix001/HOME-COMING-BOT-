let handler = async (m) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    await m.reply(
        `👥 Group detected!\n\n` +
        `👤 Your number: ${m.sender}`
    )
}

handler.command = ['groupinfo']

export default handler