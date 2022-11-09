import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdClose, MdMenu } from "react-icons/md";
import { logout } from "../../redux/usersSlices";
import logo from "../images/logo.png";
export const Nav = ({ authToken, setShowModal, showModal, setIsSignUp}) => {

  const [isOpenMenu, setIsOpenMenu] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state?.users?.userAuth);


  return (
    <nav
      className="fixed w-12/12 z-30 top-0  px-10 bg-white"
    >
      <div className="flex justify-center items-center h-12 w-12 mt-3 ml-2">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2 bg-white">
        <div className="pl-4 flex items-center"></div>
        <div className="block lg:hidden pr-4">
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            id="nav-toggle"
            className="flex items-center p-1 text-gray-900 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            {isOpenMenu ? <MdClose /> : <MdMenu />}
          </button>
        </div>
        <div
          className={`w-full flex-grow md:flex md:items-center md:w-auto ${
            isOpenMenu ? "" : "hidden"
          } mt-2 md:mt-0 bg-white  text-black p-0 z-10" `}
        >
          <ul className="list-reset md:flex  flex-1 items-center ">
            <li className=" mr-96 md:mr-3  ">
              <Link
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="inline-block  py-2 px-4 text-black font-bold no-underline "
                to="/"
              >
                Home
              </Link>
            </li>
            <li className=" mr-96 md:mr-3  ">
              <Link
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="inline-block  py-2 px-4 text-black font-bold no-underline "
                to="/"
              >
                Resources
              </Link>
            </li>
           
            {userLogin &&  <> <li className="mr-96 md:mr-3 ">
              <Link
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="inline-block text-black no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
                to="/dashboard"
              >
               Dashboard
              </Link>
            </li>
            <li className="mr-96 md:mr-3 ">
              <Link
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="inline-block text-black no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
                to="/favourite-pets">
                Favourites
              </Link>
            </li>
           
              <li className="mr-96 md:mr-3 ">
                <Link
                  // onClick={() => {
                  //   setIsOpenMenu(!isOpenMenu);
                  //   setActiveMenu(true);
                  //   setShowNavBar(true);
                  // }}
                  className="inline-block text-black no-underline hover:text-gray-900 hover:text-underline py-2 px-4"
                  to="/admin-dashboard"
                >
                  Admin
                </Link>
              </li>
              </>}
           
          </ul>
          <button        
            className="mx-auto mr-96 lg:mx-0 hover:underline bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900 font-bold rounded-full mt-4 lg:mt-0 py-2 px-6 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"

            onClick={
              userLogin
                ? () => dispatch(logout())
                : () => {            //                 //     
                    setIsOpenMenu(false);
                    setShowModal(true);
                    setIsSignUp(false);
                    window.scrollTo(0, 0);
                  }
            }
          >
            {userLogin ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};
