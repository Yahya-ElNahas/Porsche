import './styles/product.css'

export default function Customer(props) {
    return (
        <div className="product-component">
            <h3>Username: {props.customer.username}</h3>
            <p>Email: {props.customer.email}</p>
            <p>First Name: {props.customer.first_name}</p>
            <p>Last Name: {props.customer.last_name}</p>
            <p>Age: {props.customer.age}</p>
            <p>numbers: {props.customer.mobile_numbers.map(num =>(
                <span>{num}, </span>
            ))}</p>
            <p>addresses: {props.customer.addresses.map(num =>(
                <span>{num}, </span>
            ))}</p>
        </div>
    )
}