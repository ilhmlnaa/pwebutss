const routesData = {
  status: "Api Ready!!!",
  routes: {
    method: {
      login: "GET",
      register: "POST",
      mahasiswa: "GET, POST, PATCH, DELETE",
    },
    endpoints: {
      login: "/v1/auth/login",
      register: "/v1/auth/register",
      mahasiswa: "/v1/mhs",
      mahasiswa: "/v1/mhs/npm/:npm",
    },
    data: {
      login: {
        bodyJson: {
          username: "string",
          password: "string",
        },
      },
      register: {
        bodyJson: {
          username: "string",
          password: "string",
        },
      },
      mahasiswa: {
        bodyJson: {
          npm: "integer",
          nama: "string",
          kelas: "string",
          no_hp: "string",
          alamat: "string",
        },
      },
    },
  },
};

export default routesData;
