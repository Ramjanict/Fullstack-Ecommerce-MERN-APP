import React, { useEffect, useState } from "react";
import ApiSummary from "../BackendUrl/backendUrl";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../Components/ChangeUserRole";

const AllUsers = () => {
  const [allusers, setAllUer] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(ApiSummary.all_users.url, {
      method: ApiSummary.all_users.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUer(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="relative w-[100%]  overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Sr.</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Created Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {allusers.map((el, i) => {
            return (
              <tr
                key={i}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {i + 1}
                </th>
                <td className="px-6 py-4">{el.name}</td>
                <td className="px-6 py-4">{el.email}</td>
                <td className="px-6 py-4">{el.role}</td>
                <td className="px-6 py-4 ">
                  {moment(el.createdAt).format("LL")}
                </td>
                <td className="px-6 py-4 ml-5">
                  <button
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                    className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white cursor-pointer"
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => {
            setOpenUpdateRole(false);
          }}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          calFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
