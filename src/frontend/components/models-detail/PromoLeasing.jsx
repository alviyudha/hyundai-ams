import { useState } from 'react';

function PromoLeasing({ dealers }) {
  const [selectedDealer, setSelectedDealer] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      nama: formData.get('nama'),
      noWhatsapp: formData.get('noWhatsapp'),
      cabang: formData.get('cabang'),
      tenor: formData.get('tenor'),
      dp: formData.get('dp'),
      whatsapp: dealers.find(dealer => dealer.name === selectedDealer).whatsapp
    };

    const url = `https://api.whatsapp.com/send?phone=${data.whatsapp}&text=Nama: ${data.nama}, Nomor Telepon: ${data.noWhatsapp}, Cabang: ${data.cabang}, Tenor: ${data.tenor}, DP: ${data.dp}`;
    window.open(url, '_blank');
  };

  return (
    <div id="promoLeasing" className="">
      <div className="container mx-auto p-10 shadow bg-[#00ADD7]">
        <h5 className="text-2xl font-bold mb-5 text-white">Nikmati promo menarik dari bank partner kami</h5>
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4 mb-4 md:mb-5">
          <img src='/img/logo-leasing/hmf.png' alt="Bank CIMB" className="me-2 mb-2 h-5/6"/>
          <img src='/img/logo-leasing/mtf.png'  alt="Bank My Bank" className="me-2 mb-2 h-5/6"/>
          <img src='/img/logo-leasing/shinhan.png'  alt="Leasing Hasjrat Multiginance" className="me-2 mb-2 h-5/6"/>
          <img src='/img/logo-leasing/mybank.png'  alt="Leasing Mega finance" className="me-2 mb-2 h-5/6"/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="form-control bg-transparent border-none p-0">
              <label htmlFor="formNama" className="label">
                <span className="label-text text-white font-bold">Nama</span>
              </label>
              <input type="text" id="formNama" name="nama" placeholder="Masukkan nama Anda" className="input input-bordered" required />
            </div>
            <div className="form-control bg-transparent border-none p-0">
              <label htmlFor="formNomorTelepon" className="label">
                <span className="label-text text-white font-bold">Nomor Telepon</span>
              </label>
              <input type="text" id="formNomorTelepon" name="noWhatsapp" placeholder="Masukkan Nomor Telephone" className="input input-bordered" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="form-control bg-transparent border-none p-0">
              <label htmlFor="formCabang" className="label">
                <span className="label-text text-white font-bold">Cabang</span>
              </label>
              <select id="formCabang" name="cabang" className="select select-bordered" required onChange={(e) => setSelectedDealer(e.target.value)}>
                <option>Pilih Cabang</option>
                {dealers.map((dealer, index) => (
                  <option key={index} value={dealer.name}>{dealer.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control bg-transparent border-none p-0">
              <label htmlFor="formTenor" className="label">
                <span className="label-text text-white font-bold">Tenor</span>
              </label>
              <input type="text" id="formTenor" name="tenor" placeholder="Masukkan tenor" className="input input-bordered" required />
            </div>
            <div className="form-control bg-transparent border-none p-0">
              <label htmlFor="formDP" className="label">
                <span className="label-text text-white font-bold">DP</span>
              </label>
              <input type="text" id="formDP" name="dp" placeholder="Masukkan DP" className="input input-bordered" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PromoLeasing