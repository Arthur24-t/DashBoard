import React from 'react';
import {Route, Routes} from "react-router";
import { useState, useEffect } from 'react';

import NavBar from '../components/navbar';
import Entete from '../components/Entete';
import ServiceNav from '../components/serviceNav'
import Card from '../components/Card'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../css/home.css'
import { info } from 'autoprefixer';


var checked = [];


function Home() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
    
    } else {
        window.location.href = "/";
    }
    });

    const [service, setService] = useState('');


    function collapse(value){
        setService(value);
    }

    useEffect(() => {
        checked.forEach((widgetChecked) => {
            if (widgetChecked.includes(service)){
                document.getElementById("input" + widgetChecked).checked = true;
            }
        })
      })

    function showWidget(id){
        if (document.getElementById("input" + id).checked ){
            document.getElementById("card" + id).classList.remove("invisible");
            checked.push(id)
        }
        else{
            document.getElementById("card" + id).classList.add("invisible");
            checked.splice(checked.indexOf(id), 1)
        }
    }

    return (
        <div className='home'>
            <div className='navbars'>
                <NavBar collapse={(value)=>collapse(value)}/>

                {/* Affiche la bonne service nav lors d'un appuie sur une icon de nav */}
                {service == "LoveMeter"? 
                    <ServiceNav data={"LoveMeter"} collapse={(value)=>collapse(value)} showWidget={(value) => showWidget(value)}/>
                : service == "Spotify" ? 
                    <ServiceNav data={"Spotify"} collapse={(value)=>collapse(value)} showWidget={(value) => showWidget(value)}/>
                : service == "Pokemon"? 
                    <ServiceNav data={"Pokemon"} collapse={(value)=>collapse(value)} showWidget={(value) => showWidget(value)}/>    
                : service == "Meteo"? 
                    <ServiceNav data={"Meteo"} collapse={(value)=>collapse(value)} showWidget={(value) => showWidget(value)}/>
                : service == "Discord"? 
                    <ServiceNav data={"Discord"} collapse={(value)=>collapse(value)} showWidget={(value) => showWidget(value)}/>
                : service == "Chuck"? 
                    <ServiceNav data={"Chuck"} collapse={(value)=>collapse(value)} showWidget={(value) => showWidget(value)}/>

                : null
                }
            </div>
            <div className='content'>
                <Entete/>
                {/* Affiche la bonne card en fonction du widget cliqué */}
                <div className="cards">
                    <div id="cardLoveMeter" className='invisible'> 
                        <Card titre="LoveMeter" content={<input id="nom1" type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 2'></input>}/>
                    </div>
                    <div id="cardSpotifySearch" className='invisible'> 
                        <Card titre="SpotifySearch" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardSpotifyPlay" className='invisible'> 
                        <Card titre="SpotifyPlay" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardPokemonRandom" className='invisible'> 
                        <Card titre="PokemonRandom" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardPokemon" className='invisible'> 
                        <Card titre="Pokemon" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardPokemonEvolution" className='invisible'> 
                        <Card titre="PokemonEvolution" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardMeteo" className='invisible'> 
                        <Card titre="Meteo" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardDiscord" className='invisible'> 
                        <Card titre="Discord" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                    <div id="cardChuck" className='invisible'> 
                        <Card titre="Chuck" content={<input type="text" placeholder='Nom 1'></input>} content2={<input id="nom2" type="text" placeholder='Nom 1'></input>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;