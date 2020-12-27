<template>
  <nav>
    <ul class="nav-list">
        <li><router-link class="nav-links" to="/">Home</router-link></li>
        <li><router-link class="nav-links" to="about">About</router-link></li>
        <li><router-link class="nav-links" to="blog">Blog</router-link></li>
    </ul>
  </nav>
  <section class="home">
    <div class="home-content">
      <div class="home-presentation">
        <h1>Welcome to my Homepage!</h1>
        <h2> {{ }}</h2>
        <p>This is my very first Homepage!</p>
        <p>I´m happy and pleased to welcome you on my Page!</p>
      </div>
      <img class="image" src="../assets/mobile-phone-shows-the-word-create-on-a-white-table.jpg"/>
    </div>

    <div class="search-box">
      <input
              type="text"
              class="search-bar"
              placeholder="Search..."
              v-model="query1"
              @keypress="fetchWeather"
      />
    </div>
    <div class="weather-wrap" v-if="typeof weather.current != 'undefined'">
      <div class="weather-wrap-container">
        <div class="location">{{ query }}, {{ country_code }}</div>
          <div class="date0">{{ dateBuilder(weather.daily[0].dt) }}</div>
          <div class="date1">{{ dateBuilder(weather.daily[1].dt) }}</div>
          <div class="date2">{{ dateBuilder(weather.daily[2].dt) }}</div>
          <div class="date3">{{ dateBuilder(weather.daily[3].dt) }}</div>
          <div class="date4">{{ dateBuilder(weather.daily[4].dt) }}</div>
          <div class="temp0">{{ Math.round(weather.daily[0].temp.day) }}°C</div>
          <div class="temp1">{{ Math.round(weather.daily[1].temp.day) }}°C</div>
          <div class="temp2">{{ Math.round(weather.daily[2].temp.day) }}°C</div>
          <div class="temp3">{{ Math.round(weather.daily[3].temp.day) }}°C</div>
          <div class="temp4">{{ Math.round(weather.daily[4].temp.day) }}°C</div>
          <div id="weather" class="weather0">{{ weather.daily[0].weather[0].main }}</div>
          <div class="weather1">{{ weather.daily[1].weather[0].main }}</div>
          <div class="weather2">{{ weather.daily[2].weather[0].main }}</div>
          <div class="weather3">{{ weather.daily[3].weather[0].main }}</div>
          <div class="weather4">{{ weather.daily[4].weather[0].main }}</div>

      </div>
    </div>

  </section>
</template>

<script>





  export default {
    name: 'Home',
    data() {
      return {
        api_key: '8cf46691d4701a2835c55c5306556a12',
        url_base: 'https://api.openweathermap.org/data/2.5/',
        url_base_ip: 'https://api.ipdata.co?api-key=2ecd89902fd849aadc8c08a7457c38373b3feaa75c14b52829a8055d',
        query: '',
        query1: '',
        weather: {},
        city: "",
        data: '',
        latitude: '',
        longitude: '',

      }
    },
    methods: {
      fetchWeather(e) {
        if (e.key == "Enter") {
          this.query = this.query1;
          this.getCoords()
          console.log(this.longitude)
          console.log(this.latitude)
          console.log(this.query)
        }
      },

      getCoords(){
        fetch(`https://api.tomtom.com/search/2/geocode/${this.query}.json?key=iweaIfGD3WDZzZxGlhgdF920JiA8nINP`)
                .then(function(response) {
                  var contentType = response.headers.get("content-type");
                  if(contentType && contentType.includes("application/json")) {
                    return response.json();
                  }
                  throw new TypeError("Oops");
                })
                .then(json => {
                  this.country_code = json.results[0].address.countryCode;
                  this.latitude = json.results[0].position.lat;
                  this.longitude = json.results[0].position.lon;
                  this.getWeatherData()
                })
      },

      setWeather(results) {
        this.weather = results;

//        console.log(this.weather)
//        console.log(typeof this.weather.current)
//        console.log(this.weather.daily[0].temp.day)
//        for(let i=0;i<6;i++)
//        {
//          console.log(this.dateBuilder(this.weather.daily[i].dt))
//        }

      },

      getWeatherData() {
        fetch(`${this.url_base}onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely,hourly&units=metric&APPID=${this.api_key}`)
                .then(res => {
                  return res.json();
                }).then(this.setWeather)
      },

      dateBuilder(val) {
        let d = new Date(val * 1000);
        let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
        let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date}` + `.` + ` ${month} ${year}`;
      },


      getCity() {
         return fetch(`https://api.ipdata.co?api-key=test`)
                .then(function(response) {
                  var contentType = response.headers.get("content-type");
                  if(contentType && contentType.includes("application/json")) {
                    return response.json();
                  }
                  throw new TypeError("Oops");
                })
                .then(json => {
                  this.longitude = json.longitude;
                  this.latitude = json.latitude;
                  this.query = json.city;
                  this.country_code = json.country_code;
                  fetch(`${this.url_base}onecall?lat=${this.latitude}&lon=${this.longitude}&units=metric&APPID=${this.api_key}`)
                          .then(res => {
                            return res.json();
                          }).then(this.setWeather)
                })
                .catch(function(error) {
                  console.log(error)
                })


      },
    },
    created() {
      this.getCity();
    }
  }




