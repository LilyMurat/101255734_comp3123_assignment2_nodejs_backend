let express = require("express"); 
const bodyParser = require('body-parser'); 
let mongoose = require("mongoose"); 
let EmployeeModel = require("./models/Employees") 
 
let app = express() 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json()) 
//mongodb+srv:// 
mongoose.connect('mongodb+srv://', 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{ 
    console.log('Successfuly connected'); 
}).catch(err=>{ 
    console.log("Error",err); 
    process.exit(); 
}) 
 
app.get("/", (req, res) => { 
    res.send("<h1>MongoDB mongoose Example</h1>") 
}); 
 
//read single employee 
app.get("/api/v1/employees/:id", async (req, res) => { 
    try{ 
        res.send(await EmployeeModel.findById(req.params.id, req.body)) 
    }catch(err){ 
        console.log("ERROR: record not found: " + err) 
        res.status(500).send(err) 
    } 
}); 
 
//Read ALL 
app.get('/api/v1/employees', async (req, res) => { 
    const employees = await EmployeeModel.find({}); 
   
    try { 
      res.send(employees); 
    } catch (err) { 
      res.status(500).send(err); 
    } 
  }); 
   
  //add employee 
  app.post('/api/v1/employees', async (req, res) => { 
      const employee = new EmployeeModel(req.body); 
     
      try { 
        await employee.save(); 
        res.send(employee); 
        res.status(201).send("Added successfully") 
      } catch (err) { 
        res.status(500).send(err); 
      } 
    }); 
   
  //Update Record 
  app.put('/api/v1/employees/:id', async (req, res) => { 
      try { 
        await EmployeeModel.findByIdAndUpdate(req.params.id, req.body) 
        employee = await EmployeeModel.save() 
        res.send(employee) 
        res.status(200).send('Updated successfully') 
      } catch (err) { 
        res.status(500).send(err) 
      } 
    }); 
   
  //Delete Record 
  app.delete('/api/v1/employees/:id', async (req, res) => { 
      try { 
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id,req.body) 
     
        if (!employee){ 
            res.status(204).send("No employee found") 
        } 
        res.status(200).send("Delete successfully") 
      } catch (err) { 
        res.status(500).send(err) 
      } 
    }); 
 
 
 //api, heroku
app.listen(8089, () => { 
    console.log("Server running at http://localhost:8089/") 
})