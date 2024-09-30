import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAPI, updateAPI } from '../../../libs/api';
export default function FormEditVehicles() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const getVehiclesByID = async () => {
            try {
                const data = await getAPI(`vehicles/${id}`);
                setModel(data.model);
                setYear(data.year.toString());
                setType(data.type);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        getVehiclesByID();
    }, [id]);

    const editVehicle = async (e) => {
        e.preventDefault();

        const data = {
            model,
            year: parseInt(year, 10),
            type,
        };

        try {
            await updateAPI('vehicles', id, data);
            alert('Vehicle updated successfully');
            navigate('/admin-hyundai/vehicles/');
        } catch (error) {
            console.error('Error updating vehicle:', error);
            alert('Failed to update vehicle: ' + error.response.data.msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Edit Vehicle</h2>
                <form onSubmit={editVehicle}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="model">Model</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
                        <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="EV">EV</option>
                            <option value="SUV">SUV</option>
                            <option value="MPV">MPV</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update Vehicle</button>
                </form>
            </div>
        </div>
    );
}
