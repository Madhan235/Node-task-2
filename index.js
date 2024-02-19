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

app.get('/hall-data', (req, res) => {
    try {
        //to get all the data 
        res.send(hallData)
    } catch (error) {
        console.log(error);
    }
    
})
app.get("/current-details",(req,res)=>{

    try {
        const {roomType } = req.query;
    
    let filterRooms ;
    if(roomType){
        filterRooms = hallData?.filter((hall)=>hall.RoomName === roomType)
return res.json(filterRooms)
    }
    return res.json("No Rooms Found")
    } catch (error) {
        console.log(error);
    }

})

app.post("/add/hall",(req,res)=>{
    try {

        // assume that the new Hall data form the client with the intergated form ;

        // example : const { newHall } = req.query 

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
         res.json(hallData)
    } catch (error) {
        
        console.log(error);
    }
  
})

app.put("/edit/hall/:id", (req, res) => {
    try {
        const { id } = req.params;
        const hallIndex = hallData.findIndex(hall => hall.id === id);

        if (hallIndex === -1) {
            return res.status(404).send("Hall not found");
        }

        if (hallData[hallIndex].ifBooked === "true") {
            return res.status(400).send("Sorry, Hall already booked");
        }

        const updatedHall = req.body;

        hallData[hallIndex] = updatedHall;
        return res.send(hallData[hallIndex]);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/booked-rooms", (req, res) => {
    try {
        let bookedHalls = hallData.filter((hall) => hall.ifBooked === "true");
        if (bookedHalls.length === 0) {
            return res.status(404).send("No booked halls found");
        }
        return res.send(bookedHalls);
    } catch (error) {
        console.error("Error fetching booked halls:", error);
        return res.status(500).send("Internal Server Error");
    }
});

 

app.get("/reg-customer", (req, res) => {
    try {
        let bookedHalls = hallData.filter((hall) => hall.ifBooked === "true");
        if (bookedHalls.length === 0) {
            return res.status(404).send("No booked halls found");
        }
        let registeredCustomers = bookedHalls.map((hall) => hall.customerName);
        return res.send(registeredCustomers);
    } catch (error) {
        console.error("Error fetching registered customers:", error);
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(9000,()=>console.log("server running in localhost:9000"));