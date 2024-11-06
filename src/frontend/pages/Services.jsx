import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealers } from "../../states/services/action";
import useInput from "../../hooks/useInput";
import { postAPI } from "../../libs/api";

function Services() {
  const dispatch = useDispatch();
  const { dealers, loading, error } = useSelector((state) => state.service);
  const [name, handleNameChange] = useInput("");
  const [phone, handlePhoneChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [vehicleNumber, handleVehicleNumberChange] = useInput("");
  const [vehicleType, handleVehicleTypeChange] = useInput("");
  const [serviceDate, handleServiceDateChange] = useInput("");
  const [address, handleAddressChange] = useInput("");
  const [inputMessage, handleInputMessageChange] = useInput("");
  const [selectedDealer, handleSelectedDealerChange] = useInput("");

  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  useEffect(() => {
    dispatch(fetchDealers());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dealer = dealers.find((d) => d.id === parseInt(selectedDealer));
    const whatsappNumber = dealer?.whatsapp;

    // Data to be sent to the backend
    const payload = {
      name,
      email,
      telp: phone,
      nopol: vehicleNumber,
      carModel: vehicleType,
      dealer: dealer?.name,
      dateInput: serviceDate,
      inputMessage,
      catMessage: "services",
      address,
      consentStatus: isConsentChecked,
      ipAddress: await fetchIpAddress(),
    };

    try {
      // Post data to /messageuser endpoint
      const response = await postAPI("/messageuser", payload);
      if (response.status === 201) {
        console.log("Data saved successfully");

        // Prepare and open WhatsApp link
        const message = `
          Nama: ${name}
          Telepon: ${phone}
          Email: ${email}
          Nomor Kendaraan: ${vehicleNumber}
          Jenis Kendaraan: ${vehicleType}
          Jadwal Service: ${serviceDate}
          Dealer: ${dealer?.name}
          Alamat: ${address},
          Isi Pesan: ${inputMessage},
        `;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappLink, "_blank");
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const fetchIpAddress = async () => {
    // Fetch user's IP address from an IP service if necessary
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return null;
    }
  };
  const isSubmitDisabled = !(isConsentChecked && isPrivacyChecked);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-hyundai text-2xl font-semibold p-4">
        Form Booking Services
      </h1>
      <div className="max-w-xl mx-auto p-5 shadow-lg shadow-hyundai rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
              placeholder="Nama Anda"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block font-medium text-gray-700"
              >
                Telepon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
                placeholder="0812-3456-7890"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="vehicleNumber"
              className="block font-medium text-gray-700"
            >
              Nomor Kendaraan
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
              placeholder="A 123 AMS"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="vehicleType"
              className="block font-medium text-gray-700"
            >
              Jenis Kendaraan
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
              placeholder="Santa FE"
              value={vehicleType}
              onChange={handleVehicleTypeChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="serviceDate"
              className="block font-medium text-gray-700"
            >
              Jadwal Service
            </label>
            <input
              type="date"
              id="serviceDate"
              name="serviceDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
              value={serviceDate}
              onChange={handleServiceDateChange}
              required
            />
          </div>

          <div>
            <label htmlFor="dealer" className="block font-medium text-gray-700">
              Pilih Dealer
            </label>
            <select
              id="dealer"
              name="dealer"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hyundai focus:border-hyundai rounded-md"
              value={selectedDealer}
              onChange={handleSelectedDealerChange}
              required
            >
              <option value="" disabled>
                - Pilih Dealer -
              </option>
              {dealers.map((dealer) => (
                <option key={dealer.id} value={dealer.id}>
                  {dealer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block font-medium text-gray-700"
            >
              Alamat
            </label>
            <textarea
              id="address"
              name="address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
              placeholder="Alamat lengkap"
              value={address}
              onChange={handleAddressChange}
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block font-medium text-gray-700"
            >
              Pesan
            </label>
            <textarea
              id="inputMessage"
              name="inputMessage"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hyundai focus:border-hyundai"
              placeholder="Isi pesan"
              value={inputMessage}
              onChange={handleInputMessageChange}
              required
            ></textarea>
          </div>
          {/* Input fields (Name, Phone, Email, etc.) */}
          {/* Checkbox 1 */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="consentCheckbox"
              className="mr-2"
              checked={isConsentChecked}
              onChange={(e) => setIsConsentChecked(e.target.checked)}
            />
            <label htmlFor="consentCheckbox" className="text-sm text-gray-700">
              Dengan mencentang kotak ini, Saya memberikan persetujuan kepada
              Dealer dan Distributor untuk mengumpulkan, mengolah, menyimpan,
              mengirim dan memusnahkan data pribadi Saya untuk mendapatkan
              seluruh layanan sesuai yang tercantum pada{" "}
              <a href="/privacy-policy" className="text-red-600 underline">
                Kebijakan Privasi{" "}
              </a>{" "}
              Halaman Situs Website Hyundai-AMS
            </label>
          </div>

          {/* Checkbox 2 */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacyCheckbox"
              className="mr-2"
              checked={isPrivacyChecked}
              onChange={(e) => setIsPrivacyChecked(e.target.checked)}
            />
            <label htmlFor="privacyCheckbox" className="text-sm text-gray-700">
              Saya telah membaca dan menyetujui isi{" "}
              <a href="/privacy-policy" className="text-red-600 underline">
                Kebijakan Privasi{" "}
              </a>{" "}
              Halaman Situs Website Hyundai-AMS ini.
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-hyundai ${
                isSubmitDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Services;
