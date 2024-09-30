import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDealers } from '../../states/services/action';
import useInput from '../../hooks/useInput';

function Services() {
  const dispatch = useDispatch();
  const { dealers, loading, error } = useSelector((state) => state.service);
  const [name, handleNameChange] = useInput('');
  const [phone, handlePhoneChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [vehicleNumber, handleVehicleNumberChange] = useInput('');
  const [vehicleType, handleVehicleTypeChange] = useInput('Ioniq 6');
  const [serviceDate, handleServiceDateChange] = useInput('');
  const [address, handleAddressChange] = useInput('');
  const [selectedDealer, handleSelectedDealerChange] = useInput('');

  useEffect(() => {
    dispatch(fetchDealers());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dealer = dealers.find(d => d.id === parseInt(selectedDealer));
    const whatsappNumber = dealer?.whatsapp;

    if (whatsappNumber) {
      const message = `
        Nama: ${name}
        Telepon: ${phone}
        Email: ${email}
        Nomor Kendaraan: ${vehicleNumber}
        Jenis Kendaraan: ${vehicleType}
        Jadwal Service: ${serviceDate}
        Dealer: ${dealer.name}
        Alamat: ${address}
      `;

      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    } else {
      console.error('Dealer WhatsApp number not found.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className='text-center text-hyundai text-2xl font-semibold p-4'>Form Booking Services</h1>
      <div className="max-w-xl mx-auto p-5 shadow-lg shadow-hyundai rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">Nama</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai" placeholder="Nama Anda" value={name} onChange={handleNameChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block font-medium text-gray-700">Telepon</label>
              <input type="tel" id="phone" name="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai" placeholder="0812-3456-7890" value={phone} onChange={handlePhoneChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai" placeholder="you@example.com" value={email} onChange={handleEmailChange} required />
            </div>
          </div>

          <div>
            <label htmlFor="vehicleNumber" className="block font-medium text-gray-700">Nomor Kendaraan</label>
            <input type="text" id="vehicleNumber" name="vehicleNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai" placeholder="B 1234 XYZ" value={vehicleNumber} onChange={handleVehicleNumberChange} required />
          </div>

          <div>
            <label htmlFor="vehicleType" className="block font-medium text-gray-700">Jenis Kendaraan</label>
            <select id="vehicleType" name="vehicleType" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hyundai focus:border-hyundai rounded-md" value={vehicleType} onChange={handleVehicleTypeChange} required>
              <option value="Ioniq 6">Ioniq 6</option>
              <option value="Ioniq 5">Ioniq 5</option>
              <option value="Santa Fe">Santa Fe</option>
            </select>
          </div>

          <div>
            <label htmlFor="serviceDate" className="block font-medium text-gray-700">Jadwal Service</label>
            <input type="date" id="serviceDate" name="serviceDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai" value={serviceDate} onChange={handleServiceDateChange} required />
          </div>

          <div>
            <label htmlFor="dealer" className="block font-medium text-gray-700">Pilih Dealer</label>
            <select id="dealer" name="dealer" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hyundai focus:border-hyundai rounded-md" value={selectedDealer} onChange={handleSelectedDealerChange} required>
              {dealers.map(dealer => (
                <option key={dealer.id} value={dealer.id}>{dealer.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="address" className="block font-medium text-gray-700">Alamat</label>
            <textarea id="address" name="address" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai" placeholder="Alamat lengkap" value={address} onChange={handleAddressChange} required></textarea>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-hyundai hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Services;
