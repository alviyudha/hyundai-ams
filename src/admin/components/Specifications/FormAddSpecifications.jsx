import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI, postAPI } from '../../../libs/api';

export default function FormAddSpecification() {
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
  const [vehicleId, setVehicleId] = useState('');
  const [trimId, setTrimId] = useState('');
  const [imgView, setImgView] = useState(null);
  const [trims, setTrims] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrims = async () => {
      try {
        const data = await getAPI('modeltrim');
        setTrims(data);
      } catch (error) {
        console.error('Error fetching trims:', error);
        setErrorMsg(error.response.data.msg);
      }
    };
    fetchTrims();
  }, []);

  const handleFileChange = (e) => {
    setImgView(e.target.files[0]);
  };

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
    formData.append('vehicleId', vehicleId);
    formData.append('trimId', trimId);
    formData.append('imgView', imgView);

    try {
      const response = await postAPI('specification', formData, {
        'Content-Type': 'multipart/form-data',
      });
      console.log('Specification created successfully', response.data);
      navigate('/admin-hyundai/specifications');
    } catch (error) {
      console.error('Error creating specification:', error);
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add Specification</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="trimId">Trim</label>
            <select
              id="trimId"
              name="trimId"
              value={trimId}
              onChange={(e) => setTrimId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="" disabled>Select a trim</option>
              {trims.map((trim) => (
                <option key={trim.id} value={trim.id}>
                  {trim.Cars}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle1">Head Title 1</label>
            <input
              type="text"
              id="headTitle1"
              name="headTitle1"
              value={headTitle1}
              onChange={(e) => setHeadTitle1(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text1">Text 1</label>
            <input
              type="text"
              id="text1"
              name="text1"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle2">Head Title 2</label>
            <input
              type="text"
              id="headTitle2"
              name="headTitle2"
              value={headTitle2}
              onChange={(e) => setHeadTitle2(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text2">Text 2</label>
            <input
              type="text"
              id="text2"
              name="text2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle3">Head Title 3</label>
            <input
              type="text"
              id="headTitle3"
              name="headTitle3"
              value={headTitle3}
              onChange={(e) => setHeadTitle3(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text3">Text 3</label>
            <input
              type="text"
              id="text3"
              name="text3"
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle4">Head Title 4</label>
            <input
              type="text"
              id="headTitle4"
              name="headTitle4"
              value={headTitle4}
              onChange={(e) => setHeadTitle4(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text4">Text 4</label>
            <input
              type="text"
              id="text4"
              name="text4"
              value={text4}
              onChange={(e) => setText4(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="headTitle5">Head Title 5</label>
            <input
              type="text"
              id="headTitle5"
              name="headTitle5"
              value={headTitle5}
              onChange={(e) => setHeadTitle5(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="text5">Text 5</label>
            <input
              type="text"
              id="text5"
              name="text5"
              value={text5}
              onChange={(e) => setText5(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imgView">Image</label>
            <input
              type="file"
              id="imgView"
              name="imgView"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Specification
          </button>
        </form>
      </div>
    </div>
  );
}
