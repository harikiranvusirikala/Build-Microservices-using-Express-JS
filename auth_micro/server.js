import express, { urlencoded } from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5001

// * Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
  return res.json({ message: "It's working ..." })
})

app.listen(PORT, () => console.log(`Server running of PORT ${PORT}`))
