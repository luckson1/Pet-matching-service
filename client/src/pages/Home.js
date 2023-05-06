import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Authmodal } from "../components/Authmodal";
import { Nav } from "../components/navigation/Nav";
import { fetchAllpetsAction } from "../redux/petsSlices";
import { logout } from "../redux/usersSlices";
import LoadingSkeleton from "../components/LoadingSkeletons";

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
  const selectedPets = pets?.slice(-6);
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
  const skeletonData = Array.from({ length: 6 });
  return (
    <div className="h-fit min-h-screen w-screen ">
      <Nav
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />

      
      <div className="w-full  flex  lg:flex-col h-[calc(100vh-4rem)] px-5 md:px-10 lg:px-20 overflow-hidden">
        <div className=" h-full flex w-full flex-col-reverse lg:flex-row ">
          <div className="w-full lg:w-[40%] lg:h-full h-[60%] md:h-[50%] bg-base-100 flex  flex-col justify-around items-center">
            <p className="text-6xl md:text-8xl text-semi-bold text-slate-700 text-start">
              Ready to Adopt a  🐶 Pet ? 
            </p>
            <button
              className="btn btn-primary w-full max-w-sm"
              onClick={() => {
                authToken ? dispatch(logout()) : setShowModal(true);
              }}
            >
              {authToken ? "Sign Out" : "Adopt a Pet"}
            </button>
            <p className="text-xl md:text-2xl font-semibold text-start">
            Let's get started. Search pets from shelters, rescues, and individuals.
            </p>
          </div>
          <div
            className={`w-full lg:w-[60%] lg:h-full  h-[40%] md:h-[50%] flex justify-center items-center  bg-contain bg-no-repeat bg-opacity-10 bg-[url(https://res.cloudinary.com/dhciks96e/image/upload/v1683303042/IMG-20220722-WA0009-removebg_c0bkk4.png)]`}
          >
           
          </div>
        </div>
   
      </div>
      {showModal && (
            <Authmodal
              setShowModal={setShowModal}
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
            />
          )}
    
      <div className="bg-secondary bg-opacity-10 w-full py-10 h-fit  px-5 md:px-10 lg:px-20 ">
    
        <p className="text-slate-900 text-4xl my-12 text-center">
          Pets Availabe for Adoption
        </p>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-center items-center">
          {petsLoading ? (
        skeletonData.map((item, index) => (
          <LoadingSkeleton key={index} />
        ))
          ) : (
            selectedPets?.map((pet) => (
         
              <div className="card w-full max-w-sm glass"   key={pet?.petId}>
              <figure>  <img
                  src={pet?.image}
                  alt={pet?.name}
              
                /></figure>
              <div className="card-body">
                <h2 className="text-xl text-center">{pet?.name}</h2>
                <button className="btn btn-secondary"    onClick={() => {
            setShowModal(true);
            window.scrollTo(0, 0);
          }}>Learn More</button>
               
              </div>
            </div>
            ))
          )}
        </div>
   
      </div>
      <div className="bg-base-100 h-[60vh] ">
     <div className="px-5 md:px-10 lg:px-20">
     <p className="text-3xl text-center my-12">Want to Adopt a Pet? Be in the Know</p>

<div className="flex flex-row flex-wrap justify-between">
  <div className="flex flex-col items-center gap-y-5  mt-6 ">
    <p className="text-2xl font-semibold text-slate-700 mb-3">
      Checklist for New Adopters
    </p>
    <p>Learn what you need to ensure adoption success</p>
   <a href="https://tnrtrust.org/news/" target="_blank"  rel="noreferrer" className="btn btn-primary btn-outline px-4">
      Learn More
    </a>
  </div>

  <div className="flex flex-col items-center gap-y-5 mt-6 ">
    <p className="text-2xl font-semibold text-slate-700 mb-3">Adoption Process</p>
    <p>Get more information on the process of adopting a pet</p>
    <a href="https://tnrtrust.org/news/" target="_blank"  rel="noreferrer" className="btn btn-primary btn-outline px-4">
      Learn More
    </a>
  </div>
  <div className="flex flex-col items-center gap-y-5  mt-6 ">
    <p className="text-2xl font-semibold text-slate-700 mb-3">Adoption FAQs</p>
    <p>Check what others frequently ask about</p>
   <a href="https://tnrtrust.org/news/" target="_blank"  rel="noreferrer" className="btn btn-primary btn-outline px-4">
      Learn More
    </a>
  </div>
</div>
     </div>
        <svg
          className="wave-top   bg-secondary mt-20"
          viewBox="0 0 1439 147"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#fff">
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
        <footer className="w-full mx-auto text-center py-6 mb-12 bg-secondary mt-0  ">
          <div className="container mx-auto px-8">
            <div className="w-full flex flex-col md:flex-row py-6">
              <div className="flex-1 mb-6 text-black"></div>
              <div className="flex-1">
                <p className="uppercase text-gray-900   md:mb-6 ">Links</p>
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
                <p className="uppercase text-gray-900   md:mb-6">Legal</p>
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
                <p className="uppercase text-gray-900   md:mb-6">Social</p>
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
                <p className="uppercase text-gray-900   md:mb-6">Company</p>
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
