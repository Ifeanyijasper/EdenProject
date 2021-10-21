import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Activity, Button, Input,  Notification, GalleryCard } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { addGallery } from '../../redux/Actions/Data.actions';

const AddGallery = (props) => {
    const { add, setAdd, username, password } = props;

    const [name, setName] = useState('');
    const [event, setEvent] = useState('');
    const [image, setImage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [eventError, setEventError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

    const stop = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        return () => {
            setImage('');
            setName('');
            setEvent('');
        }
    }, []);

    const authenticate = () => {
        let hasError;
        setIsLoading(true);

        if (name.length < 6) {
            setNameError(true);
            hasError = true;
        }

        if (image && image[0].length < 6) {
            setImageError(true);
            hasError = true;
        }

        if (event.length < 9) {
            hasError = true;
            setEventError(true);
        }

        if (hasError) {
            setIsLoading(false);
            return false;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('event', event);
        if (image) {
            formData.append('img', image[0]);
        }

        fetch(`${BASE_URL}/Gallery/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            },
            body: formData,
        })
            .then(res => {
                const response = res.json();
                return response;
            })
            .then(res => {
                setNotify(true);
                setIsLoading(false);
                setMsg({
                    title: 'Successful',
                    message: 'We have a new memory'
                });
                props.addGallery(res);
                // console.log(res)
            })
            .then(res => {
                setTimeout(() => {
                    setAdd(false);
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
    }

    return (
        <>
            <div onClick={() => setAdd(false)} className={`h-full bg-gray-50 bg-opacity-10 fixed z-50 top-0 backdrop-filter backdrop-blur-sm transition-all duration-500 ease-in-out ${add ? 'right-0 w-full opacity-100' : '-right-16 opacity-0 w-0'} `}>
                <div onClick={(e) => stop(e)} className={`fixed shadow-xl h-screen overflow-y-auto overflowY -top-0 z-30 bg-white text-gray-700 p-8 transition-all delay-100 ease-in-out ${add ? 'right-0 w-full md:w-96 lg:w-120 opacity-100' : '-right-16 opacity-0 w-0'}`}>
                    <div className="flex justify-between items-end md:mt-6 text-xl font-semibold text-green-700">
                        <h2>Add Gallery</h2>
                        <button onClick={() => setAdd(!add)} className="flex items-center rounded-full outline-none text-base py-1 px-2 text-gray-900 bg-white shadow-md mx-1.5 transition duration-500 ease-in-out hover:shadow-xl"><IoClose /></button>
                    </div>
                    <hr className="my-2 mb-12" />
                    <div className="flex py-2 flex-col md:flex-row">
                        <div className="w-full pr-2 lg:pr-6">
                            <Input
                                placeholder="Event"
                                label="Event"
                                secureText={false}
                                type="text"
                                value={event}
                                setValue={(event) => setEvent(event.target.value)}
                                error={eventError}
                                setError={() => setEventError} />
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
                                placeholder=""
                                type="file"
                                label="Image"
                                name="image"
                                // value={image}
                                setValue={(event) => setImage(event.target.files)}
                                error={imageError}
                                setError={() => setImageError}
                            />
                            <div className="flex justify-center">
                                <GalleryCard
                                    image={image}
                                    event={event}
                                    name={name}
                                />
                            </div>

                            <div className="flex justify-center md:justify-end mt-14">
                                {isLoading ? <Activity /> : <Button title="Add Gallery" invert={false} onClick={() => authenticate()} />}
                                <div className="mx-2" />
                                <Button title="Close" invert={true} onClick={() => setAdd(!add)} />
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
    return bindActionCreators({ addGallery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGallery);