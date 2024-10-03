import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteAPI, getAPI } from '../../../libs/api';

export default function VehicleList() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAPI('vehicles')
            .then(data => {
                setVehicles(data);
            })
            .catch(error => {
                console.log('Failed to load data', error);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await deleteAPI('vehicles', id);
                alert('Vehicle deleted successfully');
                setVehicles(prev => prev.filter(vehicle => vehicle.id !== id)); 
            } catch (error) {
                console.error('Error deleting vehicle:', error);
                alert(error.response.data.msg);
            }
        }
    };

    return (
        <div className=" mx-auto ps-4">
            <div className="flex justify-end mb-4">
                <Link to="add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                    Add Data
                </Link>
            </div>
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Vehicle List</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Model
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Year
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{vehicle.model}</td>
                                <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{vehicle.year}</td>
                                <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{vehicle.type}</td>
                                <td className="px-6 py-4 whitespace-no-wrap flex space-x-2">
                                    <Link
                                        to={`/admin-hyundai/vehicles/edit/${vehicle.id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
