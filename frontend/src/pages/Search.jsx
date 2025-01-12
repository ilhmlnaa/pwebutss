import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMhsbyNpm } from "../utils/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCellsLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { updateMhs } from "../utils/Api";
import CardMhs from "../components/CardMhs";
import TableMhs from "../components/TableMhs";
import ModalsEdit from "../components/ModalEdit";
import { TableMhsLoaderStatus } from "../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [view, setView] = useState("table");
  const [msg, setMsg] = useState("");
  const [mhs, setMhs] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    npm: "",
    nama: "",
    kelas: "",
    no_hp: "",
    alamat: "",
    picture: "",
    status: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const npmQuery = queryParams.get("npm");
  const navigate = useNavigate();

  const [loadingState, setLoadingState] = useState({
    edit: false,
    load: true,
  });

  useEffect(() => {
    if (npmQuery) {
      setLoadingState((prevState) => ({ ...prevState, load: true }));
      getMhsbyNpm(npmQuery)
        .then((response) => {
          if (response.data) {
            setSearchResults([response.data]);
          } else {
            setMsg("No data found");
            setSearchResults([]);
          }
          setLoadingState((prevState) => ({ ...prevState, load: false }));
        })
        .catch((error) => {
          console.error(error);
          setSearchResults([error.response.data]);
          setLoadingState((prevState) => ({ ...prevState, load: false }));
        });
    }
  }, [npmQuery]);

  const printData = () => {
    const printContent = document.getElementById("printable");
    const printWindow = window.open("", "", "height=650,width=900");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
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

      if (response && response.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Data Updated Successfully!",
          text: "The data has been updated successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          setEditModalOpen(false);
          setLoadingState((prevState) => ({ ...prevState, load: true }));
          getMhsbyNpm(formData.npm).then((newData) => {
            setSearchResults([newData.data]);
            setMhs(
              mhs.map((item) =>
                item.npm === formData.npm ? newData.data : item
              )
            );

            setLoadingState((prevState) => ({ ...prevState, load: false }));
            setFormData({
              npm: "",
              nama: "",
              kelas: "",
              no_hp: "",
              alamat: "",
              picture: "",
              status: "",
            });
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Update Data",
          text: response.message || "There was an issue updating the data.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoadingState((prevState) => ({ ...prevState, edit: false }));
      Swal.fire({
        icon: "error",
        title: "Failed to Update Data",
        text: "An unexpected error occurred.",
        confirmButtonText: "OK",
      });
      console.error(error);
    } finally {
      setLoadingState((prevState) => ({ ...prevState, edit: false }));
    }
  };

  const handleEdit = (mhs) => {
    setFormData(mhs);
    setEditModalOpen(true);
  };

  return (
    <div className="w-full p-5 mt-10">
      <ToastContainer />
      <h1 className="font-extrabold text-center text-2xl text-slate-400 mb-14">
        Search Results for NPM: {npmQuery}
      </h1>
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-2 flex-row items-start">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-300 p-3 rounded-lg mb-5 text-white font-bold hover:bg-blue-400"
          >
            🏠 Back
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

      {msg && <p className="text-center text-red-500">{msg}</p>}

      <div id="printable">
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((item) => (
              <CardMhs key={item.npm} {...item} />
            ))}
          </div>
        ) : loadingState.load ? (
          <TableMhsLoaderStatus />
        ) : (
          <TableMhs
            data={searchResults}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>

      <ModalsEdit
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmitEdit}
        loading={loadingState.edit}
        msg={msg}
      />
    </div>
  );
};

export default Search;
