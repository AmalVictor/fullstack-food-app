import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/header'
import Exploremenu from '../../components/exploremenu/exploremenu'
import Fooddisplay from '../../components/fooddisplay/fooddisplay'
import Appdownload from '../../components/appdownload/appdownload'

const Home = () => {

    const[category,setCategory] = useState("All")

  return (
    <div>
        <Header/>
        <Exploremenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category}/>
        <Appdownload/>
    </div>
  )
}

export default Home