let unit = 'C';

const getWeather = async function (){
  try {
    let response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=6e512773dd404c5d921214724232510&q=${await getUserInput()}&aqi=no`);
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('oops', error);
  }
}

async function setWeather(weather){
  let paragraph = document.querySelector('p');
  let txt =  `The weather in ${weather.location.name} is:`;
  let uvtxt = `and the uv index is ${weather.current.uv} `;
  try {
    unit === 'C' ? paragraph.textContent =  ` ${txt} ${weather.current.temp_c} celsius ${uvtxt}`: paragraph.textContent = `${txt}  ${weather.current.temp_f} fahrenheit ${uvtxt}`;
    if (weather.current.temp_c >= 20){
      let weatherType = 'hot';
      getImage(weatherType) 
    } else if (weather.current.temp_c <= 20 && weather.current.precip_mm > 2){
      weatherType = 'rain';
      getImage(weatherType)
    } else {
      weatherType = 'cold';
      getImage(weatherType)
    }
  } catch (error) {
    console.error('you should input a valid city name ok');
    document.querySelector('p').textContent = 'you should input a valid city name ok';
  }
  
}

async function getUserInput(){
  if (document.querySelector('#search-location').value == '') return 'montreal';
  return document.querySelector('#search-location').value;
}

// listen for enter to search 
document.addEventListener('keypress', async (e) => { 
  if (e.key === 'Enter'){ setWeather(await getWeather()) };
 });

 function toggleUnit(){
   let toggle = document.querySelector('.slider');
   toggle.getAttribute('data-content');
   toggle.getAttribute('data-content') === 'C' ? toggle.setAttribute('data-content', 'F' ) : toggle.setAttribute('data-content', 'C' );
   unit = toggle.getAttribute('data-content');
 }

 const toggle = document.querySelector('.slider');
 toggle.addEventListener('click', async () => { toggleUnit(); setWeather(await getWeather())} );


 img = document.querySelector('#weather-image');
   function getImage(weatherType){ fetch(`https://api.giphy.com/v1/gifs/translate?api_key=0rAsbwH3i7285Zch6HeplahChR0fzjvJ&s=${weatherType}&weirdness=6`, {mode:'cors'} )
    .then((response)=>{
      return response.json();
    })
    .catch((error) => { console.error('woops something couldnt be fetched', error) } )
    .then((response)=>{
      if (response.data == 0) {console.log('common');throw new Error('oopsiedaisy, no gif could be found');}
      Promise.resolve( img.src = response.data.images.original.url);
    })
    .catch((error) => { console.error('woops something couldnt be fetched', error) } )}