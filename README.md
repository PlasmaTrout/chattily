# Installation
Chattily at present requires mongodb to hold users and environment information. So first launch a container for it:

```
docker run --name chat -d mongo:3.0 --smallfiles
```

Once that container is running you can then launch chattily as a container:

```
docker run -p 8080:8080 --env MONGO_INTERNAL_ADDR=<ip> plasmatrout/chattily
```

## Contribution
Chatti.ly was designed to be a public research project for all folks at Bright House Networks, however, in order to
contribute you must first read the [CONTRIBUTE.md](https://github.com/gabereiser/chattily/blob/master/CONTRIBUTE.md) and understand how to do so as this project is readonly.

```docker run -p 27017:27017--name chat -d mongo:3.0 --smallfiles```