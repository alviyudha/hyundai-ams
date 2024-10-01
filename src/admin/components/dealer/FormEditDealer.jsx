import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI, updateAPI } from "../../../libs/api";
export default function FormEditDealer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [urlFacebook, setUrlFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [urlMaps, setUrlMaps] = useState("");
  const [urlInstagram, setUrlInstagram] = useState("");
  const [imgDealer, setImgDealer] = useState(null);
  const [urlImageDealer, setUrlImageDealer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const data = await getAPI(`dealer/${id}`);
        setName(data.name);
        setAddress(data.address);
        setUrlFacebook(data.urlFacebook);
        setWhatsapp(data.whatsapp);
        setUrlMaps(data.urlMaps);
        setUrlInstagram(data.urlInstagram);
        setUrlImageDealer(data.urlImageDealer);
      } catch (error) {
        console.error("Error fetching dealer:", error);
      }
    };

    fetchDealer();
  }, [id]);

  const handleFileChange = (e) => {
    setImgDealer(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("urlFacebook", urlFacebook);
    formData.append("whatsapp", whatsapp);
    formData.append("urlMaps", urlMaps);
    formData.append("urlInstagram", urlInstagram);
    if (imgDealer) {
      formData.append("imgDealer", imgDealer);
    }

    try {
      await updateAPI("dealer", id, formData);
      alert("Dealer updated successfully");
      navigate("/admin-hyundai/dealers");
    } catch (error) {
      setErrorMsg(error.response.data.msg);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Dealer</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="urlFacebook"
            >
              Facebook URL
            </label>
            <input
              type="url"
              id="urlFacebook"
              name="urlFacebook"
              value={urlFacebook}
              onChange={(e) => setUrlFacebook(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="whatsapp"
            >
              WhatsApp
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="urlMaps"
            >
              Maps URL
            </label>
            <input
              type="url"
              id="urlMaps"
              name="urlMaps"
              value={urlMaps}
              onChange={(e) => setUrlMaps(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="urlInstagram"
            >
              Instagram URL
            </label>
            <input
              type="url"
              id="urlInstagram"
              name="urlInstagram"
              value={urlInstagram}
              onChange={(e) => setUrlInstagram(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imgDealer"
            >
              Dealer Image
            </label>
            <input
              type="file"
              id="imgDealer"
              name="imgDealer"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
            {urlImageDealer && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current Image:</p>
                <img
                  src={urlImageDealer}
                  alt="Dealer"
                  className="mt-2 rounded-md shadow-md max-w-xs"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Dealer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
