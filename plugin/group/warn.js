const warnings = new Map()

let handler = async (m) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    if (!m.isAdmin) {
        return m.reply('❌ Admins only!')
    }

    const mentioned = m.mentionedJid?.[0]

    if (!mentioned) {
        return m.reply('❌ Mention the person you want to warn.\n\nExample: .warn @user')
    }

    const currentWarnings = warnings.get(mentioned) || 0
    const newWarnings = currentWarnings + 1

    warnings.set(mentioned, newWarnings)

    await m.reply(
        `⚠️ *WARNING*\n\n` +
        `👤 User: @${mentioned.split('@')[0]}\n` +
        `🔢 Warnings: ${newWarnings}/3`,
        {
            mentions: [mentioned]
        }
    )
}

handler.command = ['warn']

export default handler