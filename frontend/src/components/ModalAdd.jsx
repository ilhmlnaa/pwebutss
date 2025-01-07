import { Bars } from "react-loader-spinner";

const ModalsAdd = ({
  modalOpen,
  setModalOpen,
  handleSubmit,
  loading,
  formData,
  handleChange,
  msg,
}) => {
  return (
    modalOpen && (
      <div className="z-50 fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-500 p-6 rounded-lg shadow-lg w-5/6 overflow-auto md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">
            Add New Mahasiswa
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 "
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                NPM <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="npm"
                value={formData.npm}
                onChange={handleChange}
                className="input input-bordered w-full py-3 px-3 bg-white focus:bg-slate-100 focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-medium mb-2">
                Kelas <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-medium mb-2">
                No HP <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-medium mb-2">
                Alamat <span className="text-red-500">*</span>
              </label>
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
              />
            </div>

            <div className="col-span-1">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
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
                  "Add Data"
                )}
              </button>
            </div>
          </form>
          {msg && (
            <div className=" bg-yellow-200 p-3 rounded-lg text-slate-500 mt-4 text-center">
              {msg === "OK" ? <p>Data Created</p> : <p>{msg}</p>}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ModalsAdd;
