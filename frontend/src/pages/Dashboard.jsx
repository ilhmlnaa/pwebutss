import React, { useState, useEffect } from "react";
import { getMhs, createMhs, deleteMhs, updateMhs } from "../utils/Api";
import CardMhs from "../components/CardMhs";
import TableMhs from "../components/TableMhs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCellsLarge, faList } from "@fortawesome/free-solid-svg-icons";
import ModalsAdd from "../components/ModalAdd";
import ModalsEdit from "../components/ModalEdit";
import { TableMhsLoader } from "../components/SkeletonLoader";
import { ToastContainer, toast } from "react-toastify";
import printData from "../utils/PrintData";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [mhs, setMhs] = useState([]);
  const [msg, setMsg] = useState("");
  const [view, setView] = useState("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    npm: "",
    nama: "",
    kelas: "",
    no_hp: "",
    alamat: "",
    picture: "",
    status: "Aktif",
  });

  const [loadingState, setLoadingState] = useState({
    add: false,
    edit: false,
    load: true,
  });

  useEffect(() => {
    getMhs()
      .then((response) => {
        if (response && response.data) {
          setMhs(response.data);
          setLoadingState((prevState) => ({ ...prevState, load: false }));

          if (response.data.statusCode === 404 || response.data.length === 0) {
            toast.error("Api Server Error: Data not found", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              toastId: "apiError404Toast",
            });
          }
        } else {
          setLoadingState((prevState) => ({ ...prevState, load: false }));
          toast.error("Api Server Error: Api Url invalid", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: "apiErrorNoDataToast",
          });
        }
      })
      .catch((err) => {
        setLoadingState((prevState) => ({ ...prevState, load: false }));
        toast.error("Api Server Error: Unable to reach server", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: "apiErrorToast",
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const newData = {
      npm: parseInt(formData.npm),
      nama: formData.nama,
      kelas: formData.kelas,
      no_hp: formData.no_hp,
      alamat: formData.alamat,
      picture: formData.picture,
    };

    try {
      setLoadingState((prevState) => ({ ...prevState, add: true }));
      const response = await createMhs(newData);
      if (response && response.message) {
        if (response.statusCode === 201) {
          Swal.fire({
            icon: "success",
            title: "Data Added Successfully!",
            text: "The data has been added successfully.",
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setModalOpen(false);
              setFormData({
                npm: "",
                nama: "",
                kelas: "",
                no_hp: "",
                alamat: "",
                picture: "",
              });
              await getMhs()
                .then((response) => {
                  if (response && response.data) {
                    setMhs(response.data);
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
        } else {
          setMsg(response.message || "Failed to add data. Server Error!");
          setTimeout(() => setMsg(""), 3000);
        }
      } else {
        setMsg("An unexpected error occurred.");
        setTimeout(() => setMsg(""), 3000);
      }

      setLoadingState((prevState) => ({ ...prevState, add: false }));
    } catch (error) {
      setLoadingState((prevState) => ({ ...prevState, add: false }));
      setMsg("Failed to add data. Server Error!");
      setTimeout(() => setMsg(""), 3000);
      console.error(error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const updatedData = {
      npm: parseInt(formData.npm),
      nama: formData.nama,
      kelas: formData.kelas,
      no_hp: formData.no_hp,
      alamat: formData.alamat,
      picture: formData.picture,
      status: formData.status,
    };

    try {
      setLoadingState((prevState) => ({ ...prevState, edit: true }));
      const response = await updateMhs(formData.npm, updatedData);

      if (response.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Data Updated Successfully!",
          text: "The data has been updated successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          setMhs(
            mhs.map((item) =>
              item.npm === formData.npm ? response.data : item
            )
          );
          setFormData({
            npm: "",
            nama: "",
            kelas: "",
            no_hp: "",
            alamat: "",
            picture: "",
            status: "",
          });
          setEditModalOpen(false);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Update Data",
          text: response.message || "There was an issue updating the data.",
          confirmButtonText: "OK",
        });
      }
      setLoadingState((prevState) => ({ ...prevState, edit: false }));
    } catch (error) {
      setLoadingState((prevState) => ({ ...prevState, edit: false }));
      Swal.fire({
        icon: "error",
        title: "Failed to Update Data",
        text: "An unexpected error occurred.",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  const handleDelete = async (npm) => {
    try {
      const response = await deleteMhs(npm);
      if (response.statusCode === 200) {
        setMhs(mhs.filter((item) => item.npm !== npm));
        setMsg("Data deleted successfully");
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Failed to delete data");
      }
    } catch (error) {
      setMsg("Failed to delete data");
      setTimeout(() => setMsg(""), 3000);
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (mhs) => {
    setFormData(mhs);
    setEditModalOpen(true);
  };


  // if (loading) {
  //   return (
  //     <div className="w-full p-5 mt-10">
  //       <h1 className="font-extrabold text-center text-2xl text-slate-400 mb-14">
  //         Data Mahasiswa Gunadarma
  //       </h1>
  //       <SkeletonLoader />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full p-5 mt-10">
      <h1 className="font-extrabold text-center text-2xl text-slate-400 mb-14">
        Data Mahasiswa Gunadarma
      </h1>

      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-2 flex-row items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-300 p-3 rounded-lg mb-5 text-white font-bold hover:bg-blue-400"
          >
            ➕ Add Data
          </button>
          <button
            onClick={printData}
            className="bg-blue-300 p-3 rounded-lg mb-5 text-white font-bold hover:bg-blue-400"
          >
            🖨️ Print All
          </button>
        </div>

        <div className="flex gap-2 items-start">
          <button
            onClick={() => setView("table")}
            className={`p-3 rounded-lg mb-5 text-blue-500 font-bold hover:bg-blue-400 ${
              view === "table"
                ? "bg-blue-500 text-white"
                : "border border-blue-500 text-blue-500 "
            }`}
          >
            <FontAwesomeIcon icon={faList} />
          </button>

          <button
            onClick={() => setView("grid")}
            className={`p-3 rounded-lg mb-5 text-blue-500 font-bold hover:bg-blue-400 ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "border-2 border-blue-500 text-blue-500"
            }`}
          >
            <FontAwesomeIcon icon={faTableCellsLarge} />
          </button>
        </div>
      </div>

      <div id="printable">
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mhs.map((item) => (
              <CardMhs key={item.npm} {...item} />
            ))}
          </div>
        ) : loadingState.load ? (
          <TableMhsLoader />
        ) : (
          <TableMhs
            data={mhs}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>

      {/* Modals for Add and Edit */}
      <ModalsAdd
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleSubmit={handleSubmitAdd}
        loading={loadingState.add}
        formData={formData}
        handleChange={handleChange}
        msg={msg}
      />

      <ModalsEdit
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmitEdit}
        loading={loadingState.edit}
        msg={msg}
      />

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
