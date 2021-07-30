const mongoose = require('mongoose')
const { environment } = require('./config')
const env = process.env.NODE_ENV || 'development'
const url = environment[env].dbString


const connectDB = async () => {
  const connect = await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  connect.connection.on('error', (error) => (console.log({error})))

  console.log(
    `MongoDB Connected ${connect.connection.host}`.magenta.underline.bold
  )
}


module.exports = connectDB