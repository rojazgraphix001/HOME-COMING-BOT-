let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Give me some choices.\n\n' +
            'Example:\n' +
            '.choose pizza, burger, chicken'
        )
    }

    const choices = text
        .split(',')
        .map(choice => choice.trim())
        .filter(Boolean)

    if (choices.length < 2) {
        return m.reply('❌ Please provide at least 2 choices.')
    }

    const selected = choices[
        Math.floor(Math.random() * choices.length)
    ]

    await m.reply(
        `🎲 *RANDOM CHOICE*\n\n` +
        `📋 Choices: ${choices.join(', ')}\n\n` +
        `🎯 I choose: *${selected}*`
    )
}

handler.command = ['choose']

export default handler