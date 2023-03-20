const apikey = 'o3brnQ5WWiWQtdASLrkRZYq0qRqCImkSfpTJf6hT';
const URL = 'https://api.nasa.gov/planetary/apod?api_key=' + apikey;
const weatUrl='https://api.weatherapi.com/v1/current.json?key=2814de38563e48db84c152715232003&q=Portugal&aqi=no';

function get_Url(url){
    let request = new XMLHttpRequest()
    request.open("get",url,false)
    request.send()
    return request.responseText
}

function createRow(planetary){
    let row = document.createElement("tr")
    let explanationCell = document.createElement("td")
    let titleCell = document.createElement("td")
    let dateCell = document.createElement("td")
    titleCell.innerHTML = planetary.title
    explanationCell.innerHTML = planetary.explanation
    dateCell.innerHTML = planetary.date
    

    row.appendChild(titleCell)
    row.appendChild(explanationCell)
    row.appendChild(dateCell)
    

    return row
}

function createWeather(current){
    let row = document.createElement("tr")
    let is_DayCell = document.createElement("td")
    let nameCell = document.createElement("td")
    let regionCell = document.createElement("td")
    let countryCell = document.createElement("td")
    let latCell = document.createElement("td")
    let lonCell = document.createElement("td")
    let tempCCell = document.createElement("td")
    let localTCell = document.createElement("td")

    is_DayCell.innerHTML = current.current.is_day
    nameCell.innerHTML = current.location.name
    regionCell.innerHTML = current.location.region
    countryCell.innerHTML = current.location.country
    latCell.innerHTML = current.location.lat
    lonCell.innerHTML = current.location.lon
    tempCCell.innerHTML = current.current.temp_c
    localTCell.innerHTML = current.location.localtime

    row.appendChild(is_DayCell)
    row.appendChild(nameCell)
    row.appendChild(regionCell)
    row.appendChild(countryCell)
    row.appendChild(latCell)
    row.appendChild(lonCell)
    row.appendChild(tempCCell)
    row.appendChild(localTCell)

    return row
}

function main(){
    let data = get_Url(URL)
    let planetary = JSON.parse(data)
    let table = document.getElementById("tabela")
    
    let row = createRow(planetary)
    table.appendChild(row)
    
}

function weatMain()
{
    let data = get_Url(weatUrl)
    let location = JSON.parse(data)
    let table = document.getElementById("weatherId")
    
    let row =  createWeather(location)
    table.appendChild(row)
    
}




main()
weatMain()
