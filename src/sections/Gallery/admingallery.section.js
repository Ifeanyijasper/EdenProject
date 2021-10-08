import React, { useEffect, useState } from 'react'

import { img_5, img_4, img_1, img_6, img_3, img_2 } from '../../res/images';
import { SqrButton, Card, Search, RouteIndicator } from '../../components';
import { IoGridOutline } from 'react-icons/io5';

import { setData, setGallery } from '../../redux/Actions/Data.actions';
import search from '../../utils/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BASE_URL } from '../../utils/globalVariable';

const AdminGallery = (props) => {
    const { _gallery } = props;

    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [grid, setGrid] = useState(2);
    const [text, setText] = useState('');
    const [gallery, setGallery] = useState([]);
    const [filter, setFilter] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [_filter, setFilters] = useState('');
    const [_filters] = useState([
        'Event',
    ]);

    const _providers = [
        { status: 'most rated', image: img_6, title: "Product", subtitle: "Clone", discount: 0, quantity: 35, price: 5000 },
        { status: 'new', image: img_4, title: "Product", subtitle: "Hair", discount: 10, quantity: 20, price: 3500 },
        { status: 'old', image: img_2, title: "Product", subtitle: "Massage", discount: 0, quantity: 45, price: 50000 },
        { status: 'new', image: img_6, title: "Product", subtitle: "Therapy", discount: 0, quantity: 200, price: 25000 },
        { status: 'new', image: img_5, title: "Product", subtitle: "Perfume", discount: 0, quantity: 20, price: 12000 },
        { status: 'new', image: img_6, title: "Product", subtitle: "Comfort", discount: 0, quantity: 0, price: 18000 },
        { status: 'most rated', image: img_5, title: "Product", subtitle: "Fun", discount: 0, quantity: 50, price: 4000 },
        { status: 'old', image: img_2, title: "Product", subtitle: "The Best", discount: 4, quantity: 20, price: 5500 },
        { status: 'new', image: img_4, title: "Product", subtitle: "Service", discount: 0, quantity: 20, price: 4000 },
        { status: 'old', image: img_3, title: "Product", subtitle: "Affordable", discount: 70, quantity: 20, price: 6000 },
        { status: 'old', image: img_3, title: "Product", subtitle: "Exquisite", discount: 5, quantity: 20, price: 4000 },
        { status: 'new', image: img_1, title: "Product", subtitle: "Yearn", discount: 0, quantity: 30, price: 2000 },
        { status: 'new', image: img_1, title: "Product", subtitle: "Quality", discount: 0, quantity: 2, price: 3000 },
        { status: 'new', image: img_3, title: "Product", subtitle: "In Town", discount: 0, quantity: 20, price: 7500 },
        { status: 'most rated', image: img_1, title: "Product", subtitle: "Classy", discount: 0, quantity: 0, price: 13000 },
    ];

    const [providers, setProviders] = useState(_providers);

    const filters = [
        { filter: "All", index: 0 },
        { filter: "New", index: 1 },
        { filter: "Most Rated", index: 2 },
        { filter: "Old", index: 3 },
    ];

    useEffect(() => {
        search(text, _gallery, setGallery, 'client_name');
    }, [text]);

    const SetFilter = (i) => {
        setIndex(i);
        if (filters[i].filter !== 'All') {
            setProviders(_providers.filter(p => p.status === filters[i].filter.toLowerCase()))
        }
        if (filters[i].filter === 'All') {
            setProviders(_providers);
        }
    };

    useEffect(() => {
        setGallery(_gallery)
        if (_gallery?.length === 0) {
            setIsLoading(true);
            fetchGallery();
        }
        return () => {
            fetchGallery()
        }
    }, [_gallery]);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${BASE_URL}/gallery/`);
            const gallery = await response.json();
            props.setGallery(gallery);
            setIsLoading(false);
            return gallery;
        }
        catch (err) {
            console.log(err, 'Received error');
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="relative bg-white w-full min-h-full p-4 lg:p-6">
                <RouteIndicator route="Dashboard" current="Gallery" />
                <div className="sticky -top-4 md:top-3 z-40 pt-1">
                    <Search
                        placeholder="Search"
                        isOpen={isOpenAdd}
                        setIsOpen={setIsOpenAdd}
                        newButton={true}
                        title={"Gallery"}
                        filters={_filters}
                        filter={_filter}
                        setFilter={setFilters}
                        text={text}
                        setText={setText} />
                </div>
                <div className="flex justify-between px-2 pr-5">
                    <div className="w-full md:w-3/5 flex justify-around">
                        {filters.map((filter, i) =>
                            <div
                                key={i}
                                onClick={() => SetFilter(i)}
                                className={`
                                cursor-pointer text-sm text-green-600 border-b-2 border-transparent px-3 transition duration-500 ease-in
                                ${index === i && 'text-green-700 border-green-700'}
                                `}
                            >{filter.filter}</div>
                        )}
                    </div>
                    <div className="hidden md:flex text-sm">
                        <div onClick={() => setGrid(0)} className={`cursor-pointer md:flex lg:hidden items-center mr-2 transition duration-500 ease-in ${grid === 0 && 'text-green-700'}`}>
                            <IoGridOutline className="mr-1" />
                            <h3>2</h3>
                        </div>
                        <div onClick={() => setGrid(1)} className={`cursor-pointer hidden lg:flex items-center mr-2 transition duration-500 ease-in ${grid === 1 && 'text-green-700'}`}>
                            <IoGridOutline className="mr-1" />
                            <h3>3</h3>
                        </div>
                        <div onClick={() => setGrid(2)} className={`cursor-pointer hidden lg:flex items-center transition duration-500 ease-in ${grid === 2 && 'text-green-700'}`}>
                            <IoGridOutline className="mr-1" />
                            <h3>4</h3>
                        </div>
                    </div>
                </div>
                <div className={`transition-all delay-200 duration-500 ease-in-out my-4 w-72 flex items-center justify-center mx-auto grid gap-5 ${grid === 0 ? 'md:grid-cols-2 md:gap-7 md:px-3 md:w-9/10 md:mx-auto' : grid === 1 ? 'md:grid-cols-2 md:gap-7 md:px-3 md:w-9/10 md:mx-auto lg:grid-cols-3 lg:gap-7 lg:container lg:px-16' : 'md:grid-cols-2 md:gap-7 md:px-3 md:w-9/10 md:mx-auto lg:grid-cols-4 lg:gap-7 lg:px-2 lg:w-full'}`}>
                    {providers.map((provider, index) => <Card key={index} provider={provider} grid={grid} />)}
                </div>
                <div className="text-center my-8">
                    <SqrButton title="Load More" invert={true} />
                </div>
            </div>
        </>
    )
};

const mapStateToProps = ({data}) => {
    return {
        _gallery: data.gallery,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setData, setGallery}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminGallery);
