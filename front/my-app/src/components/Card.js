import {createElement, React, useState, useEffect} from 'react';
import '../css/card.css'
import axios from 'axios';
import "https://open.spotify.com/embed-podcast/iframe-api/v1";


var config = {
    headers: {
      token: localStorage.getItem("token"),
    }
  }



function Card({titre, content, content2}) {

    const code = new URLSearchParams(window.location.search).get('code');

    const CLIENT_ID = "96b9ddcdacc24ad49e20b9f5bd90369b"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [tokenSpotify, setTokenSpotify] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [track, setTrack] = useState([])
    const [selectedTrack, setSelectedTrack] = useState("")
    const [randomPoke, setRandomPoke] = useState("")
    const [pokemon, setPokemon] = useState("")
    const [pokemonEvolution, setPokemonEvolution] = useState("")


    const [InterMeteo, setInterMetoeo] = useState("")
    const [InterPlayer, setInterPlayer] = useState("")
    const [InterSearch, setInterSearch] = useState("")
    const [InterRandom, setInterRandom] = useState("")
    const [InterChuck, setInterChuck] = useState("")
    const [InterLove, setInterlove] = useState("")

    // Fonction qui regarde les token a chaque chaangement dans le site
    useEffect( () => {
        let script = document.createElement("script"); 
        script.async = true;
        script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
        let div= document.getElementById("card1")
        div.appendChild(script);  

        const hash = window.location.hash
        var tokenSpotify = window.localStorage.getItem("tokenSpotify")

        if (!tokenSpotify && hash){
            tokenSpotify = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.hash = ""
            window.localStorage.setItem("tokenSpotify", tokenSpotify)
        }
        setTokenSpotify(tokenSpotify)
    }, [])


    // Permet de se déconnecter
    const SpotifyLogout = () => {
        setTokenSpotify("")
        window.localStorage.removeItem("tokenSpotify")
    }

    //Recherche des chansons spotify
    const searchTrack = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers:{
                Authorization: `Bearer ${tokenSpotify}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })
       setTrack(data.tracks.items)
    }

    // Liste des chansons recherchées
    const TrackList = () => {
        const tracks = track.map(track =>
        <button className='btnTrack' key={track.id} onClick={() =>addPlayer(track.id)}>
            {track.name}
        </button>);
        return (tracks);
    }

    // Mets ou change la chanson dans le player
    const addPlayer = (id) => {
        setSelectedTrack(id)
        let div = document.getElementById("divPlayer")
        try{
            document.getElementById("player").remove()
        }
        catch(error){
            
        }
        let iframe = document.createElement("iframe")
        iframe.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`
        iframe.width = "100%"
        iframe.height = "100%"
        iframe.frameborder = "0"
        iframe.allowFullscreen = "";
        iframe.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        iframe.loading = "lazy"
        iframe.id = "player"

        div.appendChild(iframe)
    }

    // Prend un pokemon random
    const getRandomPokemon = () => {
        new Promise((resolve, reject) => {
            axios.get('http://127.0.0.1:8080/getPokemon',config)
                .then((response) => {resolve(response.data)
                    setRandomPoke(response.data)
                })
        })
        let intervalRandom = setInterval(() => {  return new Promise((resolve, reject) => {
                axios.get('http://127.0.0.1:8080/getPokemon',config)
                    .then((response) => {resolve(response.data)
                        setRandomPoke(response.data)
                    })
            })}, 60000);
            setInterRandom(intervalRandom)
        }

    // Affiche un pokemon random
    const RandomPokemon = () => {
        if (randomPoke)
            return (
                <div>
                    <img height={"150px"} width="150px" src={randomPoke.sprites.front_default}></img>
                    <p>{randomPoke.name}</p>
                </div>
            )
    }

    //Recherche un pokemon grace à son nom
    const searchPokemon = () => {
        let data = document.getElementById("txtPokemon").value
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8080/pokemon', {name: data},config)
                .then((response) => {resolve(response.data)
                    setPokemon(response.data)
                })
        })
    }

    // Affiche le pokemon rehcerché
    const Pokemon = () => {
        if (pokemon){
            return (
                <div>
                    <img height={"150px"} width="150px" src={pokemon.sprites.front_default}></img>
                    <p>Name: {pokemon.name}</p>
                    <p>Type: {pokemon.types[0].type.name}
                    {pokemon.types[1] ?
                        " and " + pokemon.types[1].type.name
                    : null
                    }
                </p>
                <p>ID: {pokemon.id}</p>
                </div>
            )
                }
    }

    // Recherche l'evolution d'un pokemon
    const searchPokemonEvolution = () => {
        let data = document.getElementById("txtPokemonEvolution").value
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:8080/getEvolution', {id: data},config)
                .then((response) => {resolve(response.data)
                    setPokemonEvolution(response.data)
                })
        })
    }

    //Affiche l'évolution du pokemon
    const PokemonEvolution = () => {
        if (pokemonEvolution){
            return (
                <div>
                    <p>Name: {pokemonEvolution.chain.species.name}</p>
                    {pokemonEvolution.chain.evolves_to[0] ? 
                        <p>Evolution: {pokemonEvolution.chain.evolves_to[0].species.name}</p>
                        :<p>No Evolution</p>
                }
                </div>
            )
        }
    }

    //fonction qui kill un widget
    function quit(title){
        document.getElementById("card"+titre).classList.add("invisible");
        document.getElementById("input" + titre).checked = false;

        switch (title.titre) {
            case 'Meteo':
                clearInterval(InterMeteo);
              break;
            case 'Chuck':
                clearInterval(InterChuck);
                break;
            case 'Love':
                clearInterval(InterLove);
              break;
              case 'Search':
                clearInterval(InterSearch);
              break;
              case 'Random':
                clearInterval(InterRandom);
              break;
              case 'Player':
                clearInterval(InterPlayer);
              break;
            default:
              console.log("Erreur")
          }
    }

    // Fonction qui relance la love meter
    function retry(){
        document.getElementById("divLove").remove();

        document.getElementsByClassName("inputLove")[0].classList.remove("invisible");
        document.getElementById("submitLove").classList.remove("invisible");
    }

    function changeCode(){
        document.getElementById("divMeteo").remove();
        document.getElementById("codePostal").classList.remove("invisible");
        document.getElementById("submitMeteo").classList.remove("invisible");
        document.getElementById("txtMeteo").classList.remove("invisible");
    }

    // Fonction qui submit la plus part des widgets
    function submit(){
        if (titre === "LoveMeter"){
            let elem = document.getElementById("nom1").value
            let elem2 = document.getElementById("nom2").value
            
            let config = {
                headers: {
                  token: localStorage.getItem("token"),
                }
              }
              new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8080/getLove', { name1: elem,name2: elem2},config)
               .then((response) => {resolve(response.data)
                   document.getElementsByClassName("inputLove")[0].classList.add("invisible");
                   document.getElementById("submitLove").classList.add("invisible");
                   
                   let body = document.getElementsByClassName("LoveMeter")[0];
                   
                   let div = document.createElement("div")
                   div.id = "divLove";

                   let img = new Image(300, 300);
                   if (response.data.percentage < 50){
                       img.src = "https://www.pngmart.com/files/5/Broken-Heart-PNG-Picture.png"
                   }
                   else{
                       img.src = "http://pngimg.com/uploads/heart/heart_PNG51352.png"
                   }
                   img.classList = "coeur"

                   let btn = document.createElement("input")
                   btn.type = "button"
                   btn.value = "Retry ?"
                   btn.onclick = retry;

                   let txt = document.createElement("h1")
                   txt.innerHTML = response.data.percentage +"%"
                   txt.classList = "txtLove";

                 
                   
                   if(document.getElementById("divLove") == null){
                       body.appendChild(div)
                       div.appendChild(img);
                       div.appendChild(btn);
                       div.appendChild(txt);
                   }else{
                   div.remove()
                   body.appendChild(div)
                   div.appendChild(img);
                   div.appendChild(btn);
                   div.appendChild(txt);
                   }
               })
       })
              let intervalLove = setInterval(() => { return new Promise((resolve, reject) => {
                     axios.post('http://127.0.0.1:8080/getLove', { name1: elem,name2: elem2},config)
                    .then((response) => {resolve(response.data)
                        document.getElementsByClassName("inputLove")[0].classList.add("invisible");
                        document.getElementById("submitLove").classList.add("invisible");
                        
                        let body = document.getElementsByClassName("LoveMeter")[0];
                        
                        let div = document.createElement("div")
                        div.id = "divLove";

                        let img = new Image(300, 300);
                        if (response.data.percentage < 50){
                            img.src = "https://www.pngmart.com/files/5/Broken-Heart-PNG-Picture.png"
                        }
                        else{
                            img.src = "http://pngimg.com/uploads/heart/heart_PNG51352.png"
                        }
                        img.classList = "coeur"

                        let btn = document.createElement("input")
                        btn.type = "button"
                        btn.value = "Retry ?"
                        btn.onclick = retry;

                        let txt = document.createElement("h1")
                        txt.innerHTML = response.data.percentage +"%"
                        txt.classList = "txtLove";

                      
                        
                        if(document.getElementById("divLove") == null){
                            body.appendChild(div)
                            div.appendChild(img);
                            div.appendChild(btn);
                            div.appendChild(txt);
                        }else{
                        div.remove()
                        body.appendChild(div)
                        div.appendChild(img);
                        div.appendChild(btn);
                        div.appendChild(txt);
                        }
                    })
            })}, 2000000);
            setInterlove(intervalLove)
        }
        else if (titre === "Spotify"){

            let config = {
                headers: {
                  client_id: "96b9ddcdacc24ad49e20b9f5bd90369b",
                  response_type: "code",
                  redirect_uri: "http://localhost:3000/home"
                }
              }
              let intervalSearch =    setInterval(() => {   return new Promise((resolve, reject) => {
                axios.get('https://accounts.spotify.com/authorize', config)
                    .then((response) => {resolve(response.data)
                    })
            })}, 200000);
            setInterSearch(intervalSearch)
        }
        else if(titre === "Meteo"){
            let codePostal = document.getElementById("codePostal").value
             new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8080/getweather', {codePostal: codePostal})
                    .then((response) => {resolve(response.data)
                        try{

                            document.getElementById("divMeteo").remove();
                        }   
                        catch(error){}
                        document.getElementById("codePostal").classList.add("invisible");
                        document.getElementById("submitMeteo").classList.add("invisible");
                        document.getElementById("txtMeteo").classList.add("invisible");

                        let body = document.getElementsByClassName("Meteo")[1];
                        let div = document.createElement("div")
                        div.id = "divMeteo";

                        let temperature = document.createElement("h1");
                        temperature.id = "tempMeteo"
                        temperature.innerHTML = response.data.temp_c + "°C "

                        let btnRetry = document.createElement("input")
                        btnRetry.type = "button"
                        btnRetry.value = "Change postal code"
                        btnRetry.onclick = changeCode;

                        
                        let img = new Image(150, 150);
                        img.src = require('../MeteoImg/' + response.data.wx_icon.split(".")[0] +".png")
                        
                        let txt = document.createElement("p")
                        txt.innerHTML = "The time is " + response.data.wx_desc 

                        if(document.getElementById("divMeteo") == null){
                        body.appendChild(div);
                        div.appendChild(img)
                        div.appendChild(temperature)
                        div.appendChild(txt)
                        div.appendChild(btnRetry)
                        }else{
                        div.remove()
                        body.appendChild(div);
                        div.appendChild(img)
                        div.appendChild(temperature)
                        div.appendChild(txt)
                        div.appendChild(btnRetry)
                        }
                    })
                    .catch(function(error) {
                        let body = document.getElementsByClassName("Meteo")[1];
                        let div = document.createElement("div")
                        div.id = "divMeteo";

                        let message = document.createElement("h1");
                        message.id = "messageError"
                        message.innerHTML = "Error, Retry please"

                        body.appendChild(div);
                        div.appendChild(message)
                    })
            })
            let intervalMeteo =    setInterval(() => {   return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8080/getweather', {codePostal: codePostal})
                    .then((response) => {resolve(response.data)
                        try{

                            document.getElementById("divMeteo").remove();
                        }   
                        catch(error){}
                        document.getElementById("codePostal").classList.add("invisible");
                        document.getElementById("submitMeteo").classList.add("invisible");
                        document.getElementById("txtMeteo").classList.add("invisible");

                        let body = document.getElementsByClassName("Meteo")[1];
                        let div = document.createElement("div")
                        div.id = "divMeteo";

                        let temperature = document.createElement("h1");
                        temperature.id = "tempMeteo"
                        temperature.innerHTML = response.data.temp_c + "°C "

                        let btnRetry = document.createElement("input")
                        btnRetry.type = "button"
                        btnRetry.value = "Change postal code"
                        btnRetry.onclick = changeCode;

                        
                        let img = new Image(150, 150);
                        img.src = require('../MeteoImg/' + response.data.wx_icon.split(".")[0] +".png")
                        
                        let txt = document.createElement("p")
                        txt.innerHTML = "The time is " + response.data.wx_desc 

                        if(document.getElementById("divMeteo") == null){
                        body.appendChild(div);
                        div.appendChild(img)
                        div.appendChild(temperature)
                        div.appendChild(txt)
                        div.appendChild(btnRetry)
                        }else{
                        div.remove()
                        body.appendChild(div);
                        div.appendChild(img)
                        div.appendChild(temperature)
                        div.appendChild(txt)
                        div.appendChild(btnRetry)
                        }
                    })
                    .catch(function(error) {
                        let body = document.getElementsByClassName("Meteo")[1];
                        let div = document.createElement("div")
                        div.id = "divMeteo";

                        let message = document.createElement("h1");
                        message.id = "messageError"
                        message.innerHTML = "Error, Retry please"

                        body.appendChild(div);
                        div.appendChild(message)
                    })
            })}, 2000);
            setInterMetoeo(intervalMeteo)
        }

        else if (titre === "Chuck"){
            new Promise((resolve, reject) => {
                axios.get('http://127.0.0.1:8080/getjoke')
                    .then((response) => {resolve(response.data)
                        try{
                            document.getElementById("txtChuck").remove();
                        }
                        catch(error){
                            console.log(error)
                        }

                        let body = document.getElementsByClassName("Chuck")[1];

                        let div = document.createElement("div")
                        div.id = "divChuck";

                        let txt = document.createElement("p");
                        txt.innerHTML = response.data.value
                        txt.id = "txtChuck"

                        if(document.getElementById("divChuck") == null){
                            body.appendChild(div);
                        div.appendChild(txt)
                            }else{
                            div.remove()
                            body.appendChild(div);
                            div.appendChild(txt)
                            }
                    })
            })
            let intervalChuck =    setInterval(() => {     return new Promise((resolve, reject) => {
                axios.get('http://127.0.0.1:8080/getjoke')
                    .then((response) => {resolve(response.data)
                        try{
                            document.getElementById("txtChuck").remove();
                        }
                        catch(error){
                            console.log(error)
                        }

                        let body = document.getElementsByClassName("Chuck")[1];

                        let div = document.createElement("div")
                        div.id = "divChuck";

                        let txt = document.createElement("p");
                        txt.innerHTML = response.data.value
                        txt.id = "txtChuck"


                        if(document.getElementById("divChuck") == null){
                            body.appendChild(div);
                        div.appendChild(txt)
                            }else{
                            div.remove()
                            body.appendChild(div);
                            div.appendChild(txt)
                            }
                    })
            })}, 6000);
            setInterChuck(intervalChuck)
        }
    }


    return (
        <div id="card1" className='card'>
            <div className='Head'>
                <input className='btnQuit' id="btnQuit" type="button" value="❌" onClick={() =>quit({titre})}></input>
                <h1 className='titreCard'>{titre}</h1>
            </div>
            {titre === "LoveMeter" ?
                <div className='Body LoveMeter'>
                    <div className='inputLove'>
                        <input type="text" id="nom1" placeholder='Nom 1'></input>   
                        <input type="text" id="nom2" placeholder='Nom 2'></input>   
                    </div>
                    <input id="submitLove" type="button" value="Mesure Love" onClick={() => {submit()}}></input>
                </div>
            : titre === "SpotifySearch" ?
                <div className='Body'>
                    {!tokenSpotify ?
                        <a className='button' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} >Login with Spotify</a>
                    :   
                        <button onClick={SpotifyLogout}>logout</button>
                    }

                    {tokenSpotify ?
                        <form onSubmit={searchTrack}>
                            <input type="text" placeholder='Music' onChange={e => setSearchKey(e.target.value)}></input>
                            <button type="submit">Search</button>
                        </form>
                    :null}
                    <div className='trackList'>
                        <TrackList />                   
                    </div>                     
                </div>

            :titre === "SpotifyPlay" ?
                <div id="divPlayer">
                </div>

            : titre === "PokemonRandom" ?
                <div className='Body'>
                    <input id="submitLove" type="button" value="Random Pokemon" onClick={() => {getRandomPokemon()}}></input>
                    <RandomPokemon />
                </div>
            
            : titre === "Pokemon" ?
                <div className='Body'>
                        <input id="txtPokemon" type="text" placeholder='Pokemon name'></input>
                        <button type="submit" onClick={searchPokemon}>Search</button>
                    <Pokemon />
                </div>

            : titre === "PokemonEvolution" ?
                <div className='Body'>
                    <input id="txtPokemonEvolution" type="text" placeholder='Pokemon ID'></input>
                    <button type="submit" onClick={searchPokemonEvolution}>Search</button>
                    <PokemonEvolution />
                </div>

            : titre === "Meteo" ?
                <div className='Body Meteo'>
                    
                    <p id="txtMeteo">Type your postal code</p>
                    <input type="text" id="codePostal" placeholder='Code Postal'></input>   
                    <input id="submitMeteo" type="button" value="submit" onClick={() => {submit()}}></input>
                </div>
            : titre === "Discord" ?
                <div className='Body Discord'>
                    <iframe title='discord'src="https://discordapp.com/widget?id=1029829518430580788&theme=dark" width="350" height="500" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            : titre === "Chuck" ?
                <div className='Body Chuck'>
                    <input id="submitChuck" type="button" value="Try a joke ?" onClick={() => {submit()}}></input>
                </div>
            : null
        }
            
        </div>
    )
}



export default Card;
