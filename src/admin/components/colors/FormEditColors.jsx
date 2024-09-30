import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAPI, updateAPI } from '../../../libs/api';

export default function FormEditColors({ backgroundColor, setBackgroundColor }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState({
    backgroundColor: '',
    descColor: '',
    trimId: '',
    colorsImage: null,
  });
  const [vehicles, setVehicles] = useState([]);
  const [trimId, setTrimId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const colorData = await getAPI(`color/${id}`);
        setColor(colorData);
        setTrimId(colorData.trimId);
      } catch (error) {
        console.error('Error fetching color:', error);
        setError('Error fetching color data.');
      }
    };

    const fetchVehicles = async () => {
      try {
        const vehiclesData = await getAPI('vehicles');
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setError('Error fetching vehicle data.');
      }
    };

    fetchColor();
    fetchVehicles();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setColor({ ...color, [name]: files[0] });
    } else {
      setColor({ ...color, [name]: value });
      if (name === 'backgroundColor') {
        setBackgroundColor(value);
      }
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('backgroundColor', color.backgroundColor);
  formData.append('descColor', color.descColor);
  formData.append('trimId', trimId);
  if (color.colorsImage) {
    formData.append('colorsImage', color.colorsImage);
  }

  try {
    await updateAPI('color', id, formData, {
      'Content-Type': 'multipart/form-data',
    });
    navigate('/admin-hyundai/colors');
  } catch (error) {
    console.error('Error updating color:', error);
    setError('Failed to update color.');
  }
};

  useEffect(() => {
    setColor((prevColor) => ({
      ...prevColor,
      backgroundColor,
    }));
  }, [backgroundColor]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Color</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="backgroundColor">Background Color</label>
            <input
              type="text"
              id="backgroundColor"
              name="backgroundColor"
              value={color.backgroundColor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="descColor">Description</label>
            <input
              type="text"
              id="descColor"
              name="descColor"
              value={color.descColor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="trimId">Vehicle</label>
            <select
              id="trimId"
              name="trimId"
              value={trimId}
              onChange={(e) => setTrimId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              disabled
              hidden
            >
              <option value="" disabled>Select a vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model} ({vehicle.year})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="colorsImage">Colors Image</label>
            <input
              type="file"
              id="colorsImage"
              name="colorsImage"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update Color</button>
        </form>
      </div>
    </div>
  );
}
