const express = require('express')
const path = require('path')
const { connectToWhatsapp, getProfilePicture } = require('./whatsapp')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// 🟩 Serve frontend static files
app.use(express.static(path.join(__dirname, '../public')))

// 🟩 Main route – send index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// 🟩 API route to fetch DP
app.get('/dp/:number', async (req, res) => {
    const number = req.params.number
    const dpUrl = await getProfilePicture(number)
    if (dpUrl) return res.json({ success: true, dp: dpUrl })
    else return res.json({ success: false, message: "Not Found or Privacy Restricted" })
})

// 🟩 Connect to WhatsApp and start server
connectToWhatsapp().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})
