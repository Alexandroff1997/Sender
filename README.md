### Launch Redis 

`docker run --name some-redis -p 6379:6379 -d redis`

### Launch emailApi (sending emails)


In order to check the performance of the application (sending emails). You need to go to the site https://mailtrap.io and in your account in the `Inboxes` tab in the `Integrations` section find `Nodemailer`

You need to create a `.env` file in the folder `./emailApi` and write

```
PORT=4001
MONGO_URI=mongodb+srv://admin:admin@cluster0.j0qhn.mongodb.net/sender
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER={user}
SMTP_PASS={password}
```

Then execute in terminal

`npm install`
`node ./emailApi/app.js`

### Launch serverApi (communication with the front)

You need to create a `.env` file in the folder `./serverApi` and write
```
PORT=4000
MONGO_URI=mongodb+srv://admin:admin@cluster0.j0qhn.mongodb.net/sender
```

Then execute in terminal

`npm install`
`node ./serverApi/app.js`

### Frontend launch

Go to folder `client` and execute in terminal `npm install` `npm run start`
