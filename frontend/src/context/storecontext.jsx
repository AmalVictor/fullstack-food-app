import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartitems,setcartitems] = useState({});
    const url = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/"
    const [token,settoken] = useState("");
    const [food_list,setfoodlist] = useState([])

    const addtocart =  async (itemId)=> {
        if(!cartitems[itemId]){
            setcartitems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removefromcart = async (itemId) => {
        setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const gettotalcartamount = ()=>{
        let totalamount = 0;
        for(const item in cartitems){
            if(cartitems[item]>0){
                let iteminfo = food_list.find((product)=>product._id === item);
            totalamount += iteminfo.price* cartitems[item];
            }
            
        }
        return totalamount;
    }

    const fetchfoodlist = async () => {
        const response = await axios.get(url+"/api/food/list")
        setfoodlist(response.data.data)
    }

    const loadcartdata = async (token) => {
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
            setcartitems(response.data.cartdata);
    }

    useEffect(()=>{
        
        async function loaddata(){
            await fetchfoodlist();
        
        if (localStorage.getItem("token")) {
            settoken(localStorage.getItem("token"));
            await loadcartdata(localStorage.getItem("token"));
        } }
        loaddata();
    },[])

    const contextValue = {
        food_list,cartitems,setcartitems,addtocart,removefromcart,gettotalcartamount, url, token, settoken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;