import axios from 'axios'

const foodList = document.querySelector('#food-list')
const renderFood = (foods) => {
    const html = foods.map(food => `
    <li>
    
    <button data-id = '${food.id}'>${food.name}</button>
        
    </li>
    `).join('')
    foodList.innerHTML = html
}

foodList.addEventListener('click', async(ev) => {

    if(ev.target.tagName === 'BUTTON') {
        const id = ev.target.getAttribute('data-id')
        await axios.delete(`/api/foods/${id}`)
        //console.log(id)
      init()

    }
  
    
   
})

const init = async() =>{
    try{
                                        
        const response = await axios.get('/api/foods')
        const foods = response.data
        renderFood(foods) 

    }catch(ex){
        console.log(ex)
    }
}


// window.addEventListener('hashchange', ()=> {
//     console.log(window.location.hash)

// })


init()