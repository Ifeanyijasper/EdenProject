import React, { useRef} from 'react';
import { IoAdd, IoHeart, IoRemove } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import extractInitials from '../../utils/extractIni';
import styles from './ItemCard.module.css';
import {setAddToCart, setSubFromCart} from '../../redux/Actions/Purchase.actions';
import { Thousand } from '../../utils/number';


const ItemCard = (props) => {
    const { item, onClick, add, product, total, points } = props;
    const counter = useRef(0);
    // let counter = 0;

    const increment = (event, item) => {
        event.stopPropagation();
        counter.current++;
        let price = 0;
        if (Math.floor(Number(item.discount)) === 0) {
            price = Math.floor(Number(item.price));
        } else {
            price = ((100 - Number(item.discount)) / 100) * Number(item.price)
        }
        props.setAddToCart(item.id, item.name, price, counter.current);
    }

    const decrement = (event, item) => {
        event.stopPropagation();
        counter.current--;
        let price = 0;
        if (Math.floor(Number(item.discount)) === 0) {
            price = Math.floor(Number(item.price));
        } else {
            price = ((100 - Number(item.discount)) / 100) * Number(item.price)
        }
        props.setSubFromCart(item.id, item.name, price, counter.current);
    }

    return (
        <div className={'cursor-pointer relative md:w-52 lg:w-80 h-auto rounded-md overflow-hidden shadow-xl bg-white'} onClick={() => onClick()}>
            {
                item.img ?
                    <img src={`${item.img}`} alt={item.name} className={'w-full h-36 lg:h-56 bg-center bg-cover'} /> :
                    <h3 className={'text-9xl text-green-700 text-center py-2 h-56 flex items-center justify-center'}>{extractInitials(item.name)}</h3>
            }
            <div className={`absolute w-full text-sm py-1 flex items-center justify-end text-gray-700 px-2 ${add ? 'bottom-20' : 'bottom-9'}`} style={{ backgroundImage: "linear-gradient(to right, #92fe9de6, #00c9ffcc)" }}>
                {/* <h2 className={'flex justify-center items-center'}>
                    <IoHeart className={'mr-2'} /> 0
                </h2> */}
                <div className="flex items-center justify-around">
                    <h5 className={`text-xs font-bold mr-2 ${item.discount > 0 ? 'text-gray-50 line-through' : 'text-gray-100'}`}>{Thousand(Number(item.price).toFixed(0))} {+item.discount === 0 && 'FCFA'}</h5>
                    {item.discount > 0 && <h5 className="text-xs font-bold text-gray-100">{Thousand(((100 - item.discount) / 100) * item.price)} FCFA</h5>}
                </div>
            </div>
            {Number(item.discount) !== 0 && <div className={'absolute top-2 left-2 text-xs bg-green-500 p-1 text-white rounded'}>
                <h2>Discount: {Math.floor(Number(item.discount))}%</h2>
            </div>}
            <div className={`flex flex-col ${add && 'pb-2' }`}>
                <div className="flex justify-between p-2">
                    <h2 className={'text-gray-700 text-sm font-bold'}>{item.name}</h2>
                </div>
                {add && (
                    <div className="relative">
                        <div className={`flex items-center font-sm transition-all delay-100 duration-500 ease-in-out ${counter.current > 0 ? 'justify-around' : 'justify-center'}`}>
                            <button className={`outline-none cursor-pointer shadow-md flex items-center justify-center border-2 border-gray-700 text-sm lg:text-base w-6 h-6 lg:w-8 lg:h-8 rounded-full transition-all duration-500 ease-in-out ${counter.current > 0 ? 'm-0 opacity-100' : 'ml-20 opacity-0'}`} onClick={(event) => decrement(event, item)}><IoRemove /></button>
                            <p>{counter.current}</p>
                            <button className={`outline-none cursor-pointer shadow-md flex items-center justify-center border-2 border-gray-700 text-sm lg:text-base w-6 h-6 lg:w-8 lg:h-8 rounded-full transition-all duration-500 ease-in-out ${counter.current > 0 ? 'm-0 opacity-100' : 'mr-20 opacity-0'}`} onClick={(event) => increment(event, item)}><IoAdd /></button>
                        </div>
                        <button className={`absolute top-0 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 mx-auto text-center outline-none overflow-hidden whitespace-nowrap text-xs lg:text-sm text-white bg-primary shadow-md p-1.5 md:px-4 rounded-3xl text-white transition-all delay-100 duration-500 ease-in-out hover:shadow-2xl ${counter.current === 0 ? 'w-36 md:w-40 lg:w-44 opacity-100' : 'w-0 opacity-0'}`} onClick={(event) => increment(event, item)}>Add to purchase</button>
                    </div>
                )}
            </div>
        </div>
    )
};

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