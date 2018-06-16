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