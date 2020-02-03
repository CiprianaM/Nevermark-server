# Nevermark-server

Nevermark is an app designed to help you better track and interact with your browser history.

## Screenshots

TBD

## Commonly used git commands

git branch -a >>> shows all available branches (local and remote)
git branch >>> shows all local branches
git checkout <nameOfBranch> >>> switch to the <nameOfBranch> branch of your repository
git rm --cached <nameOfFile> >>> will delete the specified file from the repository, but not from your local directory


## Installation

To run the app please follow these instructions:

1. Clone the repository
```bash
git clone https://github.com/CiprianaM/Nevermark-server.git
cd Nevermark-client
```
2. Install the dependencies
```bash
npm install
```

3. Install ElasticSearch v.7.5.2
```bash
Before installation, make sure you have java installed, and JAVA_HOME configured. A good guide \\for Linux users can be found here:
https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04
The package you should install is openjdk-11-jdk.

After that, install ElasticSearch version 7.5.2 (this is important as functionalities change significantly between versions).
For this, follow the instructions here: https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html
```
4. Install MongoDB v.4.2.1
```bash
We will be using MongoDB Replica Set, so we will need to run the following 2 commands:
npm i -g run-rs
run-rs

```
## IMPORTANT
Run 'run-rs' every time you start the project again, otherwise it is possible that mongoose will throw errors if the replica set is not on.

## Get it started
In the root project folder *Nevermark-client*:

1. Create a .env.dev file with this content (or the config or your likings) :
```
APP_PORT=3004
A file called env.example has been commited to help you structure the needed .env file.
```

2. Run
```bash
nodemon
If nodemon is not installed on your environment, you can \\do so by running the following command:
npm install -g nodemon
```
## Connecting to MongoDB
Access https://cloud.mongodb.com/ and use the project gmail credentials to log into the interface
Create your own user from "Database Access" option
Connection provided on "Clusters" > "Connect" (you will need to have mongo shell installed)


## Tech Stack
* React
* MongoDB
* Mongoose
* ElasticSearch
* TypeScript


## Recommendation
Feel free to have a look at the client and the extension repos of this application:
[Nevermark-client](https://github.com/CiprianaM/Nevermark-client.git)
[Nevermark-client](https://github.com/CiprianaM/Nevermark-extension.git)

## Developers
David Stern: https://github.com/dav-stern
Cipriana Milosanu: https://github.com/CiprianaM
Teo Ladmann: https://github.com/teoladmann
Aleksi Ylönen: https://github.com/Buzzaw91