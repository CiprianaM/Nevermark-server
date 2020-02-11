<p align="center">
  <img src="assets/logo-readme.png" />
</p>

nevermark is an app designed to help you better track and interact with your browser history by recording not only the title and the URL of the pages you visit but also the rest of the content.  This makes searching through your browsing history a more pleasant experience.  You can think of it as a browser history with steroids.

This is the back-end repository.

The front-end repository can be found at: [Nevermark Front-End](https://github.com/CiprianaM/Nevermark-client)

The chrome-extension repository can be found at: [Nevermark Chrome-Extension](https://github.com/CiprianaM/Nevermark-extension)

## Screenshots

## Getting Started

To run the app please follow these instructions:

1. Clone the repository:
```
git clone https://github.com/CiprianaM/Nevermark-server.git
```

2. Install the dependencies:
```
npm install
```

3. Install ElasticSearch v.7.5.2:

Before installation, make sure you have Java installed, and JAVA_HOME configured.

A good guide for Linux users can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04).

The package you should install is openjdk-11-jdk.

After that, install ElasticSearch version 7.5.2 (this is important as functionalities change significantly between versions).
For this, follow the instructions [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html).

4. Install MongoDB v.4.2.1:

We will be using MongoDB Replica Set, so we will need to run the following 2 commands:
```
npm i -g run-rs
run-rs
```

#### IMPORTANT
Run 'run-rs' every time you start the project again, otherwise it is possible that mongoose will throw errors if the replica set is not on.

In the root project folder *Nevermark-server*:

5. Create a .env.dev file with this content (or the config you prefer):
```
APP_PORT=3005
```
A file called env.example has been commited to help you structure the needed .env file.

6. Run nodemon
```
nodemon
```

If nodemon is not installed on your environment, you can do so by running the following command:
```
npm install -g nodemon
```

7. Connecting to MongoDB
Access https://cloud.mongodb.com/ and use the project gmail credentials to log into the interface
Create your own user from "Database Access" option
Connection provided on "Clusters" > "Connect" (you will need to have mongo shell installed)


## Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [ElasticSearch](https://www.elastic.co/es/)

## Contact
You can contact us [via email](mailto:hello@nevermark.com).

## Contributing
We built nevermark in 10 days on a race against time.  There is a lot of room for improvement.  If you feel like it, you're more than welcome to contribute to the project.  Just fork the repository and submit a pull request.  Thanks in advance!

## Team
- Aleksi Ylönen > [Github](https://github.com/Buzzaw91) | [LinkedIn](https://www.linkedin.com/in/aleksi-yl%C3%B6nen-b07820194/)
- Cipriana Milosanu > [Github](https://github.com/CiprianaM) | [LinkedIn](https://www.linkedin.com/in/cipriana-milosanu-59618858/)
- David Stern > [Github](https://github.com/dav-stern) | [LinkedIn](https://www.linkedin.com/in/davstern/)
- Timoteo Ladmann > [Github](https://github.com/teoladmann) | [LinkedIn](https://www.linkedin.com/in/timoteo-ladmann/)

## License
This project is licensed under the MIT License.