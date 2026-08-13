let handler = async (m) => {
    const now = new Date()

    const time = now.toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Kampala',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    const date = now.toLocaleDateString('en-GB', {
        timeZone: 'Africa/Kampala',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    await m.reply(
        `🕐 *UGANDA TIME 🇺🇬*\n\n` +
        `📅 Date: ${date}\n` +
        `⏰ Time: ${time}\n` +
        `🌍 Timezone: EAT (UTC+3)`
    )
}

handler.command = ['time']

export default handler