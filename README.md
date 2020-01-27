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

Before installation, make sure you have java installed, and JAVA_HOME configured. Please follow the instructions here https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04 . The package you should install is openjdk-11-jdk.

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
## Get it started
In the root project folder *Nevermark-client*:
```bash
node index.js
```
## Connecting to MongoDB
Access https://cloud.mongodb.com/ and use the project gmail credentials to log into the interface
Create your own user from "Database Access" option
Connection provided on "Clusters" > "Connect" (you will need to have mongo shell installed)


## Tech Stack
* React
* Redis
* MongoDB
* Mongoose


## Recommendation
Feel free to have a look at the server of this application: [Nevermark-client](https://github.com/CiprianaM/Nevermark-client.git)

## Developers
Our names go here :)