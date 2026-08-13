let handler = async (m, { text }) => {
    if (!text) {
        return m.reply(
            '❌ Please enter a calculation.\n\n' +
            'Example:\n' +
            '.calc 25 * 4\n' +
            '.calc 100 / 5\n' +
            '.calc 10 + 20 - 5'
        )
    }

    try {
        // Only allow numbers and basic math operators
        if (!/^[0-9+\-*/().%\s]+$/.test(text)) {
            return m.reply('❌ Only numbers and basic math operators are allowed.')
        }

        const result = Function(`"use strict"; return (${text})`)()

        if (!Number.isFinite(result)) {
            return m.reply('❌ Invalid calculation.')
        }

        await m.reply(
            `🧮 *CALCULATOR*\n\n` +
            `📌 Problem: ${text}\n` +
            `✅ Answer: ${result}`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ I could not calculate that.')
    }
}

handler.command = ['calc', 'calculate']

export default handler