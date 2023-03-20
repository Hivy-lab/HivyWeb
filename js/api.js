apikey='o3brnQ5WWiWQtdASLrkRZYq0qRqCImkSfpTJf6hT'

function get_Url(url){
    let request = new XMLHttpRequest()
    request.open("Get",url,false)
    request.send()
    return request.responseText
    //o3brnQ5WWiWQtdASLrkRZYq0qRqCImkSfpTJf6hT
}

function creatLigne(planetary){

}

function main(){
    data = get_Url('https://api.nasa.gov/planetary/apod?api_key='+apikey)
    planetary = JSON.parse(data)
    
    planetary.forEach(element => {
        let ligne = creatLigne(element)
    });
}

main()