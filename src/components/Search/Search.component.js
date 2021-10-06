import React, { useEffect, useState } from 'react';
import { IoAdd, IoChevronDown, IoChevronUp, IoSearch } from 'react-icons/io5';
import { Activity } from '..';

import styles from './Search.module.css';

const Search = (props) => {
    const {
        placeholder,
        setIsOpen,
        newButton,
        title,
        filters,
        filter,
        setFilter,
        setText
    } = props;
    const [showList, setShowList] = useState(false);
    const [search, setSearch] = useState(false);
    
    useEffect(() => {
        setFilter(filters[0])
    }, [])

    const setFilterValue = (index) => {
        setFilter(index);
        setShowList(false)
        setSearch(true);
    }

    const filterData = (event) => {
        setText(event.target.value);
    }

    return (
        <div className={`flex justify-between -mx-1 md:mx-4 items-center mb-3`}>
            <div className="ml-auto flex items-center bg-gray-300 shadow-lg rounded-3xl p-2 mr-3 md:mr-4">
                <input autoFocus type="text" placeholder={placeholder + ' By:' + filter} onChange={(event) => filterData(event)} className={`outline-none text-xs md:text-sm text-gray-800 bg-transparent transition-all duration-500 ease-in-out transform ${search ? 'w-28 md:w-32 lg:w-40 pl-3 translate-x-0 opacity-100 focus' : 'w-0 translate-x-6 opacity-0'}`} />
                <IoSearch className="text-gray-900 cursor-pointer mx-2 z-10" onClick={() => setSearch(!search)} />
            </div>
            <div className={`relative`}>
                <button className={'outline-none flex items-center bg-primary rounded-3xl text-white p-2 px-5 text-xs md:text-sm font-semibold transition duration-500 ease-in-out hover:shadow-xl'} onClick={() => setShowList(!showList)}>{filter} {showList ? <IoChevronUp className="ml-2" /> : <IoChevronDown className="ml-2" />}</button>
                <ul className={`absolute z-10 top-11 right-0 bg-white w-36 rounded py-1 shadow-lg ${showList ? 'transition duration-500 ease-in opacity-100 visible' : 'transition-all duration-500 opacity-0 invisible'}`}>
                    {filters.map((_filter, index) => (
                        <li className={`cursor-pointer block text-sm text-gray-800 p-4 py-1 transition duration-500 ease-in-out hover:bg-green-200`} onClick={() => setFilterValue(_filter)}>{_filter}</li>
                    ))}
                </ul>
            </div>
            {newButton && (
                <div className={styles.buttonContainer}>
                    <button className={styles.buttonButton} onClick={() => setIsOpen(true)}><IoAdd /> New {title}</button>
                </div>
            )}
        </div>
    )
};

export default Search;
