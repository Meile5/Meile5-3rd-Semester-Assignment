import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserCircleIcon, IdentificationIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import LoginModal from "./LoginModal.tsx";
import {useAtom} from "jotai";
import {LoggedCustomerAtom} from "../atoms/LoggedCustomerAtom.tsx";


// @ts-ignore
import image2 from "../resources/images/image2.jpg";
import {useInitializeData} from "../useInitializeData.ts";

export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loggedCustomer] = useAtom(LoggedCustomerAtom);

    const handleCustomerClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

    }, []);

    return (
        <div>
            {/* Top image with overlay text */}
            <div className="relative">
                <img
                    src={image2}
                    alt="Nordic Paper"
                    className="w-full h-auto max-h-[55vh] object-cover"
                />
                <h1 className="absolute top-5 left-5 text-white text-5xl font-bold shadow-md">
                    Nordic Paper
                </h1>
            </div>

            {/* Cards for adminComponents and CustomerComponents */}
               <div className="flex mt-20 justify-evenly mb-32">
                   <Link to="/admin" >
                       <div className="card bg-base-100 w-96 shadow-xl hover:drop-shadow-xl">
                           <figure className="px-10 pt-10">
                               <UserCircleIcon className="w-20 h-20 text-gray-500"/>
                           </figure>
                           <div className="card-body items-center text-center">
                               <h2 className="card-title">Admin</h2>
                           </div>
                       </div>
                   </Link>

                   <div
                       className="card bg-base-100 w-96 shadow-xl hover:drop-shadow-xl"
                       onClick={handleCustomerClick}
                   >
                       <figure className="px-10 pt-10">
                           <ShoppingCartIcon className="w-20 h-20 text-gray-500"/>
                       </figure>
                       <div className="card-body items-center text-center">
                        <h2 className="card-title">Customer</h2>
                    </div>
                </div>
            </div>

            {/* Render the login modal */}
            <LoginModal isOpen={isModalOpen} onClose={closeModal}/>

        </div>
    );
}
