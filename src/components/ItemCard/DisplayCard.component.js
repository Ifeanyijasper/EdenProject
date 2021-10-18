import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import extractInitials from '../../utils/extractIni';
import styles from './ItemCard.module.css';
import {setAddToCart, setSubFromCart} from '../../redux/Actions/Purchase.actions';
import { Thousand } from '../../utils/number';


const DisplayCard = (props) => {
    const { name, price, discount, image, urlImage } = props;
    // let counter = 0;

    return (
        <div className={'cursor-pointer relative w-72 md:w-60 lg:w-80 h-auto rounded-md overflow-hidden shadow-xl bg-white'}>
            {
                image || urlImage ?
                    <img src={`${(image && image.length >= 1 )? URL.createObjectURL(image[0]) : urlImage}`} alt={name} className={'w-full h-56 md:h-52 lg:h-56 bg-center bg-cover'} /> :
                    <h3 className={'text-9xl text-green-700 text-center py-2 h-56 flex items-center justify-center'}>{extractInitials(name)}</h3>
            }
            <div className={'absolute w-full text-sm py-1 bottom-9 flex items-center justify-end text-gray-700 px-2'} style={{backgroundImage: "linear-gradient(to right, #92fe9de6, #00c9ffcc)"}}>
                {/* <h2 className={'flex justify-center items-center'}>
                    <IoHeart className={'mr-2'} /> 0
                </h2> */}
                <div className="flex items-center justify-around">
                    <h5 className={`text-xs font-bold mr-2 ${discount > 0 ? 'text-gray-50 line-through' : 'text-gray-100'}`}>{Thousand(Number(price).toFixed(0))} {+discount === 0 && 'FCFA'}</h5>
                    {discount > 0 && <h5 className="text-xs font-bold text-gray-100">{Thousand(((100 - discount) / 100) * price)} FCFA</h5>}
                </div>
            </div>
            {Number(discount) !== 0 && <div className={'absolute top-2 left-2 text-xs bg-green-500 p-1 rounded text-white'}>
                <h2>Discount: {Math.floor(Number(discount))}%</h2>
            </div>}
            <div className={styles.properties}>
                <div className="flex justify-between p-2">
                    <h2 className={'text-gray-700 text-sm font-bold'}>{name}</h2>
                    
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCard);