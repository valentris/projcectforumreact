import React, { useState } from 'react';
import MainImg from "../assets/MainImg.jpg";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const BgImage = {
  backgroundImage: `url(${MainImg})`,
  height: "100vh",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk menangani login
  const handleLogin = () => {
    // Data login yang akan dikirim ke API
    const loginData = {
      username,
      password
    };

    // Kirim data ke API
    fetch('https://fcollection.my.id/landing2/home/authenticate', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData), // Mengirim data login dalam format JSON
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Jika login berhasil, simpan data user yang login ke localStorage
        const userDataWithId = {
          ...data.userData, // Mengambil data user dari API
          userId: data.userData.userId  // Pastikan userId disertakan
        };

        localStorage.setItem('userData', JSON.stringify(userDataWithId));

        // Tampilkan pesan sukses dan redirect ke halaman home
        Swal.fire({
          title: 'Success!',
          text: 'Login berhasil!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect ke halaman home setelah klik "OK"
          navigate('/');
        });
      } else {
        // Jika login gagal, tampilkan pesan error
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan pada server!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  return (
    <>
      <main style={BgImage}> 
        <div className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white/10 backdrop-blur-md p-10 sm:w-[600px] md:w-[400px]"
          >
            <div className="p-6">
              <h1 className="text-3xl text-white font-extrabold text-center mb-4">Login</h1>
              <form className="flex flex-col gap-3">
                <div>
                  <label htmlFor="username" className="input-label font-bold text-white">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                    className="bg-white/20 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="input-label font-bold text-white">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    className="bg-white/20 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>       
              </form>
              <button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-yellow-400 to-emerald-500 text-white py-2 rounded-full mt-7 block w-full 
                  hover:scale-105 transition-all duration-300 shadow-custom-inset px-5"
              >
                Login
              </button>
            </div>

            <div>
              <p className="mt-3 text-white text-center text-sm my-3">Belum Punya Akun? <span>Daftar disini</span></p>
            </div>

            <div className="flex justify-center space-x-4 mt-5">
              <Link to="/register" className="primary-btn bg-secondary text-white py-2 px-4 rounded-lg">
                Registrasi
              </Link>

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

export default Login;
