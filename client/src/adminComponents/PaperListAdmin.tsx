import {PapersAtom} from "../atoms/PapersAtom.tsx"
import {useAtom} from "jotai";
// @ts-ignore
import image1 from "../resources/images/image1.jpeg";
import React, {useEffect, useState} from 'react';
import {http} from "../http.ts";
import {PaperDto} from "../Api.ts";
import {CartAtom} from '../atoms/CartAtom.tsx'
import {TotalCountAtom} from "../atoms/TotalCountAtom.tsx";
import {useInitializeData} from "../useInitializeData.ts";
import { SharedPapersAtom } from "../atoms/SharedPapersAtom.tsx";
import {IsFilterActive} from "../atoms/FilterSortAtoms.tsx";



export default function PaperListAdmin() {
    const [sharedPapers, setSharedPapers] = useAtom(SharedPapersAtom);
    const [isFilterActive, setIsFilterActive] = useAtom(IsFilterActive);
    const [papers, setPapers] = useAtom(PapersAtom);
    const [totalCount] = useAtom(TotalCountAtom);
    const [startAt, setStartAt] = useState(0);
    const limit = 10;

    // Fetch papers with start and limit index
    const fetchPapers = (startAt: number) => {
        http.api.paperGetAllPapers({ limit, startAt })
            .then((response) => {
                setPapers((prevPapers) => [...prevPapers, ...response.data]);
                setSharedPapers((prevSharedPapers) => [...prevSharedPapers, ...response.data]);
            });
    };

    useInitializeData();

    useEffect(() => {
        // Reset papers and startAt when the component mounts
        setPapers([]);  // Clear the previous papers list
        setSharedPapers([]);
        setStartAt(0);  // Reset the starting index
    }, []);  // This effect runs once when the component mounts

    useEffect(() => {
        fetchPapers(startAt);  // Fetch papers based on startAt
    }, [startAt]);  // Re-fetch papers when startAt changes

    const handleLoadMore = () => {
        setStartAt((prevStartAt) => prevStartAt + limit);
    };


    return (
        <div>
            {sharedPapers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10 mt-10">
                    {sharedPapers.map((paper) => (
                        <div key={paper.id}>
                            <div
                                className="card w-96 h-96 shadow-xl relative bg-cover bg-center mb-6"
                                style={{
                                    backgroundImage: `url(${image1})`,
                                }}
                            >
                                <div
                                    className="absolute inset-8 bg-white flex flex-col justify-between items-start p-5">
                                    <h2 className="card-title mb-6">{paper.name}</h2>
                                    <p className="mb-8">Properties</p>
                                    {paper.properties && paper.properties.length > 0 ? (
                                        <ul className="list-disc list-inside mb-4">
                                            {paper.properties.map((property, index) => (
                                                <li key={index}>
                                                    {property.propertyName}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No properties available.</p>
                                    )}
                                    <p className="text-lg font-semibold mb-4">{paper.stock} items in stock</p>
                                    <p className="text-lg font-semibold mb-4">Is Active: {paper.discontinued}</p>
                                    <div className="w-full mt-auto">
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" className="size-10">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {papers.length <= totalCount && !isFilterActive && (
                <div className="flex flex-col items-center mt-6">
                    <button onClick={handleLoadMore} className="text-black border-b-2 border-transparent hover:border-black transition-all duration-300 mb-4">
                        Load More
                    </button>
                    <p>{papers.length} of {totalCount}</p>
                </div>
            )}
        </div>
    );
}