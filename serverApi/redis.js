const { createClient } = require('redis');

class Redis {
  static instance = null;
  connection;

  constructor() {}

  static async getInstance() {
    if (!Redis.instance) {
      await Redis.initInstance();
    }

    return Redis.instance;
  }

  static async initInstance() {
    Redis.instance = new Redis();
    Redis.instance.connection = createClient();
    try {
      await Redis.instance.connection.connect();
      console.log('Connected to redis');
    } catch (err) {
      console.log('Error connecting to redis', err);
    }
  }

  async sendTasks(tasks) {
    try {
      await this.connection.publish('tasks', JSON.stringify(tasks));
    } catch (err) {
      console.log('Error publishing to redis', err);
    }
  }
}

module.exports = {
  Redis,
};
