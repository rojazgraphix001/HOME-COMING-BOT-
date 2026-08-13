let handler = async (m, { text }) => {
    if (!text) {
        return m.reply('Example: .say Hello bro')
    }

    await m.reply(text)
}

handler.command = ['say']

export default handler