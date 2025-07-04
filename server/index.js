const express = require('express')
const { connectToWhatsapp, getProfilePicture } = require('./whatsapp')
const app = express()
const PORT = 8000

app.use(express.json())

app.get('/dp/:number', async (req, res) => {
    const number = req.params.number
    const dpUrl = await getProfilePicture(number)
    if (dpUrl) return res.json({ success: true, dp: dpUrl })
    else return res.json({ success: false, message: "Not Found or Privacy Restricted" })
})

connectToWhatsapp().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})