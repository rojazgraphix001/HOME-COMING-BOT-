let handler = async (m) => {
    const result = Math.random() < 0.5 ? '🪙 HEADS' : '🪙 TAILS'

    await m.reply(
        `🪙 *COIN FLIP*\n\n` +
        `Result: *${result}*`
    )
}

handler.command = ['coinflip', 'flipcoin']

export default handler