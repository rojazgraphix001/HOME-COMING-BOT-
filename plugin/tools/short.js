let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Send a URL to shorten.\n\n' +
            'Example:\n' +
            '.short https://example.com'
        )
    }

    if (!/^https?:\/\//i.test(text.trim())) {
        return m.reply('❌ Please provide a valid URL starting with http:// or https://')
    }

    try {
        const url = encodeURIComponent(text.trim())

        const response = await fetch(
            `https://is.gd/create.php?format=json&url=${url}`
        )

        const data = await response.json()

        if (!response.ok || data.errorcode) {
            return m.reply('❌ Could not shorten that URL.')
        }

        await m.reply(
            `🔗 *URL SHORTENER*\n\n` +
            `📎 Original:\n${text.trim()}\n\n` +
            `⚡ Short URL:\n${data.shorturl}`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while shortening the URL.')
    }
}

handler.command = ['short', 'shorten']

export default handler