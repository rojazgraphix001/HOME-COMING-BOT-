let handler = async (m, { EliteProTech, text }) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    if (!m.isAdmin && !m.isOwner) {
        return m.reply('❌ Admins only!')
    }

    if (!m.isBotAdmin) {
        return m.reply('❌ I need to be an admin to change the group name.')
    }

    if (!text?.trim()) {
        return m.reply('❌ Provide the new group name.\n\nExample: .setname My Cool Group')
    }

    try {
        await EliteProTech.groupUpdateSubject(m.chat, text.trim())

        await m.reply(
            `✅ *GROUP NAME UPDATED*\n\n` +
            `New name: *${text.trim()}*`
        )
    } catch (e) {
        await m.reply('❌ Failed to change the group name. Make sure I have admin rights.')
    }
}

handler.command = ['setname', 'setgname']

export default handler