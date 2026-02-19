const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
     cart:{
        type:Array,
        required:true,
     },
     shippingAddress:{
        type:Object,
        required:true,
     },
     user:{
        type:Object,
        required:true,
     },
     totalPrice:{
        type:Number,
        required:true,
     },
     status:{
        type:String,
        default:"Processing",
     },
     paymentInfo:{
      id:{
        type:String,  // required true not write bcz we have payment id not cutomer id so not true write // avaialable for paypal strip not cashdeliveru
      },
      status:{
      type:String,
      },
      type:{
    type:String,   // like type its paypal stripe or cash delivery
      },
      paidAt:{
        type:Date,
        default:Date.now(),
      },
      deliveredAt:{
        type:Date,
      },
      createdAt:{
        type:Date,
        default: Date.now(),
      },

     }});

     module.exports=mongoose.model("Order", orderSchema);

