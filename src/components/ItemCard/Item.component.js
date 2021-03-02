import React, { useRef} from 'react';
import { IoAdd, IoHeart, IoRemove } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import extractInitials from '../../utils/extractIni';
import styles from './ItemCard.module.css';
import {setAddToCart, setSubFromCart} from '../../redux/Actions/Purchase.actions';


const ItemCard = (props) => {
    const {item, onClick, add, product, total, points} = props;
    const counter = useRef(0);
    // let counter = 0;

    const increment = (event, item) => {
        event.stopPropagation();
        counter.current++;
        let price = 0;
        if (Math.floor(Number(item.discount)) === 0) {
            price = Math.floor(Number(item.price));
        } else {
            price = ((100 - Number(item.discount))/100) * Number(item.price)
        }
        console.log(product, total, points, 'product');
        props.setAddToCart(item.id, item.name, price, counter.current);
    }

    const decrement = (event, item) => {
        event.stopPropagation();
        counter.current--;
        let price = 0;
        if (Math.floor(Number(item.discount)) === 0) {
            price = Math.floor(Number(item.price));
        } else {
            price = ((100 - Number(item.discount))/100) * Number(item.price)
        }
        props.setAddToCart(item.id, item.name, price, counter.current);
    }

    return (
        <div className={styles.itemCard} onClick={() => onClick()}>
            <div className={styles.imageContainter}>
                {
                    item.img ? 
                    <img src={item.img} alt={item.name} className={styles.image} /> :
                    <h3 className={styles.name}>{extractInitials(item.name)}</h3>
                }
                <div className={styles.itemInfo}>
                    <h2 className={styles.likes}>
                        <IoHeart className={styles.iconLike} /> 0
                    </h2>
                    <h2 className={styles.discount}>{Math.floor(Number(item.price))} XAF</h2>
                </div>
                <div className={styles.itemDiscount}>
                    {Number(item.discount) !== 0 && <h2 className={styles.discount}>Discount: {Math.floor(Number(item.discount))}%</h2>}
                </div>
            </div>
            <div className={styles.properties}>
                    <h2 className={styles.itemName}>{item.name}</h2>
                    {add && (
                        <>
                            {counter.current > 0 && (
                            <div className={styles.cartButtons}>
                                <button className={styles.manipulateButtons}  onClick={(event) =>  decrement(event, item)}><IoRemove /></button>
                                <p>{counter.current}</p>
                                <button className={styles.manipulateButtons}  onClick={(event) =>  increment(event, item)}><IoAdd /></button>
                            </div>)}
                            {counter.current === 0 &&(
                                <button className={styles.addToCartButton} onClick={(event) =>  increment(event, item)}>Add to purchase</button>
                            )}
                        </>
                    )}
            </div>
        </div>
    )
}

const mapStateToProps = ({purchase}) => {
    return {
        product: purchase.product,
        total: purchase.total,
        points: purchase.points,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAddToCart, setSubFromCart}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
