import React, { useState } from 'react';
import MainImg from "../assets/MainImg.jpg";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import Swal from 'sweetalert2'; // Import SweetAlert2 untuk menampilkan error atau pesan sukses

const BgImage = {
  backgroundImage: `url(${MainImg})`,
  height: "100vh",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Register = () => {
  // State untuk setiap field input
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [ttl, setTtl] = useState(""); // Tanggal lahir
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // State untuk validasi dan error
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [ttlError, setTtlError] = useState("");

  // Fungsi untuk memvalidasi format password
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/; // Minimal 6 karakter, mengandung angka dan huruf besar
    return regex.test(password);
  };

  // Fungsi untuk menghitung umur berdasarkan tanggal lahir
  const validateAge = (ttl) => {
    const birthDate = new Date(ttl);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  // Fungsi untuk menangani validasi dan pengiriman data ke API
  const handleRegister = () => {
    // Reset error messages
    setPasswordError("");
    setRePasswordError("");
    setTtlError("");

    // Validasi umur minimal 17 tahun
    const age = validateAge(ttl);
    if (age < 17) {
      setTtlError("Umur minimal 17 tahun.");
      return;
    }

    // Validasi semua field harus terisi
    if (!nama || !email || !phone || !alamat || !jenisKelamin || !ttl || !password || !rePassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Semua field harus diisi!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Validasi kesesuaian password dan re-password
    if (password !== rePassword) {
      setRePasswordError("Password dan Re-Password tidak cocok!");
      return;
    }

    // Validasi kekuatan password
    if (!validatePassword(password)) {
      setPasswordError("Password harus minimal 6 karakter, mengandung angka dan huruf besar.");
      return;
    }

    const userData = {
      nama,
      email,
      phone,
      alamat,
      jenisKelamin,
      ttl,
      password,
    };

    // Kirim data ke API
    fetch('https://fcollection.my.id/landing2/home/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),  // Pastikan data dikirim dalam format JSON
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'Registrasi berhasil!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setNama("");
        setEmail("");
        setPhone("");
        setAlamat("");
        setJenisKelamin("");
        setTtl("");
        setPassword("");
        setRePassword("");
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan pada server!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  };


  return (
    <>
      {/* Register Page with Background Image */}
      <main style={BgImage}> 
        <div className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white/10 backdrop-blur-md p-10 sm:w-[700px] md:w-[500px]"
          >
            {/* Form Register */}
            <div className="p-6">
              <h1 className="text-3xl text-white font-extrabold text-center mb-4">Registrasi</h1>
              <form className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="nama" className="input-label font-bold text-white">Nama</label>
                  <input 
                    type="text" 
                    id="nama" 
                    value={nama} 
                    onChange={e => setNama(e.target.value)} 
                    placeholder="Nama" 
                    className="bg-white/20 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="email" className="input-label font-bold text-white">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="bg-white/20 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="phone" className="input-label font-bold text-white">Phone</label>
                  <input 
                    type="text" 
                    id="phone" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="Phone" 
                    className="bg-white/20 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="alamat" className="input-label font-bold text-white">Alamat</label>
                  <input 
                    type="text" 
                    id="alamat" 
                    value={alamat} 
                    onChange={e => setAlamat(e.target.value)} 
                    placeholder="Alamat" 
                    className="bg-white/20 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="jenisKelamin" className="input-label font-bold text-white">Jenis Kelamin</label>
                  <select 
                    id="jenisKelamin" 
                    value={jenisKelamin} 
                    onChange={e => setJenisKelamin(e.target.value)} 
                    className="bg-white/20 text-black p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="ttl" className="input-label font-bold text-white">Tempat Tanggal Lahir</label>
                  <input 
                    type="date" 
                    id="ttl" 
                    value={ttl} 
                    onChange={e => setTtl(e.target.value)} 
                    className={`bg-white/20 p-3 rounded-lg w-full focus:outline-none focus:ring-2 ${
                      ttlError ? 'focus:ring-red-500' : 'focus:ring-emerald-500'
                    } text-white`}
                    title={ttlError || ""}
                  />
                  {ttlError && <small className="text-red-500">{ttlError}</small>}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="password" className="input-label font-bold text-white">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                    className={`bg-white/20 p-3 rounded-lg w-full focus:outline-none focus:ring-2 ${
                      passwordError ? 'focus:ring-red-500' : 'focus:ring-emerald-500'
                    } text-white`}
                    title={passwordError || ""}
                  />
                  {passwordError && <small className="text-red-500">{passwordError}</small>}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="rePassword" className="input-label font-bold text-white">Re-Password</label>
                  <input 
                    type="password" 
                    id="rePassword" 
                    value={rePassword} 
                    onChange={e => setRePassword(e.target.value)} 
                    placeholder="Re-Password" 
                    className={`bg-white/20 p-3 rounded-lg w-full focus:outline-none focus:ring-2 ${
                      rePasswordError ? 'focus:ring-red-500' : 'focus:ring-emerald-500'
                    } text-white`}
                    title={rePasswordError || ""}
                  />
                  {rePasswordError && <small className="text-red-500">{rePasswordError}</small>}
                </div>
              </form>
              {/* Tombol dengan Gradasi Emerald dan Yellow */}
              <button 
                onClick={handleRegister}
                className="bg-gradient-to-r from-yellow-400 to-emerald-500 text-white py-2 rounded-full mt-7 block w-full 
                  hover:scale-105 transition-all duration-300 shadow-custom-inset px-5"
              >
                Daftar
              </button>
            </div>

            <div>
              <p className="mt-3 text-white text-center text-sm my-3">Sudah punya akun? <span>Login disini</span></p>
            </div>

            {/* Tombol Login dan Kembali ke Home */}
            <div className="flex justify-center space-x-4 mt-5">
              {/* Tombol Login */}
              <Link to="/login" className="primary-btn bg-secondary text-white py-2 px-4 rounded-lg">
                Login
              </Link>

              {/* Tombol Kembali ke Home */}
              <Link to="/" className="primary-btn bg-primary text-white py-2 px-4 rounded-lg">
                Kembali ke Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Register;
