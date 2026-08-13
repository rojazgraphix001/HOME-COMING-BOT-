let handler = async (m, { text }) => {
    if (!text) {
        return m.reply('❌ Example: .define computer')
    }

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(text)}`
        )

        if (!response.ok) {
            return m.reply('❌ Word not found.')
        }

        const data = await response.json()

        const word = data[0].word
        const meaning = data[0].meanings[0]
        const definition = meaning.definitions[0].definition

        await m.reply(
            `📖 *${word}*\n\n` +
            `🏷️ ${meaning.partOfSpeech}\n` +
            `📚 ${definition}`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while contacting the API.')
    }
}

handler.command = ['define']

export default handler