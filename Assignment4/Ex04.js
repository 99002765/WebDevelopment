const app= require("express")()
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/Client.html")
})
app.listen(3333, ()=>{
    console.log("Client app running at 3333");
})