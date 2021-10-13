import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, DisplayCard, Input,  Notification, TextArea } from '../../../components';
import { BASE_URL } from '../../../utils/globalVariable';
import { editProduct } from '../../../redux/Actions/Data.actions';

const EditProduct = (props) => {
    const { edit, setEdit, detail, username, password } = props;

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

    const stop = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        setName(detail.name)
        setDiscount(detail.discount)
        setPrice(detail.price);
        setAbout(detail.description);
        setImage(detail.img);
        return () => {
            setPrice('');
            setName('');
            setDiscount('');
            setAbout('');
            setImage(null);
        }
    }, [detail]);

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if (name.length < 6) {
            setNameError(true);
            hasError = true;
        }

        if (price.length < 3) {
            hasError = true;
            setPriceError(true);
        }

        if (about.length < 10) {
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

        fetch(`${BASE_URL}/product/${detail.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: formData,
        })
            .then(res => {
                console.log(res)
                const response = res.json();
                return response;
            })
            .then(res => {
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Successful',
                    message: 'Product information updated.'
                })
                console.log(res)
                props.editProduct(res);
            })
            .then(res => {
                setTimeout(() => {
                    setEdit(false);
                }, 3000);
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Unexpected Error',
                    message: 'An error occured, check you internet connection'
                })
            })
    };

    return (
        <>
            <div onClick={() => setEdit(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-50 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${edit ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY-white -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${edit ? 'right-0 w-full md:w-9/10 lg:w-3/5 opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end md:mt-8 text-xl font-semibold text-green-700">
                        <h2>Edit Product</h2>
                        <button onClick={() => setEdit(!edit)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-2 mb-12" />
                    <div className="flex py-2 flex-col md:flex-row">
                        <div className="w-full md:w-1/2 lg:w-3/5 pr-2 lg:pr-6">
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
                                type="number"
                                value={discount}
                                setValue={(event) => setDiscount(event.target.value)}
                                error={discountError}
                                setError={() => setDiscountError}
                            />
                            <Input
                                placeholder="5000"
                                label="Price"
                                secureText={false}
                                type="number"
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
                        </div>
                        <div className="w-full md:w-1/2 lg:w-2/5 pl-2">
                            <div className="flex justify-center mt-14">
                                <DisplayCard
                                    name={name}
                                    price={price}
                                    discount={discount}
                                    image={image}
                                    urlImage={true}
                                />
                            </div>
                            <div className="flex justify-center md:justify-end mt-20">
                                {isLoading ? <Activity /> : <Button title="Edit Product" invert={false} onClick={() => authenticate()} />}
                                <div className="mx-2" />
                                <Button title="Close" invert={true} onClick={() => setEdit(!edit)} />
                            </div>
                        </div>
                    </div>
                </div>
                <Notification notify={notify} setNotify={setNotify} msg={msg} />
            </div>
        </>
    )
};

const mapStateToProps = ({auth}) => {
  return {
    username: auth.username,
    password: auth.password,
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);