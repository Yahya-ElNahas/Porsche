import './styles/product.css'

export default function Product(props) {
    return (
        <div className="product-component">
            <h3>{props.name}</h3>
            <img src="" alt="" />
            <p>{props.price}</p>
        </div>
    )
}