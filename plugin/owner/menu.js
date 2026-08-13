let handler = async (m) => {
    let menu = `
╭────〔 🤖 HOME-COMING BOT 〕────╮
│
│ 👋 Hello, ${m.pushName || 'User'}!
│
├────〔 GENERAL 〕
│ • .hello
│ • .say
│ • .ping
│ • .menu
│
├────〔 TOOLS 〕
│ • .define
│ • .weather
│ • .time
│ • .calc
│ • .quote
│ • .id
│ • .runtime
│ • .uptime
│
├────〔 GROUP 〕
│ • .groupinfo
│ • .admincheck
│ • .tagall
│ • .warn
│
├────〔 OWNER 〕
│ • .owner
│ • .mode
│
╰────────────────────────╯
`

    await m.reply(menu)
}

handler.command = ['menu', 'help']

export default handler