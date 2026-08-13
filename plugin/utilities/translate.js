let handler = async (m, { text }) => {
    const quotedText = m.quoted?.text?.trim()

    let targetLang, toTranslate

    if (quotedText) {
        // Replying to a message: .translate fr
        targetLang = text?.trim().split(/\s+/)[0]
        toTranslate = quotedText
    } else {
        // No quote: .translate fr Hello, how are you?
        if (!text?.trim()) {
            return m.reply(
                '❌ Provide a language code, or reply to a message.\n\n' +
                'Example:\n' +
                '.translate fr Hello, how are you?\n' +
                '.translate es  (while replying to a message)'
            )
        }
        const args = text.trim().split(/\s+/)
        targetLang = args.shift()
        toTranslate = args.join(' ')
    }

    if (!targetLang) {
        return m.reply('❌ Please provide a target language code.\n\nExample: .translate fr (while replying to a message)')
    }

    if (!toTranslate) {
        return m.reply('❌ No text found to translate. Reply to a message or type text after the language code.')
    }

    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(toTranslate)}`
        const response = await fetch(url)

        if (!response.ok) {
            return m.reply('❌ Translation failed. Check the language code and try again.')
        }

        const data = await response.json()
        const translated = data[0].map(part => part[0]).join('')
        const detectedLang = data[2]

        await m.reply(
            `🌐 *TRANSLATION*\n\n` +
            `📥 Detected: ${detectedLang}\n` +
            `📤 To: ${targetLang}\n\n` +
            `${translated}`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while translating.')
    }
}

handler.command = ['translate', 'tr']

export default handler