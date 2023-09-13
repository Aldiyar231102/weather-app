import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import LocationBox from './components/LocationBox';
import WeatherBox from './components/WeatherBox'; 

const api = {
  key: '189f1d33833e6df4d52079fe98917ecf',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <SearchBox query={query} setQuery={setQuery} search={search} />
        {(typeof weather.main != "undefined") ? (
          <div>
            <LocationBox weather={weather} dateBuilder={dateBuilder} />
            <WeatherBox weather={weather} />
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;