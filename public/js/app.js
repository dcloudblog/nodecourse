const backendserver = 'localhost:3000'

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mes1 = document.querySelector('#message-1')
const mes2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    mes1.textContent = "Loading...";
    mes2.textContent = "";


    fetch(`http://${backendserver}/weather?location=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)

            mes1.textContent = data.error
        } else {
            console.log(data)

            mes1.textContent = data.location;
            mes2.textContent = `${data.description}, the temperature is  ${data.temperature} and it feels like ${data.feelslike}`;
        }  
        })
    })
    
})