import React from "react";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 

export const TableMhsLoader = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Nama</th>
            <th>NPM</th>
            <th>Kelas</th>
            <th>No HP</th>
            <th>Alamat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 bg-gray-300">
                      <Skeleton circle width={48} height={48} />
                    </div>
                  </div>
                  <div>
                    <Skeleton height={16} width={120} />
                    <Skeleton height={12} width={80} className="mt-1" />
                  </div>
                </div>
              </td>

              <td><Skeleton height={20} width={100} /></td>
              <td><Skeleton height={20} width={80} /></td>
              <td><Skeleton height={20} width={120} /></td>
              <td><Skeleton height={20} width={150} /></td>

              <td>
                <div className="flex gap-2">
                  <Skeleton width={32} height={32} />
                  <Skeleton width={32} height={32} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


