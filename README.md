# globalization-server

### Debug (with file watch and debug server (localhost:3000))
```PowerShell 
npm start
```

### Setup MongoDB with docker

```PowerShell 
docker run -p 27017:27017 --name mongo -d mongo
```

### Load the MongoDB container
```PowerShell 
docker start mongo
```

Check list:

Game related stuff:
- [ ] Move to an area based world generator instead randomize every single tile by itself.
- [ ] Add more entities
- [ ] knowledge Tree
- [ ] Add stats for players (Gold, etc...)
- [ ] Add Lobby filter (World type and size)

Platform related stuffz:
- [ ] Add mail provider support 
- [ ] Fix configuration files
- [ ] Fix package for azure storage support
- [ ] API client tokens
- [ ] User login
- [ ] Mail invite
- [ ] Build simple test client
- [ ] Add Swagger
- [ ] API for the client to download Game Rules and stats.


Misc:
- [ ] Benchmark if user-game-actions needs to be moved out from the game-instance object in the database.