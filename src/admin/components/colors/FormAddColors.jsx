import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { getAPI, postAPI } from '../../../libs/api';

export default function AddColors() {
  const [descColor, setDescColor] = useState('');
  const [trimId, setTrimId] = useState('');
  const [colorsImage, setColorsImage] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [color, setColor] = useColor("#561ECB");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await getAPI('modeltrim');
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleFileChange = (e) => {
    setColorsImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('backgroundColor', color.hex);
    formData.append('descColor', descColor);
    formData.append('trimId', trimId);
    formData.append('colorsImage', colorsImage);

    try {
        const response = await postAPI('color', formData, {
            'Content-Type': 'multipart/form-data',
        });
        console.log('Color created successfully', response);
        navigate('/admin-hyundai/colors');
    } catch (error) {
        console.error('Error creating color:', error);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-3 bg-gray-100" style={{ backgroundColor: color.hex }}>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add Color</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="backgroundColor">
              Background Color
            </label>
            <ColorPicker color={color} onChange={setColor} />
            <input
              type="text"
              id="backgroundColor"
              name="backgroundColor"
              value={color.hex}
              onChange={() => {}} 
              className="w-full px-3 py-2 border rounded mt-2"
              disabled 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="descColor">Description</label>
            <input
              type="text"
              id="descColor"
              name="descColor"
              value={descColor}
              onChange={(e) => setDescColor(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
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
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.Cars} ({vehicle.year})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="colorsImage">Color Image</label>
            <input
              type="file"
              id="colorsImage"
              name="colorsImage"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Add Color</button>
        </form>
      </div>
    </div>
  );
}
