const apikey = 'o3brnQ5WWiWQtdASLrkRZYq0qRqCImkSfpTJf6hT';
const url = 'https://api.nasa.gov/planetary/apod?api_key=' + apikey;

function get_Url(url){
    let request = new XMLHttpRequest()
    request.open("get",url,false)
    request.send()
    return request.responseText
}

function createRow(planetary){
    console.log(planetary)
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

function main(){
    let data = get_Url(url)
    let planetary = JSON.parse(data)
    let table = document.getElementById("tabela")
    
    let row = createRow(planetary)
    table.appendChild(row)
}

main()
