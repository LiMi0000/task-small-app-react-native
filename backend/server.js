import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

import { dataJSON } from './data.js';
const MongoClient = mongodb.MongoClient;
const URL =
  'mongodb+srv://country:country@country.gldlcn5.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/api', (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    if (err) throw 'mongodb client its not connected';

    let db = client.db('test');

    db.collection('posts').insertMany(dataJSON, (err, result) => {
      if (err) throw 'no data saved';
      console.log('saved data result: ', result);

      for (let i = 0; i < dataJSON.length; i++) {
        const result = new postModel({
          user_id: dataJSON[i]['userId'],
          id: dataJSON[i]['id'],
          title: dataJSON[i]['title'],
          description: dataJSON[i]['body'],
        });
        result.save();
      }
    });
  });
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
