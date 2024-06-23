import hotBg from './assets/hot.jpg';
import coldBg from "./assets/cold.jpg";
import Descriptions from "./Components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [bg, setBg] = useState(hotBg);
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');

  const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units)
    console.log(data)
    setWeather(data);
    
    const threshold = units === 'metric' ? 20 : 60;
    if(data?.temp <= threshold) setBg(coldBg)
    else setBg(hotBg)
  };
  useEffect(()=>{
    
      fetchWeatherData();
     
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[units, city]);
  
  const handleUnitsClick = (e) => {
    const button = e?.currentTarget;
    const currentUnit = button?.innerText?.slice(1);
    // console.log(button.innerText);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C"
    setUnits(isCelsius ? "metric" : "imperial");
  }
  const enterKeyPressed = (e) => {
    if(e.keyCode === 13){
      setCity(e?.currentTarget?.value)
      e?.currentTarget?.blur();
    }
  }
  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
            <div className="container">
              <div className="section section__inputs">
                <input 
                onKeyDown={enterKeyPressed}
                type="text" 
                name="city" 
                placeholder="Enter City...."
                />
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>
              { weather && (
                <div className="section section__temperature">
                  <div className="icon">
                    <h3>{`${weather?.name}, ${weather?.country}`}</h3>
                    <img src={weather?.iconURL} alt="weather"/>
                    <h3>{ weather?.description }</h3>

                  </div>
                  <div className="temperature">
                    <h1>{ (`${weather?.temp?.toFixed()} °${units === 'metric' ? "C" : "F"}`) }</h1>
                  </div>
                </div>
              )}
            {/* botton descripton */}
            <Descriptions weather={weather} units={units}/>
          </div>  
        </div>
    </div>
  );
}

export default App;
