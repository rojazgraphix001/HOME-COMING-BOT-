import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import fs from 'fs'
import os from 'os'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegPath)

let handler = async (m, { EliteProTech }) => {
    const target = m.quoted?.mtype === 'videoMessage'
        ? m.quoted
        : m.mtype === 'videoMessage'
            ? m
            : null

    if (!target) {
        return m.reply(
            '❌ Send a video with .toaudio as the caption, ' +
            'or reply to a video with .toaudio'
        )
    }

    const inputPath = path.join(
        os.tmpdir(),
        `${Date.now()}-input.mp4`
    )

    const outputPath = path.join(
        os.tmpdir(),
        `${Date.now()}-audio.mp3`
    )

    try {
        const buffer = await target.download()

        fs.writeFileSync(inputPath, buffer)

        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .format('mp3')
                .save(outputPath)
                .on('end', resolve)
                .on('error', reject)
        })

        const audio = fs.readFileSync(outputPath)

        await EliteProTech.sendMessage(
            m.chat,
            {
                audio,
                mimetype: 'audio/mpeg'
            },
            {
                quoted: m
            }
        )

    } catch (error) {
        console.error(error)
        await m.reply(
            '❌ Failed to convert the video to audio.'
        )
    } finally {
        if (fs.existsSync(inputPath)) {
            fs.unlinkSync(inputPath)
        }

        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath)
        }
    }
}

handler.command = ['toaudio', 'tomp3']

export default handler
