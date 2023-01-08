import React from 'react';
import '../css/navbar.css'

import { getAuth, signOut } from "firebase/auth";
function logOut(){
const auth = getAuth();
signOut(auth).then(() => {
    console.log("unconnect")
    window.location.href = "/";
}).catch((error) => {
  console.log("unconnect")
});
}
function navbar({collapse}) {
    return (
        <div className="navbar">
            <div className="PAT">
                <img className="logo" alt='Pat Logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/PAW_Patrol_logo_jpg.png/1182px-PAW_Patrol_logo_jpg.png"/>
            </div>

            <div className='services'>
                <div className='Love service'  onClick={() => {collapse("LoveMeter")}}>
                    <img className='logo'  alt='logo love'src='https://static.vecteezy.com/system/resources/previews/001/187/549/non_2x/heart-glossy-png.png'/>
                </div>
                <div className='Spotify service' onClick={() => {collapse("Spotify")}}>
                    <img className='logo' alt='logo spotify' src='https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png'/>
                </div>
                <div className='Pokemon service'  onClick={() => {collapse("Pokemon")}}>
                    <img className='logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"></img>
                </div>
                <div className='Meteo service'  onClick={() => {collapse("Meteo")}}>
                    <img className='logo' alt='Meteo'src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Weather-sun-thorm-shower.svg/1200px-Weather-sun-thorm-shower.svg.png'/>
                </div>
                <div className='Discord service'  onClick={() => {collapse("Discord")}}>
                    <img className='logo' alt='discord' src='https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png'></img>
                </div>
                <div className='Chuck service'  onClick={() => {collapse("Chuck")}}>
                    <img className='logo' alt='chuck'src='https://pngimg.com/uploads/chuck_norris/chuck_norris_PNG27.png'></img>
                </div>
            </div>

            <div className='log'>
                <div className='logout' onClick={() => {collapse("Logout");logOut()}}>
                    <img className='logo' alt='logout' src='https://cdn-icons-png.flaticon.com/512/126/126467.png'></img>
                </div>
            </div>
        </div>
    )
}

export default navbar;