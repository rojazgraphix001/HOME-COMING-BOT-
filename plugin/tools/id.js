let handler = async (m) => {
    await m.reply(
        `🆔 *MESSAGE INFORMATION*\n\n` +
        `👤 Sender: ${m.sender}\n` +
        `💬 Chat: ${m.chat}\n` +
        `👥 Group: ${m.isGroup ? 'Yes' : 'No'}`
    )
}

handler.command = ['id']

export default handler