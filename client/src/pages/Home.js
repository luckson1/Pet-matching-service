import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Authmodal } from "../components/Authmodal";
import LoadingComponent from "../components/LoadingSpinner";
import { Nav } from "../components/navigation/Nav";
import { fetchAllpetsAction } from "../redux/petsSlices";
import { logout } from "../redux/usersSlices";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  // get data from store

  const user = useSelector((state) => {
    return state?.users;
  });
  const { isLoggedIn, isRegistered, userAuth } = user;
  const petsState = useSelector((state) => {
    return state?.pets;
  });

  const { allPets, petsLoading } = petsState;
  const pets = allPets?.pets;
  const selectedPets = pets?.slice(-4);
  console.log(selectedPets);

  // force navigation once an action is performed
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllpetsAction());
  }, []);

  useEffect(() => {
    if (isRegistered) {
      navigate("/onboarding");
      window.location.reload();
    }
  }, [isRegistered, navigate]);

  const authToken = userAuth;

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const dispatch = useDispatch();
  return (
    <div className="h-screen">
      <Nav
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />

      <div className="w-screen h-3/6">
        <div className=" overlay mt-16 bg-no-repeat overflow-visible">
          <p className=" text-xl md:text-2xl text-violet-500 mx-3 ">
            Find your new best friend, or rehome your pet
          </p>

          <div className="mt-6 md:mt-56 mx-10 flex flex-col items-center md:flex-row md:gap-5  md:px-24">
            <button
              className="w-64 sm:w-48 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-gray-900 font-bold rounded-full mb-2 py-3  md:py-4 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              onClick={() => {
                authToken ? dispatch(logout()) : setShowModal(true);
              }}
            >
              {authToken ? "Sign Out" : "Adopt a Pet"}
            </button>
            {!authToken && (
              <>
                <h1 className="text-3xl">Or</h1>
                <button
                  className=" w-64 sm:w-48 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-gray-900 font-bold rounded-full mb-2 py-3 md:py-4  px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  onClick={() => {
                    navigate("/doner-onboarding");
                  }}
                >
                  Put Your Pet on Adoption
                </button>
              </>
            )}
          </div>

          {showModal && (
            <Authmodal
              setShowModal={setShowModal}
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
            />
          )}
        </div>
      </div>
      <div className="relative  bg-gradient-to-r from-indigo-400
       ">
        <div className="md:hidden h-12"></div>
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
      <div className="bg-slate-100 w-screen pb-10 h-fit ">
        <div className="bg-inherit h-1"></div>
        <p className="text-slate-900 text-2xl mt-7">
          Pets Availabe for Adoption
        </p>
        <div className="flex flex-row flex-wrap items-center justify-between pr-5 pl-3">
          {petsLoading? <LoadingComponent />:  selectedPets?.map((pet) => (
            <div
              className="bg-white w-40 md:w-60 h-56 md:h-72 mt-8 md:mt-12 rounded shadow-xl flex flex-col md:mx-12  "
              key={pet?.petId}
            >
              <img
                src={pet?.image}
                alt={pet?.name}
                className="h-5/6 w-6/6 rounded-t"
              />
              <p className="text-xl text-violet-500">{pet?.name}</p>
            </div>
          ))}
        </div>
        <button
          className="bg-inherit text-xl w-64 border-violet-500 border-2 rounded-3xl px-6 py-2 hover:bg-violet-500 mt-7"
          onClick={() => {
             setShowModal(true);
             window.scrollTo(0,0)
          }}
        >
          View More
        </button>
      </div>
      <div className="bg-white h-48 mt-16">
        <p className="text-3xl">Want to Adopt a Pet? Be in the Know</p>

        <div className="flex flex-row flex-wrap justify-between mx-12">
          <div className="flex flex-col items-center mt-6 ">
            <p className="2xl text-violet-500 mb-3">
              Checklist for New Adopters
            </p>
            <p>Learn what you need to ensure adoption success</p>
            <button className="bg-inherit text-xl border-violet-500 border-2 rounded-3xl px-6 py-2 hover:bg-violet-500 mt-7">
              Learn More
            </button>
          </div>

          <div className="flex flex-col items-center mt-6 ">
            <p className="2xl text-violet-500 mb-3">Adoption Process</p>
            <p>Get more information on the process of adopting a pet</p>
            <button className="bg-inherit text-xl border-violet-500 border-2 rounded-3xl px-6 py-2 hover:bg-violet-500 mt-7">
              Learn More
            </button>
          </div>
          <div className="flex flex-col items-center mt-6 ">
            <p className="2xl text-violet-500 mb-3">Adoption FAQs</p>
            <p>Check what others frequently ask about</p>
            <button className="bg-inherit text-xl border-violet-500 border-2 rounded-3xl px-6 py-2 hover:bg-violet-500 mt-7">
              Learn More
            </button>
          </div>
        </div>
        <svg
          className="wave-top   bg-gradient-to-r from-indigo-400 via-purple-200 to-indigo-200"
          viewBox="0 0 1439 147"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#f8fafc">
                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path
                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                    opacity="0.200000003"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <footer className="w-full mx-auto text-center py-6 mb-12 bg-gradient-to-r from-indigo-300 via-purple-100 to-indigo-100 mt-0  ">
          <div className="container mx-auto px-8">
            <div className="w-full flex flex-col md:flex-row py-6">
              <div className="flex-1 mb-6 text-black"></div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6 ">
                  Links
                </p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Help
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6">
                  Legal
                </p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Terms
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6">
                  Social
                </p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Linkedin
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6">
                  Company
                </p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Official Blog
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a
                      href="/"
                      className="no-underline hover:underline text-gray-900   hover:text-pink-500"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
