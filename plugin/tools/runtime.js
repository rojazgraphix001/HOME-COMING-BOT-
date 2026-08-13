let handler = async (m) => {
    const uptime = process.uptime()

    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)

    await m.reply(
        `🤖 *BOT RUNTIME*\n\n` +
        `📅 Days: ${days}\n` +
        `⏰ Hours: ${hours}\n` +
        `⏱️ Minutes: ${minutes}\n` +
        `⚡ Seconds: ${seconds}`
    )
}

handler.command = ['runtime', 'uptime']

export default handler