import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import {App} from './App';

createServer({
  models:{
    transaction: Model,

  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento I de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-09-21 09:00:15')
        },
        {
          id: 2,
          title: 'Desenvolvimento II de website',
          type: 'withdraw',
          category: 'compras',
          amount: 125,
          createdAt: new Date('2021-09-23 19:07:10')
        }        
      ]
    })
  },
  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
     return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create( 'transaction', data);
    })
    
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

