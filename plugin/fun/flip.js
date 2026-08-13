let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Enter some text.\n\n' +
            'Example: .flip Hello World'
        )
    }

    const flipped = text
        .split('')
        .reverse()
        .join('')

    await m.reply(
        `🔄 *FLIP TEXT*\n\n` +
        `📝 Original: ${text}\n` +
        `🔁 Result: ${flipped}`
    )
}

handler.command = ['flip']

export default handler