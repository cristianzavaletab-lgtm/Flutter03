const express = require('express');
const cors = require('cors');
const empresasRouter = require('./routes/empresas');

require('dotenv').config({ path: 'D:\\Descargas\\crud_withnodejs\\backend\\.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send({ ok: true }));
app.use('/api/empresas', empresasRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
