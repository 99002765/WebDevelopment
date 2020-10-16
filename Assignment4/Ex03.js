const app= require("express")()
const parser= require("body-parser")
const dir= __dirname
const fs= require("fs")
const cors= require("cors")
//Middleware
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())
//GET= Reading,POST= Adding, PUT= Updating, Delete= Deleting 
let employees= []
function readData() {
    const filename= "data.json"
    const jsonContent= fs.readFileSync(filename, "utf-8")
    employees=JSON.parse(jsonContent)
}
function saveData(){
    const filename= "data.json"
    const jsonData= JSON.stringify(employees)
    fs.writeFileSync(filename, jsonData, "utf-8")
}
function delData(index) {
    const filename= "data.json"
    const jsonContent= fs.readFileSync(filename, "utf-8")
    employees=JSON.parse(jsonContent)
    //console.log("Index: "+index)
    // if(index==0)
    //     employees.shift()
    // else if(index==employees.length-1)
    //     employees.pop()
    // else
    employees.splice(index, 1)
    saveData()
}
app.get("/employees", (req,res)=>{
    readData()
    res.send(JSON.stringify(employees))
})
app.get("/employees/:id", (req, res)=>{
    const empid=req.params.id
    if(employees.length == 0){
        readData()
    }
    let foundRec= employees.find((e)=>e.empId == empid)
    if(foundRec == null){
        throw "Employee not found"
    }
    res.send(JSON.stringify(foundRec))
})
// app.put()
app.put("/employees", (req, res)=>{
    if(employees.length == 0){
        readData()
    }
    // console.log("Inside");
    let body= req.body
    for(let index= 0;index< employees.length;index++){
        let element= employees[index]
        if(element.empId == body.empId){
            element.empName= body.empName
            element.empAddress= body.empAddress
            element.empSalary= body.empSalary
            saveData()
            res.send("Employee updated successfully")
        }
    }
})
// app.post()
app.post("/employees", (req, res)=>{
    if(employees.length == 0){
        readData()
    }
    let body= req.body
    employees.push(body)
    saveData()
    res.send("Employee added successfully")
})
// app.delete()
app.delete("/employees", (req, res)=>{
    // throw "Not implemented yet"
    let body= req.body
    //console.log("ID: "+body.empId);
    if(employees.length == 0){
        readData()
    }
    for(let index= 0;index< employees.length;index++){
        let element= employees[index]
        if(element.empId == body.empId){
            
            delData(index)
            res.send("Employee deleted successfully")
        }
    }
})
app.listen(1234, ()=>{
    console.log("Server available at 1234");
})