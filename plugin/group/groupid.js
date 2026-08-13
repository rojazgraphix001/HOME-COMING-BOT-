let handler = async (m) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    await m.reply(
        `👥 *GROUP INFORMATION*\n\n` +
        `🆔 Group ID:\n${m.chat}`
    )
}

handler.command = ['groupid']

export default handler