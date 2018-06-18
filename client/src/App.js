import React, { Component } from 'react';
import './css/conf.min.css';
import Spotify from 'spotify-web-api-js';



const SpotifyWebApi = new Spotify();




class App extends Component {
 constructor(){
  super()
   const params = this.getHashParams();
   this.state ={
    loggedIn: params.access_token ? true : false,
    nowPlaying: {
      name: 'No Music',
      image: ''
    }
   }
   if (params.access_token){
     SpotifyWebApi.setAccessToken(params.access_token)
   }
   var progress;
   this.interval = setInterval(() => {
    this.getNowPlaying()
   }, 5000);
 }

 componentWillUnmount() {
    clearInterval(this.interval);
 }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

getNowPlaying(){
SpotifyWebApi.getMyCurrentPlaybackState()
.then((Response) => {
  if (Response !== "") {this.setState({
    nowPlaying:{
      name: Response.item.name,
      image: Response.item.album.images[0].url,
      artiste: Response.item.artists[0].name
    }
    })



  }else{
    alert("Play music !");
    console.log("Play music !")}

})
}

setConnexionBtn() {

  if (!this.state.loggedIn) {
    return (<a href='http://localhost:8888'>
              <button className="connected">Connexion</button>
           </a>);
  }
return null;

}

  render() {
    return (




      <div className="App">


    {this.setConnexionBtn()}


<div className="main-wrapper"> 
<div className="box1"> 
<img src={ this.state.nowPlaying.image} /> 
</div>

<div className="box2">
<div class="box-in">
<h1>{ this.state.nowPlaying.name} </h1>
<p>{ this.state.nowPlaying.artiste} </p> 
</div>

</div>
</div>
<div 
  className="background" 
  style={{backgroundImage: `url(${this.state.nowPlaying.image})`}}
></div>

{/* <button onClick={() => this.getNowPlaying()}>joue</button> */}

      </div>
    );
  }
}

export default App;
