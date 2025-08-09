require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const schoolsRouter = require('./routes/schools');

const app = express();
app.use(bodyParser.json());

app.use('/api', schoolsRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'School API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
