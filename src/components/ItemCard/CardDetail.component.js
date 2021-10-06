import React, { useState } from 'react'
import Modal from 'react-modal';
import { IoAdd, IoCheckmark, IoChevronBack, IoChevronForward, IoRemove } from 'react-icons/io5';

import SqrButton from '../Button/squareButton.component';
import { Thousand } from '../../utils/number';


const CardDetail = (props) => {
    const { isOpen, setIsOpen, data } = props;
    const [index, setIndex] = useState(0);
    const [active, setActive] = useState(0);
    
    const variations = [
        { weight: 1 },
        { weight: 5 },
        { weight: 10 },
    ]

    return (
        <>
            <Modal
                isOpen={isOpen} closeTimeoutMS={400}
                className="fixed inset-0 z-40 h-screen overflow-auto bg-gray-300 outliine-none bg-opacity-10 backdrop-filter backdrop-blur-md"
                overlayClassName="fixed inset-0 z-40 h-full h-screen overflow-auto bg-gray-300 outliine-none bg-opacity-10 backdrop-filter backdrop-blur-md"
            >
                <div className="absolute w-full lg:w-9/10 transform md:-translate-y-1/2 -translate-x-1/2 top-0 md:top-1/2 shadow-xl left-1/2 bg-white p-2.5 flex flex-col md:flex-row">
                    <div className="md:w-1/2 relative">
                        <img src={data.image} alt="Product" className="bg-cover bg-fixed h-64 w-full md:h-100" />
                        <div className="absolute bottom-0 right-5 flex items-center bg-white">
                            <div className="cursor-pointer text-gray-600 px-2.5 py-1.5 bg-white transition duration-500 ease-in-out transform hover:scale-110"><IoChevronBack className="text-lg" /></div>
                            <p className="px-2 text-sm text-gray-800">2/5</p>
                            <div className="cursor-pointer text-gray-600 px-2.5 py-1.5 bg-white transition duration-500 ease-in-out transform hover:scale-110"><IoChevronForward className="text-lg" /></div>
                        </div>
                    </div>
                    <div className="px-5 py-4 pb-10 lg:px-16 lg:py-9 text-left md:text-center md:w-1/2">
                        <div className="relative h-full">
                            <h2 className="font-bold text-gray-800 text-4xl">{data.subtitle}</h2>
                            <h6 className="text-gray-400 text-xs font-bold mt-2"><span className="text-gray-800">By</span> Jume Brice</h6>
                            <div className="md:w-1/2 mx-auto flex items-end md:justify-around md:px-5">
                                {data.discount > 0 && <h5 className="text-gray-800 mt-3 text-xl font-bold mb-1">{Thousand(((100 - data.discount) / 100) * data.price)} <span className="text-xs">FCFA</span></h5>}
                                <h3 className={`mt-3 text-base font-bold mb-1 ${data.discount > 0 ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{data.price && Thousand(data?.price)}<span className="text-xs">FCFA</span></h3>
                            </div>
                            <b className="border-t-2 px-5 border-gray-900" />
                            <p className="text-xs text-gray-800 leading-5">Sint consequat cillum ad incididunt ex eu incididunt velit dolor mollit eiusmod adipisicing adipisicing. Ex exercitation est culpa cupidatat quis quis. Veniam ut et incididunt aliqua adipisicing id nostrud deserunt in.</p>
                            <div className="w-1/2 mx-auto text-gray-800 mt-5">
                                <h2 className="uppercase text-xs font-bold mb-2 text-center">Variations</h2>
                                <div className="flex items-center justify-center mt-1 text-gray-600 font-bold text-sm">
                                    {variations.map((variation, i) =>
                                        <div onClick={() => setIndex(i)} className=" cursor-pointer flex items-center mr-5">
                                            <div className="w-5 h-5 rounded-full bg-green-600 mr-1 flex items-center justify-center">
                                                <IoCheckmark className={`text-transparent font-bold text-sm ${index === i && 'text-white'}`} />
                                            </div>
                                            <h4>{variation.weight}kg</h4>
                                        </div>)}
                                </div>
                            </div>
                            {data.quantity ?
                                <div className="md:w-1/2 flex items-center justify-around md:flex-col mx-auto text-gray-800 mt-5">
                                    <div>
                                        <h5 className="uppercase text-xs font-bold mb-2">quantity ({data.quantity})</h5>
                                        <div className="flex items-center justify-center mt-1 text-gray-600 font-bold mb-4">
                                            <div className="cursor-pointer border-t-2 border-b-2 border-l-2 p-1 border-gray-600 transition duration-500 ease-in-out hover:text-white hover:bg-gray-700">
                                                <IoRemove />
                                            </div>
                                            <div className="border-2 border-gray-600 p-1 px-2">0</div>
                                            <div className="cursor-pointer border-t-2 border-b-2 border-r-2 p-1 border-gray-600 transition duration-500 ease-in-out hover:text-white hover:bg-gray-700">
                                                <IoAdd />
                                            </div>
                                        </div>
                                    </div>
                                    <SqrButton title="Add to Cart" invert={true} onClick={() => console.log(123)} />
                                </div> : null}
                            <div className="absolute md:-right-5 md:-bottom-5 lg:-bottom-9 lg:-right-9 flex items-center justify-center w-full md:justify-end">
                                <div className={`${btn} ${active === 0 ? 'border-gray-800 text-gray-800' : 'text-gray-500'}`} onClick={() => setActive(0)}>Details</div>
                                <div className={`${btn} ${active === 1 ? 'border-gray-800 text-gray-800' : 'text-gray-500'}`} onClick={() => setActive(1)}>More Info</div>
                                <div className={`${btn} ${active === 2 ? 'border-gray-800 text-gray-800' : 'text-gray-500'}`} onClick={() => setIsOpen(false)}>Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
};

export default CardDetail;

const btn = "cursor-pointer text-sm border-b-2 mx-2 py-0.5 px-2 border-transparent transition duration-500 ease-in-out hover:border-gray-800 hover:text-gray-800";