import express from 'express';
import cors from 'cors';
import {log, LogSeverity} from 'logger';

const PORT = 3333;

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  log('hello_server_start', LogSeverity.INFO, `Listening on port ${PORT}`)
})