import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  Activity, 
  Button, 
  Input, 
  Notify, 
  SummitTech, 
  TextArea 
} from '../../components';
import {setRefresh} from '../../redux/Actions/Refresh.actions';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './EditProduct.module.css';

const EditProduct = (props) => {
    const {
      detail, 
      isOpen, 
      setIsOpen, 
      setIsDetail,
    } = props;

    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');
    const [about, setAbout] = useState('');
    const [priceError, setPriceError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [discountError, setDiscountError] = useState(false);
    const [aboutError, setAboutError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);

    useEffect(() => {
      setName(detail.name)
      setDiscount(detail.discount)
      setPrice(detail.price);
      setAbout(detail.description);
    }, [detail]);

    useEffect(() => {
      props.setRefresh(false);
    }, [isOpen]);

    const authenticate = () => {
      let hasError;
        setIsLoading(true);

        if(name.length < 6) {
            setNameError(true);
            hasError = true;
        }

        if (price.length < 3) {
          hasError = true;
          setPriceError(true);
        }

        if(discount.length < 1) {
          hasError = true;
          setDiscountError(true);
        }

        if (about.length < 10) {
          hasError = true;
          setAboutError(true);
        }

        if (hasError) {
            setIsLoading(false);
            return false;
        }

        const body = {
          name,
          price,
          discount,
        }

        fetch(`${BASE_URL}/product/${detail.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        .then(res => {
          setIsLoading(false);
          setIsOpen(false);
          props.setRefresh(true);
          setIsDetail(false);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          setNotify(true);
        })
    }


    return (
        <Modal isOpen={isOpen} className={styles.modalContainer} overlayClassName={styles.overLay} closeTimeoutMS={400}>
            <SummitTech title="Edit Product" />
            <div className={styles.formContainer}>
                <Input 
                placeholder="Name" 
                label="Name"
                secureText={false}
                type="text"
                value={name}
                setValue={(event) => setName(event.target.value)}
                error={nameError}
                setError={() => setNameError} />
                <Input 
                placeholder="10" 
                label="Discount"
                secureText={false}
                type="text"
                value={discount}
                setValue={(event) => setDiscount(event.target.value)}
                error={discountError}
                setError={() => setDiscountError} />
                <Input 
                placeholder="5000" 
                label="Price"
                secureText={false}
                type="text"
                value={price}
                setValue={(event) => setPrice(event.target.value)}
                error={priceError}
                setError={() => setPriceError} />
                <TextArea
                placeholder="Write about the product you are adding" 
                label="About"
                value={about}
                setValue={(event) => setAbout(event.target.value)}
                error={aboutError}
                setError={() => setAboutError} />
                <div className={styles.actionButtons}>
                    {isLoading ? (<Activity />) :(
                    <>
                      <Button title="Edit" onClick={() => authenticate()} />
                      <Button title="Cancel" onClick={()=> setIsOpen(!isOpen)} />
                    </>)}
                </div>
            </div>
            <Notify notify={notify} setNotify={setNotify} />
            <SummitTech title="Summit Tech" />
        </Modal>
    )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setRefresh}, dispatch);
}

export default connect(null, mapDispatchToProps)(EditProduct);

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
    border: 'none',
    // This line disable the blue border
    boxShadow: 'none',
    borderRadius: 0,
    borderBottom: '1.4px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#010f24',
    '&:hover': {
       border: isFocused ? 0 : 0,
       borderBottom: '1.4px',
       borderBottomStyle: 'solid',
       borderBottomColor: '#010f24',
    }
  })
};