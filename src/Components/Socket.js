

import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");


export const sendUpdate=(userId)=>{
      socket.emit("sendupdate",{userId});

}

// export const OrderSubmited=({fetchOrders})=>{
//     fetchOrders()
// }

// socket.on("orderSubmited",async()=>{
//     OrderSubmited()
// })