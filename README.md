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

Though not currently required, later you may need to have a mongodb instance and it properly configured in order to use this app. But for right now in
the early stages of development it is not required.

# Contribution
BrightChat is designed to be a public research project for all folks that have access to git.bhn.net, however, in order to
contribute you must first read the [CONTRIBUTE.md](http://git.bhn.net/rnd/brightchat/wikis/contribution-guidelines) and understand how to do so as this project is readonly.