import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const TableMhs = ({ data, handleDelete, handleEdit }) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 w-full">
        <img src="emot.png" alt="" className="w-44 h-44 absolute" />
        <p className="relative top-28 left-5 font-bold text-red-400">
          server error
        </p>
      </div>
    );
  }

  const handleDeleteWithConfirmation = (npm) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This data will be deleted and cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sir, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(npm);
        Swal.fire("Deleted!", "The data has been deleted.", "success");
      }
    });
  };

  return (
    <div className="overflow-x-auto w-full max-h-96">
      <table className="table table-zebra">
        {/* Table Header */}
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NPM</th>
            <th>Kelas</th>
            <th>No HP</th>
            <th>Alamat</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={item.npm}>
              <td className="">{index + 1}</td>
              {/* Nama */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item.picture || "profile.png"}
                        alt={`Foto ${item.nama}`}
                        className="object-cover"
                        onError={(e) => e.target.src = '/profile.png'}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nama}</div>
                    <div className="text-sm opacity-50">
                      Mahasiswa{" "}
                      {item.status === "Aktif" ? (
                        <span className="text-xs text-green-600 relative">
                          <FontAwesomeIcon
                            icon={faCircleDot}
                            className="pulse-icon absolute top-0 left-7 transform -translate-x-1/2"
                          />
                          {item.status}
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 relative">
                          <FontAwesomeIcon
                            icon={faCircleDot}
                            className="pulse-icon absolute top-0 left-[3.7rem] transform -translate-x-1/2"
                          />
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>

              <td>{item.npm}</td>
              <td>{item.kelas}</td>
              <td>{item.no_hp}</td>
              <td>{item.alamat}</td>

              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-primary text-white"
                    onClick={() => handleEdit(item)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-error text-white"
                    onClick={() => handleDeleteWithConfirmation(item.npm)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMhs;
