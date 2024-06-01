import ThunderstormImg from './assets/thunderstorm.png'
import DrizzleImg from './assets/drizzle.png'
import RainImg from './assets/rain.png'
import SnowImg from './assets/snow.png'
import AtmosphereImg from './assets/atmosphere.png'
import ClearImg from './assets/clear.png'
import CloudsImg from './assets/clouds.png'

import humidityImg from './assets/humidity.png'
import windImg from './assets/windspeed.png'
import searchImg from './assets/search.png'
import errorImg from './assets/error.png'
import React,{useState} from 'react'

function Weather(){
    const [search,setSearch]=useState("Chennai")
    const [city,setCity]=useState(null)
    const [error, setError] = useState(null);

    const weatherImages = {
        'Thunderstorm': ThunderstormImg,
        'Drizzle': DrizzleImg,
        'Rain': RainImg,
        'Snow': SnowImg,
        'Atmosphere': AtmosphereImg,
        'Clear': ClearImg,
        'Clouds': CloudsImg
      };

    const getWeatherData= async()=>{
        try {
            let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f109e9e257aaeb818c6a620debb9c919&units=metric`);
            if (!data.ok) {
                throw new Error("City not found");
            }
            let result = await data.json();
            console.log(result);
            setCity(result);
            setError(null); 
        } catch (err) {
            setError(err.message);
            setCity(null); 
        }
    }

    return(
        <div className="Weather">
            <div className="Search">
                <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Enter city name"/>
                <img onClick={getWeatherData} className='button' src={searchImg}/>
            </div>
            {error ? 
            <div className="Error-message">
                <img src={errorImg}/>
                <h2>Oops! Location not found!</h2>
            </div> : <div>
                <div className='Weather-content'>
                    <h2>{city?.name}</h2>
                    <img style={{height: 200}} src={weatherImages[city?.weather[0]?.main] || weatherImages['Atmosphere']}/>
                    <div className='Temp'><h1>{Math.round(city?.main?.temp*10)/10}°</h1><p>{city?.weather[0]?.main}</p></div>
                </div>
                <div className='Footer'>
                    <div className='content'>
                        <img src={humidityImg}/>
                        <div className='data'>
                            <p>{city?.main?.humidity}%</p>
                            <p>Humidy</p>
                        </div>
                    </div>
                    <div className='content'>
                        <img src={windImg}/>
                        <div className='data'>
                            <p>{city?.wind?.speed}km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default Weather