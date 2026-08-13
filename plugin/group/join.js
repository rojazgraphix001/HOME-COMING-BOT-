let handler = async (m, { EliteProTech, text }) => {
    if (!m.isOwner) {
        return m.reply('❌ This command is for the Owner only.')
    }

    if (!text?.trim()) {
        return m.reply('❌ Provide a group invite link.\n\nExample: .join https://chat.whatsapp.com/xxxxxxxx')
    }

    const match = text.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/)

    if (!match) {
        return m.reply('❌ That doesn\'t look like a valid WhatsApp group invite link.')
    }

    const code = match[1]

    try {
        await EliteProTech.groupAcceptInvite(code)
        await m.reply('✅ Successfully joined the group!')
    } catch (e) {
        await m.reply('❌ Failed to join the group. The link may be invalid or expired.')
    }
}

handler.command = ['join']

export default handler