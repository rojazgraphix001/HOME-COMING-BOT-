import sharp from 'sharp'

let handler = async (m, { EliteProTech }) => {
    const target = m.quoted?.mtype === 'imageMessage' ? m.quoted
        : m.mtype === 'imageMessage' ? m
        : null

    if (!target) {
        return m.reply('❌ Send an image with .sticker as the caption, or reply to an image with .sticker')
    }

    try {
        const buffer = await target.download()

        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .webp()
            .toBuffer()

        await EliteProTech.sendMessage(m.chat, {
            sticker: webpBuffer
        }, { quoted: m })

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while creating the sticker.')
    }
}

handler.command = ['sticker', 's']

export default handler