import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "./url";
import { AppContext } from "../Contexts/AppContext";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const { token, currUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/users/profile/${currUser}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response : ", response);
        setUserData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching user data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl p-6 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={userData.profile}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover"
              />
            </div>
            <div className="flex flex-col space-y-5 mt-8">
              <div>
                <label className="text-sm font-bold text-gray-500">
                  Full Name
                </label>
                <p className="text-gray-800">{userData.fullname}</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-500">Email</label>
                <p className="text-gray-800">{userData.email}</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-500">
                  Username
                </label>
                <p className="text-gray-800">{userData.username}</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-500">
                  Date of Birth
                </label>
                <p className="text-gray-800">
                  {new Date(userData.dob).toDateString()}
                </p>
              </div>

              <a
                href="/login"
                className="container flex justify-around mt-4 mb-8"
              >
                <button
                  className={`uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${"bg-green-500 text-white"}`}
                >
                  logout
                </button>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
