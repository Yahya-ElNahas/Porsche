import './styles/product.css'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Product(props) {

    const usertype = props.usertype
    const username = props.username

    const addCart = async (name, price, lnk) => {
        let mycart

        const count = (x) => {
            let ans = 0
            for(const i in mycart) {
                if(x == mycart[i][0]) ans++
            }
            return ans
        }

        try { 
        const response = await fetch('http://localhost:3001/v1/api/Customers/:'+username, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'token': Cookies.get('token')}
            })
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            mycart = data.cart; 
        } catch (error) {
            console.log(error);
        }
        if(count(name) < props.quantity)
            mycart.push([name, price, lnk])
        else {
            window.alert('Maximum amount of product in cart')
            return
        }
        try {
            const response = await fetch('http://localhost:3001/v1/api/Customers/:'+username, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'token': Cookies.get('token')},
                body: JSON.stringify({
                    cart: mycart
                })
            })
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();

            window.alert('Product added')
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="product-component">
            <h3>{props.name}</h3>
            <img src={`${props.lnk}`} />
            <p>{props.description}</p>
            <p style={{'fontWeight': 'bold'}}>Price: {props.price}</p>
            {props.quantity && <p>Quantity: {props.quantity}</p>}
            {usertype=='Customer' && (
                <button type='button' onClick={() => addCart(props.name, props.price, props.lnk)}>Add to Cart</button>
                )
            }
        </div>
    )
}
