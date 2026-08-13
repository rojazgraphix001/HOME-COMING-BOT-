let handler = async (m) => {
    if (!m.isGroup) {
        return m.reply('❌ This command only works in groups.')
    }

    if (!m.isAdmin) {
        return m.reply('❌ Admins only!')
    }

    await m.reply('✅ You are a group admin!')
}

handler.command = ['admincheck']

export default handler