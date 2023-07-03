import { useState } from 'react'
import './App.css'
import { SearchOutlined, LocationOn, Air, WaterDrop} from "@mui/icons-material";
import { Button } from '@mui/material';


function App() {

  const [ local, setLocal ] = useState('')
  const [temperatura, setTemperatura] = useState('')
  const [weather, setWeather] = useState('')
  const [weathericon, setWeathericon] = useState('')
  const [country, setCountry] = useState('')
  const [umidity, setUmidity] = useState('')
  const [wind, setWind] = useState(null)
  const [showdiv, setShowdiv ] = useState(false)
 

  const handleInput = (e) => {
    const dados = e.target.value
    if (dados === '') {
      setShowdiv(false)
    } setLocal(dados)
         
  }

  const apiKey = import.meta.env.VITE_KEY_WEATHER_API // Criar uma conta para poder obter uma chave no "https://openweathermap.org/api"
  
  const getWeatherData = async (local) => {
    const apiWeatherURl = `https://api.openweathermap.org/data/2.5/weather?q=${local}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURl)
    const data = await res.json()

    console.log(data);
    return data

  } 
  


  const handleSubmit = async (e) => {    
      e.preventDefault()

      console.log(local);
      
      const data = await getWeatherData(local)

      setLocal(data.name)
      setTemperatura(data.main.temp)
      const description = data.weather[0].description
      setWeather(description)
      setWeathericon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
      setCountry( `https://flagsapi.com/${data.sys.country}/flat/64.png `)
      setUmidity(`${data.main.humidity}%`)
      setWind(`${data.wind.speed}km/h`)
      setShowdiv(true)
      
    }

  return (
    <>
    <div className='container' >
      <h3>Confira o clima de uma cidade:</h3>
      <form onSubmit={(e)=> handleSubmit(e)} className="form form-input-container">
          <input className='inputText' placeholder='Digite um local' type='text' value={local} onChange={handleInput} />
          <Button type='submit' variant="contained" ><SearchOutlined /></Button>        
      </form>
      
      <div className={showdiv ? "weather-data": "hide"}>
        <h2>
          <LocationOn/>
          <span>{local}</span>
          <img 
            src={country} 
            alt="Bandeira do País" />
        </h2>
        <p id='temperature'><span>{temperatura}</span>ºC</p>
        <div className="description-container">
          <p>{weather}</p>
          <img src={weathericon} alt="Condicoes do tempo" />
        </div>
        <div className="detalhe-container">
          <p className="umidity">
            <WaterDrop/>
            <span>{umidity}</span>
          </p>
          <p >
            <Air/>
            <span>{wind}</span>
          </p>
        </div>
      </div>
      <div >  
    </div>
</div>
    <img src="imgs/Virtu_Logo_branca.png" alt="logo" className='minha-logo'/>
</>
  )
}

export default App
