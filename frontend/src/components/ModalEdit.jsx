import { Bars } from "react-loader-spinner";

const ModalsEdit = ({
  modalOpen,
  setModalOpen,
  formData,
  setFormData,
  handleSubmit,
  loading,
  msg,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      npm: "",
      nama: "",
      kelas: "",
      no_hp: "",
      alamat: "",
      picture: "",
      status: "Aktif",
    });
    setModalOpen(false);
  };

  return (
    modalOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 h-3/4 overflow-auto md:w-1/2 md:h-auto xl:w-1/3 mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Edit Mahasiswa</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">NPM</label>
                <input
                  type="number"
                  name="npm"
                  value={formData.npm}
                  className="input input-bordered w-full py-3 px-3 bg-slate-200 focus:outline-none focus:ring-1"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="input input-bordered w-full py-3 px-3 bg-white focus:bg-slate-100 focus:outline-none focus:ring-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Kelas</label>
                <input
                  type="text"
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="input input-bordered w-full py-3 px-3 bg-white focus:bg-slate-100 focus:outline-none focus:ring-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">No HP</label>
                <input
                  type="text"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  className="input input-bordered w-full py-3 px-3 bg-white focus:bg-slate-100 focus:outline-none focus:ring-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="input input-bordered w-full py-3 px-3 bg-white focus:bg-slate-100 focus:outline-none focus:ring-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Picture URL
                </label>
                <input
                  type="text"
                  name="picture"
                  value={formData.picture}
                  onChange={handleChange}
                  className="input input-bordered w-full py-3 px-3 bg-white focus:bg-slate-100 focus:outline-none focus:ring-1"
                  required
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="flex items-center gap-4 border border-slate-300 p-3 rounded-lg bg-white">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Aktif"
                    checked={formData.status === "Aktif"}
                    onChange={handleChange}
                    className="mr-2 radio radio-success"
                  />
                  Aktif
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Tidak Aktif"
                    checked={formData.status === "Tidak Aktif"}
                    onChange={handleChange}
                    className="mr-2 radio radio-error"
                  />
                  Tidak Aktif
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-400 p-3 rounded-lg text-white hover:bg-gray-500 w-full"
                >
                  Cancel
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="submit"
                  className="bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-600 w-full flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <Bars height={20} width={50} color="#ffffff" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </form>
          {msg && (
            <div className="bg-yellow-200 p-3 rounded-lg text-slate-500 mt-4 text-center">
              {msg === "OK" ? <p>Data Updated</p> : <p>{msg}</p>}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ModalsEdit;
