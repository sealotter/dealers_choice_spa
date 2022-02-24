const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || `postgres://postgres:banana794@localhost/food_spa`)
const {UUID,UUIDV4,STRING} = Sequelize

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "index.html")))

app.get('/api/foods', async(req, res, next) => {
    try{
     
        res.send(
            await Food.findAll()
           
        )

    }catch(ex){
        next(ex)
    }
})



const Food = conn.define('food', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey:true
    },
    name: {
        unique: true,
        type:STRING
    }
});



const init = async() => {
    try{
        await conn.sync({force:true})
        const pizza = Food.create({name:'pizza'})
        const sandwich = Food.create({name: 'sandwich'})
        const burger = Food.create({name: 'burger'})
        const chickenWings = Food.create({name:'chicken wings'})
        const pasta = Food.create({name: 'pasta'})
        const salad = Food.create({name: 'salad'})
        const brusselsSprout = Food.create({name:'brussel sprouts'})
        const iceCream = Food.create({name:'Ice cream'})

        const port = 1994
        app.listen(port, ()=> console.log(`listening on port ${port}`))

    }catch(ex) {
        console.log(ex)
    }
}

init()