import React from 'react'
import './appdownload.css'
import { assets } from '../../assets/assets.js'

const Appdownload = () => {
  return (
    <div className='app-download' id="app-download">
        <p>For Better Experience Download <br /> Tomato App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt=''></img>
            <img src={assets.app_store} alt=''></img>
        </div>
    </div>
  )
}

export default Appdownload