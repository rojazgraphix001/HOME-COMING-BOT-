let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Ask me a question.\n\n' +
            'Example:\n' +
            '.8ball Will I become a good programmer?'
        )
    }

    const answers = [
        '🎯 Definitely!',
        '✅ Yes, absolutely.',
        '😎 Most likely.',
        '🤔 Maybe...',
        '⏳ Ask me again later.',
        '🙃 I am not sure.',
        '❌ Probably not.',
        '🚫 No.',
        '😂 Not a chance!'
    ]

    const answer = answers[
        Math.floor(Math.random() * answers.length)
    ]

    await m.reply(
        `🎱 *8 BALL*\n\n` +
        `❓ Question: ${text}\n\n` +
        `🔮 Answer: ${answer}`
    )
}

handler.command = ['8ball']

export default handler