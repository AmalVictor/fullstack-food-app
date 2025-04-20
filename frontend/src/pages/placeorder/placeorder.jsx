import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/storecontext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {

    const {gettotalcartamount,token,food_list,cartitems,url} = useContext(StoreContext)

  const [data,setdata]= useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const placeorder = async(event) => {
        
        try {
            event.preventDefault();
        let orderitems = [];
        food_list.map((item)=>{
            if (cartitems[item._id]>0) {
                let itemInfo = item;
                itemInfo["Quantity"] = cartitems[item._id];
                orderitems.push(itemInfo)
            }
        })
        let orderdata = {
            address:data,
            items:orderitems,
            amount:gettotalcartamount()+2,
        }
        let response = await axios.post(url+"/api/order/place",orderdata,{headers:{token}});
        console.log(response.data);
        
        if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        } catch (error) {
            console.log("Error in placing order:", error);
            res.json({success:false, message: error.message || "Error"});
        }
        
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
        navigate('/cart')
    }
    else if(gettotalcartamount()==0){
        navigate('/cart')
    }
  },[token])
  
    return (
    <form onSubmit={placeorder} className='place-order'>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
                    <input required name='firstname' onChange={onchangehandler} value={data.firstname} type='text' placeholder='First Name'></input>
                    <input required name='lastname' onChange={onchangehandler} value={data.lastname} type='text' placeholder='Last Name'></input>
            </div>
            <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email address'/>
            <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street'/>
            <div className='multi-fields'>
                    <input required name='city' onChange={onchangehandler} value={data.city} type='text' placeholder='City'></input>
                    <input required name='state' onChange={onchangehandler} value={data.state} type='text' placeholder='State'></input>
            </div>
            <div className='multi-fields'>
                    <input required name='zipcode' onChange={onchangehandler} value={data.zipcode} type='text' placeholder='Zipcode'></input>
                    <input required name='country' onChange={onchangehandler} value={data.country} type='text' placeholder='Country'></input>
            </div>
            <input required name='phone' onChange={onchangehandler} value={data.phone} type='text' placeholder='Phone'></input>
        </div>
    
        <div className='place-order-right'>
        <div className='cart-total'>
                <h2>Cart Totals</h2>
                <div>
                <div className='cart-total-details'>
                        <p>Subtotal</p>
                        <p>${gettotalcartamount()}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Delivery Fee</p>
                        <p>${gettotalcartamount()===0?0:2}</p>
                    </div>
                    <hr/>
                    <div className='cart-total-details'>
                        <b>Total</b>
                        <b>${gettotalcartamount()===0?0:gettotalcartamount()+2}</b>
                    </div>
                </div>
                <button type='submit'>PROCEED TO PAYMENT</button>
            </div>
            
        </div>   
    </form>
  ) 
}

export default Placeorder