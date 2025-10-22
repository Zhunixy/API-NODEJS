//to importando o express que é um framework para nodejs para criar servidores web
import express from 'express';

//guardei as funções dele na const app
const app = express();
//defini a porta do meu servidor
app.listen(3000);

//Aqui vou criar as minhas rotas
//ROTA GET
app.get('/main', (req, res) => {
    res.send('GET recebido');
})

//ROTA POST
app.post('/main', (req, res) => {
    res.send('POST recebido');
})

//ROTA PUT
app.put('/main:id', (req, res) => {
    res.send('PUT recebido');
})

//ROTA DELETE
app.delete('/main:id', (req, res) => {
    res.send('DELETE recebido');
})

