import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

Modal.setAppElement('#root');

interface NewTransactionModalProps{
    onOpenNewTransactionModal: boolean,
    onCloseNewTransactionModal: ()=> void

}
export function NewTransactionModal( { onOpenNewTransactionModal, onCloseNewTransactionModal} : NewTransactionModalProps){
    const { createTransaction } = useTransactions();
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type
        })
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onCloseNewTransactionModal();
    }

    return(
        <Modal 
        isOpen={onOpenNewTransactionModal}
        onRequestClose={onCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button type="button" onClick={onCloseNewTransactionModal} className="react-close-modal">
                <img src={closeImg} alt="Fechar Modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input 
                    placeholder='Título'
                    value={title}
                    onChange ={event => setTitle(event.target.value)}
                >
                </input>
                <input 
                    type='number' 
                    placeholder='Valor'
                    value={amount}
                    onChange ={event => setAmount(Number(event.target.value))}
                >
                </input>
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={()=>setType('deposit')}
                        isActive={type==='deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={()=>setType('withdraw')}
                        isActive={type==='withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>                    
                <input 
                    placeholder='Categoria'
                    value={category}
                    onChange ={event => setCategory(event.target.value)}
                >
                </input>
                <button type='submit'>Cadastrar</button>
            </Container>
    </Modal> 
    );
}