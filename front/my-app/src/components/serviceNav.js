import React from 'react';
import '../css/serviceNav.css'
import { useEffect, useUpdate } from 'react';
import Card from 'react-bootstrap';    





function ServiceNav({data, collapse, showWidget}) {


    

    

    return (
        <div className="navbarService">
            <div className='retour' onClick={() => {collapse("")}}>
                <img className="logo" alt='logo' src="https://secure.webtoolhub.com/static/resources/icons/set7/c11f626169b1.png"/>
            </div>
            <div className='widgets'>                
                {data === "LoveMeter" ?
                    <label>
                        <input  id="inputLoveMeter" type="checkbox" onClick={()=>showWidget("LoveMeter")}></input>
                        <span id="LoveMeter">LoveMeter</span>
                    </label >
                :data === "Spotify" ?
                <div>
                    <label >
                        <input  id="inputSpotifySearch" type="checkbox" value={data} onClick={()=>showWidget("SpotifySearch")}></input>
                        <span id="Spotify">Search Bar</span>
                    </label> 
                    <label>
                        <input  id="inputSpotifyPlay" type="checkbox" value={data} onClick={()=>showWidget("SpotifyPlay")}></input>
                        <span id="Spotify">Player</span>
                    </label > 
                </div>                   
                :data === "Pokemon" ?
                <div>
                    <label>
                        <input id="inputPokemonRandom" type="checkbox" value={data} onClick={()=>showWidget("PokemonRandom")}></input>
                        <span id="Pokemon">Random Pokemon</span>
                    </label>
                    <label>
                        <input  id="inputPokemon" type="checkbox" value={data} onClick={()=>showWidget("Pokemon")}></input>
                        <span id="Pokemon">Search Pokemon</span>
                    </label>
                    <label>
                        <input  id="inputPokemonEvolution" type="checkbox" value={data} onClick={()=>showWidget("PokemonEvolution")}></input>
                        <span id="Pokemon">Pokemon's Evolution</span>
                    </label>
                </div>
                :data === "Meteo" ?
                    <label >
                        <input  id="inputMeteo" type="checkbox" value={data} onClick={()=>showWidget("Meteo")}></input>
                        <span id="Meteo">Your Meteo</span>
                    </label >
                :data === "Discord" ?
                    <label >
                        <input  id="inputDiscord" type="checkbox" value={data} onClick={()=>showWidget("Discord")}></input>
                        <span id="Discord">Discord server</span>
                    </label >
                :data === "Chuck" ?
                <label >
                    <input  id="inputChuck" type="checkbox" value={data} onClick={()=>showWidget("Chuck")}></input>
                    <span id="Chuck">Chuck's jokes</span>
                </label >
                :null
                }
            </div>
            
        </div>
    )
}

export default ServiceNav;