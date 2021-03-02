import React, { useEffect, useState } from 'react';
import { IoBriefcase, IoBody } from 'react-icons/io5';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import { Product, Service } from '..';
import { Button } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './NewPurchase.module.css';
import {setClearPurchase} from '../../redux/Actions/Purchase.actions';
import {setPoint} from '../../redux/Actions/Points.actions';
import extractInitials from '../../utils/extractIni';

const NewPurchase = (props) => {
    const {isOpen, setIsOpen, username, password, product, total} = props;
    const [options, setOptions] = useState([]);
    const [client, setClient] = useState('');
    const [list, setList] = useState([]);
    const [purchase, setPurchase] = useState('Products');

    useEffect(() => {
      let _referals = [];
       fetch(`${BASE_URL}/register/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
        })
            .then(response => {
                const res = response.json();
                return res;
            })
            .then(res => {
              if(res.length > 1) {
                let _res = res.filter((data) => data.is_client);
                setList(_res);
                if(_res.length > 0) {
                  _res.map((re, index) => (
                      _referals.push({value: re.id, label: re.username})
                  ));
                }
                setOptions([..._referals]);
              }
            })
            .catch(err => {
              console.log(err);
            })

    }, [isOpen]);

    const exit = () => {
      setIsOpen(false);
      props.setClearPurchase();
    }

    const purchased = () => {
      let friend;
      const body = {
        client: client.label,
        client_id: client.value,
        worker: username,
        product: product,
        total: total,
        point: total/1000,
      }

      friend = list.filter(data => data.id === client.value);

      fetch(`${BASE_URL}/purchase/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
        },
        body: JSON.stringify(body),
      })
      .then(res => {
        const response = res.json();
        return response;
      })
      .then(res => {
        console.log('deleted');
        props.setClearPurchase();
        props.setPoint(client.value, total/2000, friend[0].friend);
        setIsOpen(false);
      })
      .catch(err => {
        console.log(err);
      })
    }

    return (
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <div className={styles.purchaseContainer}>
              <h2 className={styles.purchaseTitle}>New Purchase</h2>
              <Button title='Exit' onClick={() => exit()} />
            </div>
            <div className={styles.purchaseServer}>
              <Select 
                options={options} 
                styles={customStyles} 
                className={styles.selector}
                onChange={(value) => setClient(value)}
              />
            </div>
            <nav className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.navItem} onClick={() => setPurchase('Products')}><i className={[styles.navLink, purchase === 'Products' && styles.navActive].join(' ')}><IoBriefcase/> Products</i></li>
                    <li className={styles.navItem} onClick={() => setPurchase('Services')}><i className={[styles.navLink, purchase === 'Services' && styles.navActive].join(' ')}><IoBody /> Services</i></li>
                </ul>
                <hr className={styles.navLine}/>
            </nav>
            {purchase === "Products" ? (
              <Product />
            ) : (
              <div>
                <Service />
              </div>
            )}
            <div className={styles.purchaseButton}>
              <Button title="Purchase" onClick={() => purchased()} />
            </div>
        </Modal>
    )
}

const mapStateToProps = ({auth, purchase}) => {
    return {
        username: auth.username,
        password: auth.password,
        product: purchase.product,
        total: purchase.total,
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setClearPurchase, setPoint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPurchase);

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#010f24" : null,
      color: isFocused ? "white" : '#999',
    };
  },
  control: (base, {isFocused}) => ({
    ...base,
    backgroundColor: 'transparent',
    // This line disable the blue border
    boxShadow: 'none',
    borderRadius: 0,
    border: '1.4px solid #010f24',
    borderRadius: '4px',
    '&:hover': {
       border: isFocused ? 0 : 0,
       border: '1.4px solid #010f24',
    }
  })
};
