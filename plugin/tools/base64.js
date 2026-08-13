let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Enter text to encode or decode.\n\n' +
            'Examples:\n' +
            '.base64 encode Hello World\n' +
            '.base64 decode SGVsbG8gV29ybGQ='
        )
    }

    const args = text.trim().split(/\s+/)
    const action = args.shift().toLowerCase()
    const input = args.join(' ')

    if (!input) {
        return m.reply('❌ Please provide some text.')
    }

    try {
        if (action === 'encode') {
            const result = Buffer.from(input, 'utf8').toString('base64')

            return m.reply(
                `🔐 *BASE64 ENCODE*\n\n` +
                `📝 Input: ${input}\n\n` +
                `🔑 Result:\n${result}`
            )
        }

        if (action === 'decode') {
            const result = Buffer.from(input, 'base64').toString('utf8')

            return m.reply(
                `🔓 *BASE64 DECODE*\n\n` +
                `🔑 Input: ${input}\n\n` +
                `📝 Result:\n${result}`
            )
        }

        return m.reply(
            '❌ Choose an action:\n\n' +
            '.base64 encode Hello World\n' +
            '.base64 decode SGVsbG8gV29ybGQ='
        )

    } catch (error) {
        console.error(error)
        return m.reply('❌ Unable to process the text.')
    }
}

handler.command = ['base64']

export default handler