import React, { useState } from 'react';
import Modal from 'react-modal';

import { Activity, Button, Input, Notification, SummitTech, TextArea } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import styles from './AddProduct.module.css';

const AddProduct = (props) => {
    const {isOpen, setIsOpen} = props;
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null)
    const [priceError, setPriceError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [discountError, setDiscountError] = useState(false);
    const [aboutError, setAboutError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

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

        if(about.length < 10) {
          hasError = true;
          setAboutError(true);
        }

        if (hasError) {
            setIsLoading(false);
            return false;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('discount', discount || 0);
        formData.append('description', about);
        if (image) {
          formData.append('img', image[0]);
        }

        fetch(`${BASE_URL}/product/`, {
          method: 'POST',
          body: formData,
        })
        .then(res => {
          const response = res.json();
          return response;
        })
        .then(res => {
          console.log(res, 'res');
          setIsLoading(false);
          setNotify(true);
          setMsg({
            title: 'Successful',
            message: 'Product has been added to store.'
          })
          // if (res.name === name) {
          //   setNotify(true);
          //   setMsg({
          //     title: 'Successful',
          //     message: 'Product has been added to store.'
          //   })
          // } else {
          //   setNotify(true);
          //   setMsg({
          //     title: 'UnSuccessful',
          //     message: 'Product was not added to store. Try again later.'
          //   })
          // }
        })
        .then(res => {
          setTimeout(() => {   
            setIsOpen(false);
          }, 3000);
          setPrice('');
          setName('');
          setDiscount('');
          setAbout('');
          setImage(null);
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
            <SummitTech title="Add New Product" />
            <div className={styles.formContainer}>
                <Input 
                  placeholder="Name" 
                  label="Name"
                  secureText={false}
                  type="text"
                  value={name}
                  setValue={(event) => setName(event.target.value)}
                  error={nameError}
                  setError={() => setNameError} 
                />
                <Input 
                  placeholder="10" 
                  label="Discount"
                  secureText={false}
                  type="text"
                  value={discount}
                  setValue={(event) => setDiscount(event.target.value)}
                  error={discountError}
                  setError={() => setDiscountError} 
                />
                <Input 
                  placeholder="5000" 
                  label="Price"
                  secureText={false}
                  type="text"
                  value={price}
                  setValue={(event) => setPrice(event.target.value)}
                  error={priceError}
                  setError={() => setPriceError} 
                />
                <Input 
                  placeholder="5"
                  type="file"
                  label="Image"
                  name="image"
                  // value={image}
                  setValue={(event) => setImage(event.target.files)}
                  error={imageError}
                  setError={() => setImageError} 
                />
                <TextArea
                  placeholder="Write about the product you are adding" 
                  label="About"
                  value={about}
                  setValue={(event) => setAbout(event.target.value)}
                  error={aboutError}
                  setError={() => setAboutError} 
                />
                <div className={styles.actionButtons}>
                    {isLoading ? (<Activity />) : ( <>
                    <Button title="Add Product" onClick={() => authenticate()} />
                    <Button title="Cancel" onClick={()=> setIsOpen(!isOpen)} />
                  </>)}
                </div>
            </div>
            <SummitTech title="Eden Beauty" />
            <Notification notify={notify} setNotify={setNotify} msg={msg} />
        </Modal>
    )
}

export default AddProduct;

