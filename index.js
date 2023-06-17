const express = require('express');
const { chownSync } = require('fs');
const app = express();
app.use(express.json())
const hallData = [
    {id:"1",
    numberOfSeats: 100,
    amenities:["Ac","chairs","discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "Sanjay",
    date:"05 feb 2022",
    startTime:"10 feb 2022 at 12am",
    endTime:"11 feb 2022 at 11am",
    RoomId: 201,
    RoomName: "Duplex",
}, 
{id:"2",
numberOfSeats: 100,
amenities:["Ac","chairs","discolights"],
price: 5000,
ifBooked: "false",
customerName: "",
date:"",
startTime:"",
endTime:"",
RoomId: 202,
RoomName: "Duplex",
}, 
{id:"3",
numberOfSeats: 50,
amenities:["Ac","chairs"],
price: 3000,
ifBooked: "false",
customerName: " ",
date:" ",
startTime:" ",
endTime:" ",
RoomId: 203,
RoomName: "Classic",
}, 
{id:"4",
numberOfSeats: 100,
amenities:["Ac","chairs","discolights"],
price: 5000,
ifBooked: "true",
customerName: " Sathish",
date:"03 feb 2022",
startTime:"15 feb 2022 at 12am",
endTime:"16 feb 2022 at 11am",
RoomId: 204,
RoomName: "Duplex",
}, 
{id:"5",
numberOfSeats: 400,
amenities:["Ac","chairs","discolights","buffet"],
price: 9000,
ifBooked: "true",
customerName: "Anitha",
date:"06 feb 2022",
startTime:"11 feb 2022 at 12am",
endTime:"12 feb 2022 at 11am",
RoomId: 205,
RoomName: "Grand Suite",
}, 


]

app.get('/', (req, res) => {
    res.send("i'm working fine")
})
app.get("/current-details",(req,res)=>{

    const {roomType } = req.query;
    console.log(roomType)
    let filterRooms ;
    if(roomType){
        filterRooms = hallData.filter((hall)=>hall.RoomName === roomType)
return res.send(filterRooms)
    }
    return res.send(hallData)
})

app.post("/add/hall",(req,res)=>{
  const newHall =   {
    id:hallData.length + 1,
numberOfSeats: 400,
amenities:["Ac","chairs","discolights","buffet"],
price: 9000,
ifBooked: "false",
customerName: "",
date:"",
startTime:"",
endTime:"",
RoomId: 206,
RoomName: "Grand Suite",
} 
hallData.push(newHall)
 res.send(hallData)
})

app.put("/edit/hall/:id",(req,res)=>{
const {id} = req.params
let filterHall ;
filterHall = hallData.filter((hall)=>hall.id === id)

// filter method returns a array so filterHall[0]

if(filterHall[0].ifBooked === "true"){
    return res.status(400).send("Sorry, Hall already booked")
}
res.send(filterHall)

const updatedhall = {
            id: req.body.id,
            numberOfSeats: req.body.numberOfSeats,
            price: req.body.price,
            ifBooked: req.body.ifBooked,
            customerName: req.body.customerName,
            date:  req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            RoomId: req.body.RoomId,
            RoomName: req.body.RoomName}
        // console.log(updatedhall)
        hallData[id] = updatedhall
       return res.send(hallData)
 

})

app.get("/booked-rooms",(req,res)=>{

let bookedHall ;
bookedHall = hallData.filter((hall)=>hall.ifBooked === "true")
return res.send(bookedHall);
})

app.get("/reg-coustomer",(req,res)=>{
    let reg_coustomer ;
reg_coustomer = hallData.filter((hall)=>hall.ifBooked === "true")
let reg_coustomer_name = reg_coustomer.map((val)=>val.customerName)
  console.log(reg_coustomer_name)
return res.send(reg_coustomer_name)
})
app.listen(9000,()=>console.log("server running in localhost:9000"));