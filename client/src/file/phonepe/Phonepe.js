import React, { useState } from 'react';
import '../paypal/paypal.css';
import axios from 'axios';
import zestify from '../../image/png-01.png'

const Phonepe = () => {
    const [loading2, setLoading2] = useState(false);

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('')
    

    const data ={
        name: {name},
        amount: {amount},
        number: {number},
        email: {email},
        MUID: "MUID" + Date.now(),
        transactionId: 'T' + Date.now(),
    }

    const handlePayment = (e)=>{
        e.preventDefault();
        setLoading2(true);
        axios.post('api/payment', {...data}).then(res => {  
        setTimeout(() => {
            setLoading2(false);
        }, 1500);
        })
        .catch(error => {
            setLoading2(false)
            console.error(error);
        });   
    }
  return (
    <>
    <div className='main'>
        <div className='center'>
            <img width={300} src={zestify} alt='' />
            
        </div>
        <div className='card px-5 py-4 mt-5'>
            <form onSubmit={handlePayment}>
                <div className='col-12 '>
                    <p className='fs-5'><strong>Name:</strong> <input type='text' value={name} onChange={(e) => setName(e.target.value) } /> </p>
                </div>
                <div className='col-12 '>   
                    <p className='fs-5'><strong>Number:</strong> <input type='number' value={number} onChange={(e) => setNumber(e.target.value) } /> </p>
                </div>
                <div className='col-12 '>   
                    <p className='fs-5'><strong>Email:</strong> <input type='email' value={email} onChange={(e) => setEmail(e.target.value) } /> </p>
                </div>
                <div className='col-12 '>
                    <p className='fs-5'><strong>Amount:</strong>  <input type='number' value={amount} onChange={(e) => setAmount(e.target.value) } /> Rs</p>
                </div>
                {!loading2? <div className='col-12 center'>
                    <button className='w-100 ' type="submit">Make Payment</button>
                </div>
                :
                <div className='col-12 center'>
                    <button className='w-100 text-center' type="submit">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden ">Wait...</span>
                    </div>
                    </button>
                </div>
                }
            </form>
        </div>
    </div>
    </>
  )
}

export default Phonepe
