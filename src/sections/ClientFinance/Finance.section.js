import React, { useState } from "react";

import FinanceList from './FinanceList/Finance.list';

const Finance = () => {
    const [isDetail, setIsDetail] = useState(false);
    const [detail, setDetail] = useState({});
    return (
        <section className={'flex py-4'}>
            <FinanceList isDetail={isDetail} setIsDetail={setIsDetail} detail={detail} setDetail={setDetail}/>
        </section>
    )
}

export default Finance;
