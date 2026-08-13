let handler = async (m, { EliteProTech }) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    if (!m.isAdmin && !m.isOwner) {
        return m.reply('❌ Admins only!')
    }

    if (!m.isBotAdmin) {
        return m.reply('❌ I need to be an admin to remove members.')
    }

    const mentioned = m.mentionedJid?.[0]

    if (!mentioned) {
        return m.reply('❌ Mention the person you want to kick.\n\nExample: .kick @user')
    }

    try {
        await EliteProTech.groupParticipantsUpdate(m.chat, [mentioned], 'remove')

        await m.reply(
            `✅ *MEMBER REMOVED*\n\n` +
            `👤 User: @${mentioned.split('@')[0]}`,
            {
                mentions: [mentioned]
            }
        )
    } catch (e) {
        await m.reply('❌ Failed to remove that member. Make sure I have admin rights.')
    }
}

handler.command = ['kick', 'remove']

export default handler