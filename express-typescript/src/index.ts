import express from 'express'
import assetsRouter from './routes/assets'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (_req, res) => {
  return res.send()
})

app.use('/api/v1/assets', assetsRouter)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
