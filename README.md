# Installation
To install chattily simply clone the repository and then use npm start to run the server. You do this by doing a:

```
git clone git@github.com:gabereiser/chattily.git
cd chattily
npm start
```

For more advanced users and development workflow you can should use supervisor to detect changes and refresh the page for you.

```
npm install -g supervisor
supervisor server.js
```

## MongoDB
User profiles are stored in MongoDB. So having this up and running will be a requirement from this point on. You first should startup your MongoDB instance
with:

```
sudo mongod 
```
After logging in to your mongo instance you should create a database for brightchat and a default user. This can be done with:

```
use chat
db.addUser({ user: "admin", pwd: "admin", roles : [  "readWrite" ] })
```

This default setting can be found is settings.json if you need to change it

## Contribution
Chatti.ly was designed to be a public research project for all folks at Bright House Networks, however, in order to
contribute you must first read the [CONTRIBUTE.md](https://github.com/gabereiser/chattily/blob/master/CONTRIBUTE.md) and understand how to do so as this project is readonly.