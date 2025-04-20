import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storecontext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const {cartitems,food_list,removefromcart,gettotalcartamount,url} = useContext(StoreContext)
    

    const navigate = useNavigate() 

    return (
    <div className='cart'>
        <div className='cart-items'>
            <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
            </div>
                <br />
                <hr />
                {food_list.map((item,index)=>{
                    if(cartitems[item._id]>0){
                        return(
                            <div>
                            <div className='cart-items-title cart-items-item'>
                            <img src={url+"/images/"+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <p>{cartitems[item._id]}</p>
                            <p>${item.price*cartitems[item._id]}</p>
                            <p onClick={()=>removefromcart(item._id)} className='cross'>x</p>
                            </div>
                            <hr/> 
                            </div>
                        
                        )
                    }
                })}
        </div>
        <div className='cart-bottom'>
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
                <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
        </div>
    </div>
  )
}

export default Cart