# How To Test Authenciation Via CURL
In order to see the restfull authentication take place you have to add a user and pass header into the POST request.

```
curl -X POST http://localhost:8080/users/authenticate -H "user: jsdowning" -H "pass: test"
```

Where pass is the base64 encoded version of your password. Don't worry, we don't store them anywhere.