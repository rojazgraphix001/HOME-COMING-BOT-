let handler = async (m, { EliteProTech, args }) => {
    if (!m.isGroup) {
        return m.reply('âŒ This command only works in groups.')
    }

    if (!m.isAdmin && !m.isOwner) {
        return m.reply('âŒ Admins only!')
    }

    if (!m.isBotAdmin) {
        return m.reply('âŒ I need to be an admin to add members.')
    }

    const number = args[0]?.replace(/[^0-9]/g, '')

    if (!number) {
        return m.reply('âŒ Provide the phone number to add.\n\nExample: .add 256700000000')
    }

    const jid = `${number}@s.whatsapp.net`

    try {
        const result = await EliteProTech.groupParticipantsUpdate(m.chat, [jid], 'add')
        const status = result?.[0]?.status

        if (status === '403') {
            return m.reply(
                `âš ï¸ Couldn't add @${number} directly (their privacy settings block it).\n` +
                `I'll try sending them an invite instead.`,
                { mentions: [jid] }
            )
        }

        await m.reply(
            `âœ… *MEMBER ADDED*\n\n` +
            `ðŸ‘¤ User: @${number}`,
            {
                mentions: [jid]
            }
        )
    } catch (e) {
        await m.reply('âŒ Failed to add that number. Make sure it\'s correct and I have admin rights.')
    }
}

handler.command = ['add']

export default handler
