import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { deleteAPI, getAPI } from '../../../libs/api';

export default function SpecificationList() {
  const [specifications, setSpecifications] = useState([]);
  const [error, setError] = useState('');

  // Fetch specifications data from API
  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        const data = await getAPI('modeldetail');
        setSpecifications(data);
      } catch (error) {
        console.error('Error fetching specifications:', error);
        setError('Failed to fetch specifications.');
      }
    };
    fetchSpecifications();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this specification?');
    
    if (confirmed) {
      try {
        await deleteAPI('specification', id);
        setSpecifications(specifications.filter(spec => spec.idSpek !== id));
      } catch (error) {
        console.error('Error deleting specification:', error);
        setError('Failed to delete specification.');
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Specification List</h2>
      <Link to="add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
        Add Data
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Cars</th>
            <th className="px-4 py-2 text-left">Head Title 1</th>
            <th className="px-4 py-2 text-left">Text 1</th>
            <th className="px-4 py-2 text-left">Head Title 2</th>
            <th className="px-4 py-2 text-left">Text 2</th>
            <th className="px-4 py-2 text-left">Head Title 3</th>
            <th className="px-4 py-2 text-left">Text 3</th>
            <th className="px-4 py-2 text-left">Head Title 4</th>
            <th className="px-4 py-2 text-left">Text 4</th>
            <th className="px-4 py-2 text-left">Head Title 5</th>
            <th className="px-4 py-2 text-left">Text 5</th>
            <th className="px-4 py-2 text-left">Image View</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {specifications.map((specification) => (
            <tr key={specification.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{specification.id}</td>
              <td className="border px-4 py-2 whitespace-nowrap">{`${specification.model} - ${specification.trim} (${specification.year})`}</td>
              <td className="border px-4 py-2 font-bold">{specification.headTitle1}</td>
              <td className="border px-4 py-2">{specification.text1}</td>
              <td className="border px-4 py-2 font-bold">{specification.headTitle2}</td>
              <td className="border px-4 py-2">{specification.text2}</td>
              <td className="border px-4 py-2 font-bold">{specification.headTitle3}</td>
              <td className="border px-4 py-2">{specification.text3}</td>
              <td className="border px-4 py-2 font-bold">{specification.headTitle4}</td>
              <td className="border px-4 py-2">{specification.text4}</td>
              <td className="border px-4 py-2 font-bold">{specification.headTitle5}</td>
              <td className="border px-4 py-2">{specification.text5}</td>
              <td className="border px-4 py-2">
                <img src={specification.urlImgView} alt={specification.imgView} className="h-16" />
              </td>
              <td className="border px-4 py-2">
                <Link to={`/admin-hyundai/specifications/edit/${specification.idSpek}`} className="text-blue-500 mr-4">Edit</Link>
                <button onClick={() => handleDelete(specification.idSpek)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
