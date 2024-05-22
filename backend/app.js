const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const habitatsRouter = require('./routes/habitats');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const reportsRouter = require('./routes/reports');
const servicesRouter = require('./routes/services');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/habitats', habitatsRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/services', servicesRouter);
app.use('/reviews', reviewsRouter);

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/arcadia_zoo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