</script>

<style lang="scss" scoped>

  nav {
    margin-top: -20px;
    background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
  }

  .nav-list {
    height: 8vh;
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    margin-left: auto;
    list-style: none;
  }

  .nav-links {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: bold;
  }

  .home-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .home {
    height: 85vh;
    position: absolute;
    width: 100%;
  }

  .image {
    height: 50vh;
    border-radius: 100vh;
  }

  main {
    min-height: 100vh;
    padding: 25px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  }

  .search-box {
    width: 20%;
    margin: auto;
  }

  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    text-align: center;
    margin-bottom: 10px;

    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    background-color: rgba(255, 255, 255, 0.5);

    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  }

  .search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
  }

  .weather-wrap-container {

    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    font-style: italic;
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 6;
    justify-content: center;
    text-align: center;
    align-content: center;
    grid-template-columns:repeat(5, 1fr);

    .location {
      color: black;
      font-size: 32px;
      font-weight: 500;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
      grid-row: 1;
      grid-column: 3;
    }


      .date0 {
        grid-row: 2;
        grid-column: 1;
      }
      .date1 {
        grid-row: 2;
        grid-column: 2;
      }
      .date2 {
        grid-row: 2;
        grid-column: 3;
      }
      .date3 {
        grid-row: 2;
        grid-column: 4;
      }
      .date4 {
        grid-row: 2;
        grid-column: 5;
      }


      .temp0 {
        padding: 10px 10px;
        color: white;
        font-size: 70px;
        font-weight: 900;

        text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        //      background-color: rgba(255, 255, 255, 0.25);
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
        border-radius: 16px;
        margin: 10px 40px;

        box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        grid-column: 1;
        grid-row: 3;
      }

      .temp1 {
        padding: 10px 10px;
        color: white;
        font-size: 70px;
        font-weight: 900;

        text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        //      background-color: rgba(255, 255, 255, 0.25);
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
        border-radius: 16px;
        margin: 10px 40px;

        box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        grid-column: 2;
        grid-row: 3;
      }

      .temp2 {
        padding: 10px 10px;
        color: white;
        font-size: 70px;
        font-weight: 900;

        text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        //      background-color: rgba(255, 255, 255, 0.25);
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
        border-radius: 16px;
        margin: 10px 40px;

        box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        grid-column: 3;
        grid-row: 3;
      }

      .temp3 {
        padding:10px 10px;
        color: white;
        font-size: 70px;
        font-weight: 900;

        text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        //      background-color: rgba(255, 255, 255, 0.25);
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
        border-radius: 16px;
        margin: 10px 40px;

        box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        grid-column: 4;
        grid-row: 3;
      }

      .temp4 {
        padding: 10px 10px;
        color: white;
        font-size: 70px;
        font-weight: 900;

        text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        //      background-color: rgba(255, 255, 255, 0.25);
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
        border-radius: 16px;
        margin: 10px 40px;

        box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        grid-column: 5;
        grid-row: 3;
      }
    }
  
    .weather0 {
      margin-top: -20px;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      grid-row: 4;
      grid-column: 1;
    }
    .weather1 {
      margin-top: -20px;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      grid-row: 4;
      grid-column: 2;
    }
    .weather2 {
      margin-top: -20px;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      grid-row: 4;
      grid-column: 3;
    }
    .weather3 {
      margin-top: -20px;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      grid-row: 4;
      grid-column: 4;
    }
    .weather4 {
      margin-top: -20px;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      grid-row: 4;
      grid-column: 5;
    }

</style>
