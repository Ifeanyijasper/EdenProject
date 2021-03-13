import React, { useEffect, useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Activity, Button, Input, RouteIndicator } from '../../components';
import { EditPassword } from '..';
import styles from './Profile.module.css';
import { BASE_URL } from '../../utils/globalVariable';
import { setUserName } from '../../redux/Actions/Auth.actions';
import extractInitials from '../../utils/extractIni';

const Profile = (props) => {
    const {user, password} = props;
    
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [served, setServed] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [referBonus, setReferBonus] = useState(0);
    const [locationError, setLocationError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const authenticate = () => {
        let hasError = false;
        setIsLoading(true);

        if(userName.length < 5) {
            setUserNameError(true);
            hasError = true;
        }

        if(phone.length < 9) {
            setPhoneError(true);
            hasError = true;
        }

        if(hasError) {
            setIsLoading(false);
            return false;
        }

        const body = {
            fullname: name,
            username: userName,
            email: email,
            location: location,
            phone: phone,
        }

        fetch(`${BASE_URL}/register/${user.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            },
          body: JSON.stringify(body),
        })
        .then(res => {
            const response = res.json();
            return response;
        })
        .then(res => {
            props.setUserName(userName);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetch(`${BASE_URL}/register/${user.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            }
        })
        .then(res => {
            const response = res.json();
            return response;
        })
        .then(res => {
            setName(res.fullname);
            setUserName(res.username);
            setPhone(res.phone);
            setEmail(res.email);
            setLocation(res.location);
            setServed(res.served);
            setReferBonus(res.refer_bonus)
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div>
            {(user.is_worker || user.is_superuser) && <RouteIndicator route="Dashboard" current="Profile" /> }
            <div className={styles.profileContainer}>
                <div className={styles.profileUser}>
                    <div className={styles.profileImgContainer}>
                        {/* <img src={img_2} alt="Name" className={styles.profileImg} /> */}
                        <h2 className={styles.profileIni}>{name ? extractInitials(name) : extractInitials(userName)}</h2>
                        <button className={styles.profileEdit}><IoPencil className={styles.profileEditIcon} /></button>
                    </div>
                    <div className={styles.profileCredentials}>
                        <h2 className={styles.profileName}>{name  || "'Empty'"} | {userName}</h2>
                        <h4 className={styles.profileLocation}>{location || "'Null'"}</h4>
                        <h4 className={styles.profileLocation}>Served: {served || '0'} {(user.is_worker || user.is_superuser) ? 'Clients' : 'Times'}</h4>
                        {(user.is_worker || user.is_superuser) && <h4 className={styles.profileLocation}>Refer Bonuses: {referBonus || '0'} XAF</h4>}
                    </div>
                </div>
                <div className={styles.border}>
                    <div className={styles.profileForm}>
                        <div className={styles.profileFormSection}>
                            <Input 
                                placeholder={name || "'empty'"}
                                label="Name"
                                secureText={false}
                                type="text"
                                value={name}
                                setValue={(event) => setName(event.target.value)}
                                error={nameError}
                                setError={() => setNameError} />
                            <Input 
                                placeholder={userName} 
                                label="Username"
                                secureText={false}
                                type="text"
                                value={userName}
                                setValue={(event) => setUserName(event.target.value)}
                                error={userNameError}
                                setError={() => setUserNameError} />
                            <Input 
                                placeholder={phone}
                                label="Telephone Number"
                                secureText={false}
                                type="text"
                                value={phone}
                                setValue={(event) => setPhone(event.target.value)}
                                error={phoneError}
                                setError={() => setPhoneError} />
                        </div>
                        <div className={styles.profileFormSection}>
                            <Input 
                                placeholder={email}
                                label="Email"
                                secureText={false}
                                type="text"
                                value={email}
                                setValue={(event) => setEmail(event.target.value)}
                                error={emailError}
                                setError={() => setEmailError} />
                            <Input 
                                placeholder={location || "'N/a'"} 
                                label="Location"
                                secureText={false}
                                type="text"
                                value={location}
                                setValue={(event) => setLocation(event.target.value)}
                                error={locationError}
                                setError={() => setLocationError} />
                            {/* <Input 
                                placeholder={phone}
                                label="Name"
                                secureText={false}
                                type="text"
                                value={phone}
                                setValue={(event) => setPhone(event.target.value)}
                                error={phoneError}
                                setError={() => setPhoneError} /> */}
                        </div>
                        <div className={styles.profileActions}>
                            {isLoading ? 
                            (<div className={styles.isLoading}>
                                <Activity size={1.2} />
                            </div>) : 
                            (<>
                                <Button title="Save Changes" onClick={() => authenticate()} />
                                <Button title="Edit Password" onClick={() => setIsOpen(true)} />
                            </>)
                        }
                        </div>
                    </div>
                </div>
            </div>
            <EditPassword isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
        password: auth.password,
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setUserName}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);