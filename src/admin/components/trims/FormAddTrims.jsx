import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI, postAPI } from '../../../libs/api';

export default function FormAddTrims() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        trim: '',
        trimDetail: '',
        vehicleId: '', 
        otr: '',
        otrPrice: '',
        backgroundImg: null,
        brochure: null,
        warrantyImg: null
    });
    const [vehicles, setVehicles] = useState([]); 
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getAPI('vehicles');
                setVehicles(data);
            } catch (error) {
                console.error('Failed to load vehicles:', error);
            }
        };
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        try {
            const response = await postAPI('trims', formDataToSend, {
                'Content-Type': 'multipart/form-data',
            });
    
            if (response.status === 201) {
                alert('Vehicle added successfully');
                navigate("/admin-hyundai/trims");
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.msg || 'Error occurred while adding vehicle');
        } finally {
            setLoading(false); // Set loading to false after the request is finished
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Add Trim</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="vehicleId">Model</label>
                        <select
                            id="vehicleId"
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Select Model</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="trim">Trim</label>
                        <input
                            type="text"
                            id="trim"
                            name="trim"
                            value={formData.trim}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="trimDetail">Trim Detail</label>
                        <input
                            type="text"
                            id="trimDetail"
                            name="trimDetail"
                            value={formData.trimDetail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="otr">OTR</label>
                        <input
                            type="text"
                            id="otr"
                            name="otr"
                            value={formData.otr}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="otrPrice">OTR Price</label>
                        <input
                            type="number"
                            id="otrPrice"
                            name="otrPrice"
                            value={formData.otrPrice}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="backgroundImg">Background Image</label>
                        <input
                            type="file"
                            id="backgroundImg"
                            name="backgroundImg"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="warrantyImg">Warranty Image</label>
                        <input
                            type="file"
                            id="warrantyImg"
                            name="warrantyImg"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="brochure">Brochure (PDF)</label>
                        <input
                            type="file"
                            id="brochure"
                            name="brochure"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Add Vehicle'}
                    </button>
                </form>
            </div>
        </div>
    );
}
