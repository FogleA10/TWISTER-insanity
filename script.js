const APIkey = `833a5451ef3423413fe6e789b8687cf3`////myapikeyputbackinlater'4df1b28c01626c120d0a88f52b67474d'

// Click listener for your search input
    // grab the city they wanrt ch for
    // call the first fetch function and pass in the city
   

const getLatLon = (city) => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`
    fetch (apiUrl)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        //GET LAT AND LON
        return getForecast(data.coord.lat, data.coord.lon)

    })
}

const getForecast = (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${APIkey}`
    fetch (apiUrl)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
      document.querySelector("#todays-forecast").textContent = data.current.weather[0].description
    })
}
//getLatLon("Raleigh")
document.querySelector("#search-btn").addEventListener("click", function(){ 
    const searchInput = document.querySelector("#search-input").value
    console.log(searchInput)
getLatLon(searchInput)

})
//save latest search history 
//showing those buttons and click to show the cities weather
//target id on big card title, todays weather # todays weather line 30
//work with line 34
//loop 5 times the array 0is today done, 12345, tomorrow through next 5 days