import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ROLE from "../Role/role";
import ApiSummary from "../BackendUrl/backendUrl";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose, userId, calFunc }) => {
  const [userRole, setUserRole] = useState(role);
  const handleSelectOptions = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    const fetchData = await fetch(ApiSummary.update_user.url, {
      method: ApiSummary.update_user.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        role: userRole,
        userId: userId,
      }),
    });
    const reponseData = await fetchData.json();
    if (reponseData.success) {
      toast.success(reponseData.message);
      onClose();
      calFunc();
    }

    if (reponseData.error) {
      toast.error(reponseData.message);
    }
  };
  return (
    <div className=" w-full h-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-slate-200 bg-opacity-50 z-10 ">
      <div className="w-full max-w-sm mx-auto bg-white p-4 shadow-md rounded-md">
        <button onClick={onClose} className="block ml-auto text-xl">
          <IoMdClose />
        </button>
        <h1 className=" text-lg font-medium pb-4">Change User Role</h1>
        <p>Name:{name}</p>
        <p>Email:{email}</p>

        <div className="flex items-center justify-between py-4">
          <p>Role:</p>
          <select
            value={userRole}
            onChange={handleSelectOptions}
            className="border px-4 py-1 rounded-md outline-none"
          >
            {Object.values(ROLE).map((val, i) => {
              return (
                <option value={val} key={i}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block px-3 py-1 bg-red-600 text-white hover:bg-red-700 rounded-full"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
