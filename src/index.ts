import * as express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Hello Globalization!'))
app.listen(3000, () => console.log('Example app listening on port 1337!'))