let handler = async (m, { EliteProTech }) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    if (!m.isAdmin && !m.isOwner) {
        return m.reply('❌ Admins only!')
    }

    if (!m.isBotAdmin) {
        return m.reply('❌ I need to be an admin to fetch the invite link.')
    }

    try {
        const code = await EliteProTech.groupInviteCode(m.chat)

        await m.reply(
            `🔗 *GROUP INVITE LINK*\n\n` +
            `https://chat.whatsapp.com/${code}`
        )
    } catch (e) {
        await m.reply('❌ Failed to fetch the invite link. Make sure I have admin rights.')
    }
}

handler.command = ['groupinvite', 'invitelink', 'glink']

export default handler