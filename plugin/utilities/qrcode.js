let handler = async (m, { EliteProTech, text }) => {
    const quotedText = m.quoted?.text?.trim()
    const input = (text?.trim() || quotedText || '')

    if (!input) {
        return m.reply('❌ Please provide text or a link to turn into a QR code.\n\nExample: .qrcode https://example.com')
    }

    try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(input)}`

        await EliteProTech.sendFile(
            m.chat,
            url,
            'qrcode.png',
            `🔳 *QR CODE*\n\n📥 Content: ${input}`,
            m
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while generating the QR code.')
    }
}

handler.command = ['qrcode', 'qr']

export default handler
