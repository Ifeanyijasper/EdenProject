import React, { useEffect, useState } from 'react'
import { IoGridOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SqrButton, Card, Search } from '../../components';
import { setData, setGallery } from '../../redux/Actions/Data.actions';
import search from '../../utils/search';
import { BASE_URL } from '../../utils/globalVariable';

const Gallery = (props) => {
    const { _gallery } = props;

    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [grid, setGrid] = useState(2);
    const [text, setText] = useState('');
    const [gallery, setGallery] = useState([]);
    const [_filter, setFilter] = useState('');
    const [_filters] = useState([
        'Event',
        'Name'
    ]);

    const filters = [
        { filter: "All", index: 0 },
        { filter: "New", index: 1 },
        { filter: "Most Rated", index: 2 },
        { filter: "Old", index: 3 },
    ];

    useEffect(() => {
        search(text, _gallery, setGallery, 'Event');
    }, [text]);

    const SetFilter = (i) => {
        setIndex(i);
        if (filters[i].filter !== 'All') {
            setGallery(_gallery.filter(p => p.status === filters[i].filter.toLowerCase()))
        }
        if (filters[i].filter === 'All') {
            setGallery(_gallery);
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
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${BASE_URL}/Gallery/`);
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
                <h1 className={`text-gray-800 text-left text-xl lg:text-2xl sticky top-3 z-30 pl-2 w-full py-1.5 rounded bg-white bg-opacity-30 backdrop-filter backdrop-blur-md`}>Gallery</h1>
                <div className="sticky top-3 z-40 pt-1">
                    <Search placeholder="Search" newButton={false} title={'Service'} filters={_filters} filter={_filter} setFilter={setFilter} text={text} setText={setText} />
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
                <div className={`transition-all delay-200 duration-500 ease-in-out my-4 w-72 flex items-center justify-center mx-auto grid gap-5 ${grid === 0 ? 'md:grid-cols-2 md:gap-7 md:px-3 md:w-9/10 md:mx-auto' : grid === 1 ? 'md:grid-cols-2 md:gap-7 md:px-3 md:w-9/10 md:mx-auto lg:grid-cols-3 lg:gap-7 lg:container lg:px-16' : 'md:grid-cols-2 md:gap-7 md:px-3 md:w-9/10 md:mx-auto lg:grid-cols-4 lg:gap-7 lg:px-2 lg:w-full' }`}>
                    {gallery.map((gal, index) => <Card key={index} gallery={gal} grid={grid} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
