let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Enter some text.\n\n' +
            'Example: .reverse Hello World'
        )
    }

    const reversed = text.split('').reverse().join('')

    await m.reply(
        `🔄 *REVERSE TEXT*\n\n` +
        `📝 Original: ${text}\n` +
        `🔁 Reversed: ${reversed}`
    )
}

handler.command = ['reverse']

export default handler