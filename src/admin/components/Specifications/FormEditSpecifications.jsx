import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAPI, updateAPI } from '../../../libs/api';

export default function FormEditSpecifications() {
  const [headTitle1, setHeadTitle1] = useState('');
  const [text1, setText1] = useState('');
  const [headTitle2, setHeadTitle2] = useState('');
  const [text2, setText2] = useState('');
  const [headTitle3, setHeadTitle3] = useState('');
  const [text3, setText3] = useState('');
  const [headTitle4, setHeadTitle4] = useState('');
  const [text4, setText4] = useState('');
  const [headTitle5, setHeadTitle5] = useState('');
  const [text5, setText5] = useState('');
  const [trimId, setTrimId] = useState('');
  const [imgView, setImgView] = useState(null);
  const [imgUrl, setImgUrl] = useState(null); 
  const [vehicles, setVehicles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImgView(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0])); 
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAPI(`vehicles/${id}`);
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setErrorMsg('Failed to fetch vehicles.');
      }
    };

    const fetchSpecificationById = async () => {
      try {
        const data = await getAPI(`specification/${id}`);
        setHeadTitle1(data.headTitle1);
        setText1(data.text1);
        setHeadTitle2(data.headTitle2);
        setText2(data.text2);
        setHeadTitle3(data.headTitle3);
        setText3(data.text3);
        setHeadTitle4(data.headTitle4);
        setText4(data.text4);
        setHeadTitle5(data.headTitle5);
        setText5(data.text5);
        setTrimId(data.trimId);
        setImgUrl(data.urlImgView); 
      } catch (error) {
        console.error('Error fetching specification:', error);
        setErrorMsg(error.response.data.msg);
      }
    };

    fetchVehicles();
    fetchSpecificationById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('headTitle1', headTitle1);
    formData.append('text1', text1);
    formData.append('headTitle2', headTitle2);
    formData.append('text2', text2);
    formData.append('headTitle3', headTitle3);
    formData.append('text3', text3);
    formData.append('headTitle4', headTitle4);
    formData.append('text4', text4);
    formData.append('headTitle5', headTitle5);
    formData.append('text5', text5);
    formData.append('trimId', trimId);
    if (imgView) {
      formData.append('imgView', imgView);
    }

    try {
      const response = await updateAPI('specification', id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Specification updated successfully', response);
      navigate('/admin-hyundai/specifications');
    } catch (error) {
      console.error('Error updating specification:', error);
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <div className="container min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Edit Specification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
  
          {/* Head Title 1 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle1">Head Title 1</label>
            <input
              type="text"
              id="headTitle1"
              name="headTitle1"
              value={headTitle1}
              onChange={(e) => setHeadTitle1(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
  
          {/* Text 1 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text1">Text 1</label>
            <input
              id="text1"
              name="text1"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            />
          </div>
  
          {/* Head Title 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle2">Head Title 2</label>
            <input
              type="text"
              id="headTitle2"
              name="headTitle2"
              value={headTitle2}
              onChange={(e) => setHeadTitle2(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
  
          {/* Text 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text2">Text 2</label>
            <input
              id="text2"
              name="text2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            />
          </div>
  
          {/* Head Title 3 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle3">Head Title 3</label>
            <input
              type="text"
              id="headTitle3"
              name="headTitle3"
              value={headTitle3}
              onChange={(e) => setHeadTitle3(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
  
          {/* Text 3 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text3">Text 3</label>
            <input
              id="text3"
              name="text3"
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            />
          </div>
  
          {/* Head Title 4 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle4">Head Title 4</label>
            <input
              type="text"
              id="headTitle4"
              name="headTitle4"
              value={headTitle4}
              onChange={(e) => setHeadTitle4(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
  
          {/* Text 4 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text4">Text 4</label>
            <input
              id="text4"
              name="text4"
              value={text4}
              onChange={(e) => setText4(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            />
          </div>
  
          {/* Head Title 5 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle5">Head Title 5</label>
            <input
              type="text"
              id="headTitle5"
              name="headTitle5"
              value={headTitle5}
              onChange={(e) => setHeadTitle5(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
  
          {/* Text 5 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text5">Text 5</label>
            <input
              id="text5"
              name="text5"
              value={text5}
              onChange={(e) => setText5(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            />
          </div>
  
          {/* Vehicle Select */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="trimId">Vehicle</label>
            <select
              id="trimId"
              name="trimId"
              value={trimId}
              onChange={(e) => setTrimId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              disabled
            >
              <option value="" disabled>Select a vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.trimId}>
                  {vehicle.model} ({vehicle.year})
                </option>
              ))}
            </select>
          </div>
  
          {/* Image View */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imgView">Image View</label>
            <input
              type="file"
              id="imgView"
              name="imgView"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {imgUrl && typeof imgUrl === 'string' && (
              <div className="mt-2">
                <img src={imgUrl} alt="Preview" className="w-full h-48 object-cover rounded" />
              </div>
            )}
          </div>
  
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
            Update Specification
          </button>
        </form>
      </div>
    </div>
  );
}
