let handler = async (m) => {
    await m.reply('Hello 👋')
}

handler.command = ['hello']

export default handler