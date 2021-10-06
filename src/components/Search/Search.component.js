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
    
    useEffect(() => {
        setFilter(filters[0])
    }, [])

    const setFilterValue = (index) => {
        setFilter(index);
        setShowList(false)
    }

    const filterData = (event) => {
        setText(event.target.value);
    }

    return (
        <div className={styles.aidContainer}>
            <div className={styles.searchContainer}>
                <input type="text" className={styles.searchInput} placeholder={placeholder + ' By:' + filter} onChange={(event) => filterData(event)} />
                <IoSearch className={styles.searchIcon} />
            </div>
            <div className={styles.filterContainer}>
                <button className={styles.filterButton} onClick={() => setShowList(!showList)}>{filter} {showList ? <IoChevronUp /> : <IoChevronDown />}</button>
                <ul className={showList ? styles.filterChoice : styles.filterHidden}>
                    {filters.map((_filter, index) => (
                        <li className={styles.filterList} onClick={() => setFilterValue(_filter)}>{_filter}</li>
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
}

export default Search;
