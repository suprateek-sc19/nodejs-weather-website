console.log('Client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.innerHTML = "Loading..."

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        
        if(data.error){ 
            messageOne.innerHTML = data.error
        }
        else{
            messageOne.innerHTML = "Location: "+data.location+"</br> </br> Forecast: "+data.forecast
        }
    })
})
})