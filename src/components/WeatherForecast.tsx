import React, { useState } from "react";
import CommonCard from "./common/commonCard";

interface WeatherData {
  temperature: number;
  weather: string;
  date: string;
  icon:any;
}
interface CurrentWeather {
  temperature: number;
  weather: string;
  city: string;
 wind:number;
}
const WeatherForecast: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const[getCity,setGetCity] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c84271722822460c8c83c83b34e60329`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("current",data);
        setCurrentWeather({
          temperature: data.main.temp,
          weather: data.weather[0].main,
          city: data.name,
          wind:data.wind.speed
        });
        if (data.cod === 200) {
          const lat = data.coord.lat;
          const lon = data.coord.lon;
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c84271722822460c8c83c83b34e60329`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("forecast",data);

              setGetCity(data.city.name);
              if (data.cod === "200") {
                const weatherData = data.list
                
                  .map(
                    (d: {
                      main: { temp: any };
                      weather: {
                        icon: any; main: any 
}[];
                      dt_txt: any;
                      icon:any
                    }) => {
                      return {
                        temperature: d.main.temp,
                        weather: d.weather[0].main,
                        date: d.dt_txt,
                        icon:d.weather[0].icon

                      };
                    }
                  );
                setWeatherData(weatherData);
              } else {
                setError("Unable to fetch data");
              }
            });
        } else {
          setError("City not found");
        }
      });
      setCity("")
  };

  return (
    <div className=" mt-5 ">
      <div className="d-flex">
        <form className="row  m-auto" onSubmit={handleSubmit}>
          <div className="col-md-8">
            <label className="visually-hidden">Password</label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary mb-3">
              Search
            </button>
          </div>
        </form>
        </div>
        
        <div >
         
          {currentWeather ? (
            
            <div className="col-md-12 mb-2 m-auto">
              <h4>Current weather</h4>
              <CommonCard
              temperature={currentWeather.temperature}
              weather={currentWeather.weather}
              city={currentWeather.city}
              wind={currentWeather.wind}
            />
            </div>
            
          ) : (
            ""
          )}
        </div>
       
        {error !== "" ? (
          <p className="text-danger mt-3">{error}</p>
        ) : weatherData.length > 0 ? (
          <div>
          <h2>5 Day's Weather Forecast</h2>
          <div className="d-flex flex-wrap">
           
            {weatherData.map((d, i) => (
              <div className="col-md-3 mt-2 p-2">
              <CommonCard
                temperature={d.temperature}
                weather={d.weather}
                date={d.date}
                city={getCity}
                icon={d.icon}
              />
              </div>
            ))}
          </div>
          </div>
        ) : null}
        
      </div>
  
  );
};

export default WeatherForecast;
