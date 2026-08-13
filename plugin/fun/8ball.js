let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            'âŒ Ask me a question.\n\n' +
            'Example:\n' +
            '.8ball Will I become a good programmer?'
        )
    }

    const answers = [
        'ðŸŽ¯ Definitely!',
        'âœ… Yes, absolutely.',
        'ðŸ˜Ž Most likely.',
        'ðŸ¤” Maybe...',
        'â³ Ask me again later.',
        'ðŸ™ƒ I am not sure.',
        'âŒ Probably not.',
        'ðŸš« No.',
        'ðŸ˜‚ Not a chance!'
    ]

    const answer = answers[
        Math.floor(Math.random() * answers.length)
    ]

    await m.reply(
        `ðŸŽ± *8 BALL*\n\n` +
        `â“ Question: ${text}\n\n` +
        `ðŸ”® Answer: ${answer}`
    )
}

handler.command = ['8ball']

export default handler
