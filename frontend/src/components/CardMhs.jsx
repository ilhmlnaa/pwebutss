import React from "react";

const CardMhs = (data) => {
  return (
    <div className="container mx-auto w-full flex flex-row items-start p-3 relative bg-blue-400 bg-opacity-60 rounded-lg shadow-md">
      <div className="w-full h-full bg-gradient-to-b from-red-300 to-purple-400 rounded-lg shadow-md p-6 flex flex-row relative overflow-hidden">
        <div>
          <img
            src={data.picture}
            alt={`Foto ${data.nama}`}
            className="w-36 h-36 rounded-md object-cover"
            onError={(e) => e.target.src = '/profile.png'}
          />
        </div>
        <div className="ml-10 text-slate-800 relative z-10">
          <h2 className="text-xl font-bold mb-2">{data.nama}</h2>
          <p>
            <strong>NPM:</strong> {data.npm}
          </p>
          <p>
            <strong>Kelas:</strong> {data.kelas}
          </p>
          <p>
            <strong>No HP:</strong> {data.no_hp}
          </p>
          <p>
            <strong>Alamat:</strong> {data.alamat}
          </p>
        </div>

        <div className="absolute right-0 top-0 opacity-15 blur-0 z-0">
          <img src="gundar.png" alt="Logo Gunadarma" className="w-48 h-48" />
        </div>
      </div>
    </div>
  );
};

export default CardMhs;
