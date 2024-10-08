import React, { useState } from 'react';
import BannerPic2 from "../assets/BannerPic2.png";
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Banner2 = () => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone: '',
    pesan: '',
  });

  const [loading, setLoading] = useState(false); // State untuk loading

  // Handle perubahan input pada form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validasi format email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validasi input sebelum mengirimkan form
  const validateForm = () => {
    if (!formData.nama || !formData.email || !formData.phone || !formData.pesan) {
      Swal.fire({
        title: 'Error!',
        text: 'Semua field harus diisi!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    if (!isValidEmail(formData.email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Format email tidak valid!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    return true;
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek apakah form valid
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Mulai loading saat form disubmit

    try {
      const response = await fetch('https://fcollection.my.id/landing2/home/submit_kontak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Data form harus di-stringify
    })

      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }

      const result = await response.json();
      setLoading(false); // Selesai loading

      // Jika respons dari server sukses
      if (result.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'Pesan berhasil dikirim!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        // Reset form setelah berhasil
        setFormData({
          nama: '',
          email: '',
          phone: '',
          pesan: '',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: `Terjadi kesalahan: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <section>
      {/* Banner */}
      <div className="container py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl font-bold">
            Temukan Kembali Semangat dan Potensi Anda Bersama Kami
          </h1>
          <p className="text-dark2 mt-6 font-semibold">
            Apakah Anda seorang wanita yang telah mengalami jeda karir dan ingin kembali berkontribusi dalam dunia kerja?
          </p>
          <p className="text-dark2 mt-4 font-semibold">
            Jangan biarkan masa lalu menghalangi Anda untuk meraih masa depan yang lebih cerah. Bergabunglah sekarang dan mulailah langkah baru dalam perjalanan karir Anda!
          </p>
        </motion.div>

        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPic2}
            alt="Banner2"
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>

      {/* Form */}
      <div className="container mt-4 mb-12">
        <h2 className="text-2xl font-bold mb-4">Silahkan Hubungi Kami</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Masukkan nama"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Masukkan email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Masukkan nomor telepon"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pesan</label>
            <textarea
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Tulis pesan Anda"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:primary-btn transition duration-300"
            disabled={loading} // Disabled saat loading
          >
            {loading ? 'Mengirim...' : 'Gabung Sekarang'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Banner2;
