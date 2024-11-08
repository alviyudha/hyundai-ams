import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealers, fetchVehicles } from "../../states/testDrive/action";
import { postAPI } from "../../libs/api";
import useInput from "../../hooks/useInput";

export default function TestDrive() {
  const dispatch = useDispatch();
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [selectedDealer, handleSelectedDealerChange] = useInput("");
  const { dealers, vehicles, loadingDealers, loadingVehicles, error } =
    useSelector((state) => state.testDrive);

  useEffect(() => {
    dispatch(fetchDealers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dealer = dealers.find(
      (d) => d.id === parseInt(formData.get("dealer"))
    );
    const whatsappNumber = dealer?.whatsapp;

    // Membuat payload dengan data dari form
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      telp: formData.get("phone"),
      nopol: "",
      carModel: formData.get("vehicleType"),
      dealer: dealer?.name,
      dateInput: formData.get("serviceDate"),
      inputMessage: "",
      catMessage: "test-drive",
      address: formData.get("address"),
      consentStatus: isConsentChecked,
      ipAddress: await fetchIpAddress(),
    };

    try {
      const response = await postAPI("/messageuser", payload);
      if (response) {
        if (whatsappNumber) {
          const message = `
            Nama: ${formData.get("name")}
            Telepon: ${formData.get("phone")}
            Email: ${formData.get("email")}
            Jenis Kendaraan: ${formData.get("vehicleType")}
            Jadwal Service: ${formData.get("serviceDate")}
            Dealer: ${dealer?.name}
            Alamat: ${formData.get("address")}
          `;
  
          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappLink, "_blank");
        } else {
          console.error("Dealer WhatsApp number not found.");
        }
      }
    } catch (error) {
      console.error("Error submitting the form: ", error);
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

  if (loadingDealers || loadingVehicles) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <h1 className="text-center text-hyundai text-2xl font-semibold p-4">
        Form Test Drive
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
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="vehicleType"
              className="block font-medium text-gray-700"
            >
              Jenis Kendaraan
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hyundai focus:border-hyundai rounded-md uppercase"
              required
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.model}>
                  {vehicle.model}
                </option>
              ))}
            </select>
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
      Kebijakan Privasi </a> Halaman Situs Website Hyundai-AMS
    
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
              Saya telah membaca dan menyetujui isi <a href="/privacy-policy" className="text-red-600 underline">
              Kebijakan Privasi </a> Halaman
              Situs Website Hyundai-AMS ini.
            </label>
          </div>

          {/* Submit Button */}
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
