const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const User = require ('./models/pass_model.js');
const em_model = require ('./models/em_model.js');


app.use(cors());
app.use(express.json());


// db connection
mongoose
  .connect("mongodb+srv://Rishi:Rishi208011@cluster0.wux8rdt.mongodb.net/Pass_Manager?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("db connection succesfully");
  })
  .catch((error) => {
    console.log(error);
  });
  app.post("/register", (req, res) => {
    em_model.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
  })
  
  
  app.post("/login", (req, res) => {
    const {email, password} = req.body;
    em_model.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
  })
  

// create user
app.post("/createuser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});
// read all user

app.get("/readalluser", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});
app.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// update user

app.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`server ise running on ...${PORT}`);
});
