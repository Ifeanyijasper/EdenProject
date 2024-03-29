import React, { useEffect, useState } from 'react'

import { Activity2, ClientCard } from '../../components';
import { BASE_URL } from '../../utils/globalVariable';
import { connect } from 'react-redux';

const Referal = (props) => {
    const {user, password} = props;
    const [loading, setLoading] = useState(false);
    const [refered, setRefered] = useState([]);
    const [notify, setNotify] = useState(false);
    const [msg, setMsg] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/register/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(user.username + ':' + password).toString('base64'),
            },
        })
            .then(response => {
                const res = response.json();
                return res;
            })
            .then(res => {
                let _refered = res.filter(data => data.friend === user.id);
                setRefered(_refered);
                props.setData(_refered);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setNotify(true);
                setMsg({
                    title: 'Authentication',
                    message: 'Invalid username or password.'
                })
            })
    }, []);

    return (
        <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-7 px-0 md:px-2 lg:px-8 mt-4 md:mt-6'}>
            {loading ? <div className="flex justify-center col-span-2 md:col-span-3 lg:col-span-4"><Activity2 /></div> : refered.map((worker, index) => <ClientCard client={worker} />)}
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
        password: auth.password,
    }
}


export default connect(mapStateToProps)(Referal);
