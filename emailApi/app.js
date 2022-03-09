const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const { createClient } = require('redis');

const Users = require('./models/users');

dotenv.config();

const template = `
You have been assigned the following tasks
`;

function fillTemplate(tasks) {
  let content = template;
  tasks.forEach((task) => {
    content += `
        
Name: ${task.header}
Description: ${task.description}
        `;
  });
  return content;
}

let transport;

(async () => {
  transport = createMailTransport();
  connectDB();

  const client = createClient();
  client.on('error', (err) => console.log('error on redis', err));
  const subscriber = client.duplicate();
  try {
    await subscriber.connect();
    console.log('connected to redis');
  } catch (err) {
    console.log('error connecting to redis', err);
  }

  await subscriber.subscribe('tasks', async (message) => {
    const tasks = JSON.parse(message);
    await sendTasks(tasks);
  });
})();

function createMailTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('DB connection established');
    })
    .catch((err) => {
      console.log(err);
    });
}

async function sendTasks(tasks) {
  const content = fillTemplate(tasks);

  const userEmails = await getUserEmails();
  for (let userEmail of userEmails) {
    try {
      await transport.sendMail({
        from: 'example-sender@email.com',
        to: userEmail,
        subject: 'Tasks',
        text: content,
      });
    } catch (err) {
      console.log(`error sending email to ${userEmail}`);
    }
  }
}

async function getUserEmails() {
  const userEmails = await Users.find().select('email -_id');
  if (!userEmails.length) {
    console.log('no users found');
    return [];
  }
  return userEmails.map((userEmail) => userEmail.email);
}
