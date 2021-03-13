import React, { useEffect, useState } from 'react';
import { IoBriefcase, IoBody } from 'react-icons/io5';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import { Product, Service } from '..';
import { Activity, Button, Notification, Notify } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './NewPurchase.module.css';
import {setClearPurchase} from '../../redux/Actions/Purchase.actions';
import {setPoint} from '../../redux/Actions/Points.actions';
import extractInitials from '../../utils/extractIni';

const NewPurchase = (props) => {
    const {
      isOpen,
      setIsOpen, 
      username, 
      password, 
      product, 
      total,
      user,
    } = props;
    const [options, setOptions] = useState([]);
    const [client, setClient] = useState('');
    const [list, setList] = useState([]);
    const [purchase, setPurchase] = useState('Products');
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchMyBonus = async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/register/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                    },
                });
            const registered = await response.json();
            const myBonus = registered.my_bonus;
            const served = registered.served;
            const refer_bonus = registered.refer_bonus;
            return [myBonus, served, refer_bonus];
            }
            catch(err) {
                console.log(err, 'Received error');
            }
            
        }

    const updateMyBonus = (id, myBonus) => {
      const body = {
        my_bonus: myBonus,
      }
      fetch(`${BASE_URL}/register/${id}/`, {
        method: 'PATCH',
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }

    const updateReferBonus = (id, Bonus) => {
      const body = {
        refer_bonus: Bonus,
      }
      fetch(`${BASE_URL}/register/${id}/`, {
        method: 'PATCH',
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }

    const updateServed = (id, served) => {
       const body = {
         served
       }
      fetch(`${BASE_URL}/register/${id}/`, {
        method: 'PATCH',
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }

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
      setIsLoading(true);
      let friend;
      const body = {
        client: client.label,
        client_id: client.value,
        worker_id: user.id,
        worker: username,
        item: product,
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
        setIsLoading(false);
        props.setClearPurchase();
        props.setPoint(client.value, total/2000, friend[0].friend);
        setNotify(true);
        setMsg({
            title: 'Successful Purchase',
            message: 'Purchase completed, you served one more person.'
          })
        if(friend[0].served === null && friend[0].friend !== null) {
          let friendId = friend[0].friend;
          let data = fetchMyBonus(friendId);
          data
            .then(res => {
              let myBonus = Number(res[0]) + (total * 0.15);
              updateReferBonus(friendId, myBonus);
            })
            .then(res => {
              let data = fetchMyBonus(client.value);
                data
                  .then(res => {
                    let served = Number(res[1]) + 1;
                    updateServed(client.value, served);
                  })
                  .then(res => {
                    let data = fetchMyBonus(user.id);
                    data
                      .then(res => {
                        let served = Number(res[1]) + 1;
                        updateServed(user.id, served);
                      })
                  })
            })
        } else {
          let friendId = friend[0].friend;
          let data = fetchMyBonus(friendId);
          data
            .then(res => {
              let myBonus = Number(res[2]) + (total * 0.025);
              updateReferBonus(friendId, myBonus);
            })
            .then(res => {
              let data = fetchMyBonus(client.value);
                data
                  .then(res => {
                    let myBonus = Number(res[0]) + (total * 0.05);
                    let served = Number(res[1]) + 1;
                    updateMyBonus(client.value, myBonus);
                    updateServed(client.value, served);
                  })
                  .then(res => {
                    let data = fetchMyBonus(user.id);
                    data
                      .then(res => {
                        let served = Number(res[1]) + 1;
                        updateServed(user.id, served);
                      })
                  })
            })
        }
        return res;
      })
      .then(res => {
        setTimeout(() => {  
          setIsOpen(false);
        }, 3000);
      })
      .catch(err => {
        setIsLoading(false);
        setNotify(true);
        setMsg({
            title: 'Unexpected Error',
            message: 'An error occured, check you internet connection'
          })
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
              {isLoading ? <Activity /> : <Button title="Purchase" onClick={() => purchased()} />}
            </div>
            <Notification notify={notify} setNotify={setNotify} msg={msg} />    
        </Modal>
    )
}

const mapStateToProps = ({auth, purchase}) => {
    return {
        username: auth.username,
        password: auth.password,
        product: purchase.product,
        total: purchase.total,
        user: auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setClearPurchase, setPoint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPurchase);

const customStyles = {
  option: (styles, { isFocused }) => {
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
