import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import fs from 'fs'
import os from 'os'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegPath)

let handler = async (m, { EliteProTech }) => {
    const target = m.quoted?.mtype === 'videoMessage' ? m.quoted
        : m.mtype === 'videoMessage' ? m
        : null

    if (!target) {
        return m.reply('❌ Send a short video/GIF with .vsticker as the caption, or reply to one with .vsticker')
    }

    const buffer = await target.download()

    const tmpDir = os.tmpdir()
    const inputPath = path.join(tmpDir, `${Date.now()}-input.mp4`)
    const outputPath = path.join(tmpDir, `${Date.now()}-output.webp`)

    fs.writeFileSync(inputPath, buffer)

    try {
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .outputOptions([
                    '-vcodec', 'libwebp',
                    '-vf', "scale='min(512,iw)':'min(512,ih)':force_original_aspect_ratio=decrease,fps=10,pad=512:512:-1:-1:color=white@0.0",
                    '-loop', '0',
                    '-an',
                    '-vsync', '0',
                    '-t', '6'
                ])
                .toFormat('webp')
                .save(outputPath)
                .on('end', resolve)
                .on('error', reject)
        })

        const webpBuffer = fs.readFileSync(outputPath)

        if (webpBuffer.length > 1_000_000) {
            return m.reply('❌ That clip made too large a sticker. Try something shorter (under 6s).')
        }

        await EliteProTech.sendMessage(m.chat, {
            sticker: webpBuffer
        }, { quoted: m })

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while creating the animated sticker.')
    } finally {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath)
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath)
    }
}

handler.command = ['vsticker', 'vs']

export default handler