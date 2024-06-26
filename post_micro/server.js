import express, { urlencoded } from "express"
import cors from "cors"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 5002

// * Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
  return res.json({ message: "It's working post micro ..." })
})

// * Routes
import Routes from "./routes/index.js"
app.use(Routes)

app.listen(PORT, () => console.log(`Server running of PORT ${PORT}`))
