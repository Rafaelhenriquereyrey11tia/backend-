import express, { request, response } from "express"
import cors from "cors"
import mysql from "mysql2"
const app = express()
const port =3333

app.use(cors())
app.use(express.json())


const{DB_HOST , DB_NAME , DB_USER , DB_PASSWORD}=process.env
const data ={
    massage: "Você  acessou o backend!"
}



app.get("/",(request,response)=>{
    const selectCommand = "SELECT name, email , age FROM rafaelhenriquereyrey_02ma"

    database.query(selectCommand, (error, users)=>{
        if(error){
            console.log(error)
            return
        }
       response.json(users)
    })
    
})


app.post("/login", (request,response)=>{
    const {email,password}=request.body.user

    const selectCommand =" SELECT * from rafaelhenriquereyrey_02ma WHERE email = ?"
    database.query(selectCommand, [email], (error,user)=>{
        if(error){
            console.log(error)
            return
        }

        if(user.length ===0 || user[0].password !==password){
            response.json({massage:"Usuario ou senha incorretos!"})
            return
        }

        response.json({id:user[0].id ,name: user [0].name})
    })
})

app.post("/cadastrar",(request,response)=>{
    const{name , email, age ,nickname , password }= request.body.user

    const insertCommand = `
    INSERT INTO rafaelhenriquereyrey_02ma(name,email,age,nickname,password)
    VALUES (?,?,?,?,?)
    `

    database.query(insertCommand ,[name , email, age , nickname , password] ,(error) =>{
        if(error){
            console.log(error)
            return
        }
         response.status(201).json({message:"Usuaro cadastrado com sucesso!"})
      })
 })

   

   

app.listen(port, () =>{
    console.log(`Servido rodando na porta ${port}! `)
})
const database = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit:10
})