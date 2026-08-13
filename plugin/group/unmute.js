let handler = async (m, { EliteProTech }) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    if (!m.isAdmin && !m.isOwner) {
        return m.reply('❌ Admins only!')
    }

    if (!m.isBotAdmin) {
        return m.reply('❌ I need to be an admin to change group settings.')
    }

    try {
        await EliteProTech.groupSettingUpdate(m.chat, 'not_announcement')

        await m.reply(
            `🔊 *GROUP UNMUTED*\n\n` +
            `Everyone can send messages now.`
        )
    } catch (e) {
        await m.reply('❌ Failed to unmute the group. Make sure I have admin rights.')
    }
}

handler.command = ['unmute', 'unlock']

export default handler