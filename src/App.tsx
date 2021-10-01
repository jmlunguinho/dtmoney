import { Dashboard } from "./components/Dashboard";
import { useState } from 'react'
import { Header } from "./components/Header";
import { TransactionsProvider } from "./hooks/useTransactions";
import { NewTransactionModal } from "./components/NewTransactionModal"
import { GlobalStyle } from "./styles/global";


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleNewTransactionOpen(){
    setIsNewTransactionModalOpen(true);
  }

  function handleNewTransactionClose(){
      setIsNewTransactionModalOpen(false);
    }  
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleNewTransactionOpen}/>
      <Dashboard/>
      <NewTransactionModal onOpenNewTransactionModal={isNewTransactionModalOpen} onCloseNewTransactionModal={handleNewTransactionClose}/>
      <GlobalStyle/>
    </TransactionsProvider>
  );
}


