let city = 'London';

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
  paragraph.textContent = weather.current.temp_c;
}

async function getUserInput(){
  return document.querySelector('input').value;
}

// listen for enter to search 
document.addEventListener('keypress', async (e) => { 
  if (e.key === 'Enter'){ setWeather(await getWeather()) };
 });