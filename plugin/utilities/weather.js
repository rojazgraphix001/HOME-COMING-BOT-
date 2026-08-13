let handler = async (m, { text }) => {
    if (!text?.trim()) {
        return m.reply('❌ Please provide a city.\n\nExample: .weather Kampala')
    }

    try {
        const response = await fetch(
            `https://wttr.in/${encodeURIComponent(text.trim())}?format=j1`
        )

        if (!response.ok) {
            return m.reply('❌ City not found.')
        }

        const data = await response.json()
        const current = data.current_condition[0]
        const area = data.nearest_area[0]

        const cityName = area.areaName[0].value
        const country = area.country[0].value
        const tempC = current.temp_C
        const feelsLikeC = current.FeelsLikeC
        const description = current.weatherDesc[0].value
        const humidity = current.humidity
        const windKmph = current.windspeedKmph

        await m.reply(
            `🌤️ *WEATHER*\n\n` +
            `📍 ${cityName}, ${country}\n` +
            `🌡️ Temperature: ${tempC}°C (feels like ${feelsLikeC}°C)\n` +
            `☁️ Condition: ${description}\n` +
            `💧 Humidity: ${humidity}%\n` +
            `💨 Wind: ${windKmph} km/h`
        )

    } catch (error) {
        console.error(error)
        await m.reply('❌ Something went wrong while checking the weather.')
    }
}

handler.command = ['weather']

export default handler