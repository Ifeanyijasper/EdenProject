import React from 'react';

import styles from './TimeLine.module.css';

const TimeLine = () => {
    return (
        <div>
            <h2 className={styles.durationTitle}>Today</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <td className={styles.tableHeadData}>Client Name</td>
                        <td className={styles.tableHeadData}>Time</td>
                        <td className={styles.tableHeadData}>Worker</td>
                        <td className={styles.tableHeadData}>Total</td>
                        <td className={styles.tableHeadData}>Details</td>
                    </thead>
                    <tr className={styles.tableRow}>
                        <td className={styles.tableData}>James Brown</td>
                        <td className={styles.tableData}>01:00PM</td>
                        <td className={styles.tableData}>Shalot</td>
                        <td className={styles.tableData}>29,000</td>
                        <td className={styles.tableData}><button className={styles.tableButton} onClick={() => console.log('Happy')}>Details</button></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default TimeLine;
