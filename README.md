### Launch Redis 

`docker run --name some-redis -p 6379:6379 -d redis`

### Launch api2 (sending emails)


In order to check the performance of the application (sending emails). You need to go to the site https://mailtrap.io and in your account in the `Inboxes` tab in the `Integrations` section find `Nodemailer`

You need to create a `.env` file in the folder `./api2` and write

```
PORT=4001
MONGO_URI=mongodb+srv://admin:admin@cluster0.j0qhn.mongodb.net/sender
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER={user}
SMTP_PASS={password}
```

Then execute in terminal

`node ./api2/app.js`

### Launch api1 (communication with the front)

You need to create a `.env` file in the folder `./api1` and write
```
PORT=4000
MONGO_URI=mongodb+srv://admin:admin@cluster0.j0qhn.mongodb.net/sender
```

Then execute in terminal

`node ./api1/app.js`

### Frontend launch

Go to folder `client` and execute in terminal `npm run start`
