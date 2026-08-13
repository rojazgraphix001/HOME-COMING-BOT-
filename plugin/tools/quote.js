let handler = async (m) => {
    try {
        const response = await fetch(
            'https://dummyjson.com/quotes/random'
        )

        if (!response.ok) {
            return m.reply('❌ Could not get a quote.')
        }

        const data = await response.json()

        await m.reply(
            `💭 *RANDOM QUOTE*\n\n` +
            `"${data.quote}"\n\n` +
            `— ${data.author}`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong.')
    }
}

handler.command = ['quote']

export default handler