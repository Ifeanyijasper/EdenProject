import React,{useState} from 'react';
import {  IoCash, IoPeople, IoStatsChart } from 'react-icons/io5';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import { ClientFinance, Products, Referal, Services, Profile, ClientCheckout } from '..';
import { RankRate } from '../../components';
import AddTestimonial from './AddTestimonial.section';

const ClientInfo = (props) => {
    const {user} = props;
    const [showDets, setShowDets] = useState(false);
    const [add, setAdd] = useState(false);

    return (
        <div className={`h-screen md:h-auto w-full lg:rounded-r-xl overflow-x-hidden overflowY bg-white px-2 py-5 md:px-4`}>
            <div className={'flex items-center justify-between'}>
                <h1 className={'text-xl md:text-3xl'}>{user.fullname || user.username}</h1>
                <div className={'flex justify-around'}>
                    <button className={'outline-none text-xs md:text-sm text-white bg-primary rounded md:tracking-wider cursor-pointer py-2 px-1.5 md:px-2.5 shadow-md mx-1'} onClick={() => setShowDets(!showDets)}>{showDets ? 'Hide Bonuses' : 'Show Bonuses'}</button>
                    <button className={'outline-none text-xs md:text-sm text-white bg-primary rounded md:tracking-wider cursor-pointer py-2 px-1.5 md:px-2.5 shadow-md mx-1'} onClick={() => setAdd(!add)}>Add Testimonial</button>
                </div>
            </div>
            {/* <p className={styles.lastVisit}>Last Visit: Mon, 22<sup>nd</sup> Dec, 2020</p> */}
            {/* <p className={styles.lastVisit}>Last Visit: 22/12/2020</p> */}
            { showDets &&
                <div className="flex justify-center items-center w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-7">
                    <div className={'flex flex-col justify-center items-start'}>
                        <h2 className={'text-lg'}>My Bonuses</h2>
                        <RankRate user={user} bonus={'my_bonus'} rate={user.my_bonus || 0} />
                    </div>
                    <div className={'flex flex-col justify-center items-start'}>
                        <h2 className={'text-lg'}>Referer Bonuses</h2>
                        <RankRate user={user} bonus={'refer_bonus'} rate={user.refer_bonus || 0} />
                    </div>
                </div>
            }
            <nav className={'mt-5 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md sticky -top-5 md:top-3 z-0 pl-2 w-full py-2 rounded'}>
                <ul className={'flex justify-start items-center'}>
                    <li className={'cursor-pointer mx-1'}><NavLink to="/client" exact className={'text-xs md:text-sm my-0.5 md:mr-2 p-1 px-2 flex items-center text-green-700 border-b-2 border-transparent transition duration-500 hover:border-green-400'} activeClassName={'border-green-600 hover:border-green-600'}><IoStatsChart className="mr-0.5 md:mr-1.5" /> TimeLine</NavLink></li>
                    <li className={'cursor-pointer mx-1'}><NavLink to="/client/referrals" className={'text-xs md:text-sm my-0.5 md:mr-2 p-1 px-2 flex items-center text-green-700 border-b-2 border-transparent transition duration-500 hover:border-green-400'} activeClassName={'border-green-600 hover:border-green-600'}><IoPeople className="mr-0.5 md:mr-1.5" /> Referred</NavLink></li>
                    <li className={'cursor-pointer mx-1'}><NavLink to="/client/checkout" className={'text-xs md:text-sm my-0.5 md:mr-2 p-1 px-2 flex items-center text-green-700 border-b-2 border-transparent transition duration-500 hover:border-green-400'} activeClassName={'border-green-600 hover:border-green-600'}><IoCash className="mr-0.5 md:mr-1.5" /> Checkouts</NavLink></li>
                    <li className={'cursor-pointer mx-1'}><NavLink to="/client/profile" className={'text-xs md:text-sm my-0.5 md:mr-2 p-1 px-2 flex items-center text-green-700 border-b-2 border-transparent transition duration-500 hover:border-green-400'} activeClassName={'border-green-600 hover:border-green-600'}><IoPeople className="mr-0.5 md:mr-1.5" /> Profile</NavLink></li>
                </ul>
                <hr className={'-mt-1'}/>
            </nav>
            <Route path="/client" exact component={ClientFinance} />
            <Route path="/client/referrals" component={Referal} />
            <Route path="/client/profile" component={Profile} />
            <Route path="/client/checkout" component={ClientCheckout} />
            <Route path="/client/services" component={Services} />
            <Route path="/client/products" component={Products} />
            <AddTestimonial add={add} setAdd={setAdd} />
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
    }
}

export default connect(mapStateToProps)(ClientInfo);