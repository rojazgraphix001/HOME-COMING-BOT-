let handler = async (m, { text }) => {
    const quotedText = m.quoted?.text?.trim()
    const input = (text?.trim() || quotedText || '')

    if (!input) {
        return m.reply('❌ Please provide a link to shorten.\n\nExample: .shorturl https://example.com/some/long/link')
    }

    if (!/^https?:\/\//i.test(input)) {
        return m.reply('❌ That doesn\'t look like a valid URL. Make sure it starts with http:// or https://')
    }

    try {
        const url = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(input)}`
        const response = await fetch(url)
        const result = await response.text()

        if (!response.ok || result.startsWith('Error')) {
            return m.reply('❌ Failed to shorten that link.')
        }

        await m.reply(
            `🔗 *SHORTENED LINK*\n\n` +
            `📥 Original: ${input}\n` +
            `📤 Short: ${result.trim()}`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while shortening the link.')
    }
}

handler.command = ['shorturl', 'short']

export default handler