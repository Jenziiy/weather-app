let city = 'London';
let unit = 'C';

const getWeather = async function (){
  try {
    let response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=6e512773dd404c5d921214724232510&q=${await getUserInput()}&aqi=no`);
    let responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('oops');
  }
}

async function setWeather(weather){
  let paragraph = document.querySelector('p');
  unit === 'C' ? paragraph.textContent =  ` ${weather.current.temp_c} celsius`: paragraph.textContent = `${weather.current.temp_f} fahrenheit`;
}

async function getUserInput(){
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