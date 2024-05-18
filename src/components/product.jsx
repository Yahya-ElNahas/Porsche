import './styles/product.css'

export default function Product(props) {
    return (
        <div className="product-component">
            <h3>{props.name}</h3>
            <img src={`${props.lnk}`} alt="#" />
            <p>{props.description}</p>
            <p style={{'fontWeight': 'bold'}}>{props.price}</p>
        </div>
    )
}