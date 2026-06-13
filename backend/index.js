const express = require('express');
const cors = require('cors');
const path = require('path');
const empresasRouter = require('./routes/empresas');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send({ ok: true }));
app.use('/api/empresas', empresasRouter);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
