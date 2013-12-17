# Installation
To install brightchat simply clone the repository and then use npm start to run the server. You do this by doing a:

```
git clone git@git.bhn.net:rnd/brightchat.git
cd brightchat
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
use brightchat
db.addUser({ user: "brightchat", pwd: "brightchat", roles : [  "readWrite" ] })
```

This default setting can be found is settings.json if you need to change it


# Contribution
BrightChat is designed to be a public research project for all folks that have access to git.bhn.net, however, in order to
contribute you must first read the [CONTRIBUTE.md](http://git.bhn.net/rnd/brightchat/wikis/contribution-guidelines) and understand how to do so as this project is readonly.