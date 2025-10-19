import express, { request, response } from "express"
import cors from "cors"
import { persons } from "./person.js"
const app = express()
const port =3333
app.use(cors())
const data ={
    massage: "Você  acessou o backend!"
}

app.get("/",(request,response)=>{
    response.json(persons)
})



app.listen(port, () =>{
    console.log(`Servido rodando na porta ${port}! `)
})