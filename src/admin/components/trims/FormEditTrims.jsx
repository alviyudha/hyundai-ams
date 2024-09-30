import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAPI, updateAPI } from '../../../libs/api';

export default function FormEditTrims() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trim, setTrim] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [trimDetail, setTrimDetail] = useState('');
    const [otr, setOtr] = useState('');
    const [otrPrice, setOtrPrice] = useState('');
    const [backgroundImg, setBackgroundImg] = useState(null);
    const [brochure, setBrochure] = useState(null);
    const [warrantyImg, setWarrantyImg] = useState(null);
    const [loading, setLoading] = useState(false); // Status loading

    useEffect(() => {
        const getTrimsByID = async () => {
            try {
                const data = await getAPI(`trims/${id}`);
                setTrim(data.trim);
                setTrimDetail(data.trimDetail);
                setOtr(data.otr);
                setVehicleId(data.vehicleId ? String(data.vehicleId) : '');
                setOtrPrice(data.otrPrice.toString());
                setBackgroundImg(data.urlBackgroundImg);
                setBrochure(data.urlBrochure);
                setWarrantyImg(data.urlWarrantyImg);
            } catch (error) {
                console.error('Error fetching trims:', error);
            }
        };

        getTrimsByID();
    }, [id]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'backgroundImg') setBackgroundImg(files[0]);
        if (name === 'brochure') setBrochure(files[0]);
        if (name === 'warrantyImg') setWarrantyImg(files[0]);
    };

    const editTrim = async (e) => {
        e.preventDefault();
        setLoading(true); // Mengatur status loading menjadi true saat form disubmit
        const data = new FormData();
        data.append('trim', trim);
        data.append('trimDetail', trimDetail);
        data.append('vehicleId', vehicleId);
        data.append('otr', otr);
        data.append('otrPrice', otrPrice);

        if (backgroundImg) data.append('backgroundImg', backgroundImg);
        if (brochure) data.append('brochure', brochure);
        if (warrantyImg) data.append('warrantyImg', warrantyImg);

        try {
            await updateAPI('trims', id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Trim berhasil diperbarui');
            navigate('/admin-hyundai/trims/');
        } catch (error) {
            console.error('Error updating trim:', error);
        } finally {
            setLoading(false); // Mengatur status loading kembali ke false setelah permintaan selesai
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Edit Trim</h2>
                <form onSubmit={editTrim} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="trim">Trim</label>
                        <input
                            type="text"
                            id="trim"
                            name="trim"
                            value={trim}
                            onChange={(e) => setTrim(e.target.value)}
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
                            value={trimDetail}
                            onChange={(e) => setTrimDetail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="otr">OTR</label>
                        <input
                            type="text"
                            id="otr"
                            name="otr"
                            value={otr}
                            onChange={(e) => setOtr(e.target.value)}
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
                            value={otrPrice}
                            onChange={(e) => setOtrPrice(e.target.value)}
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
                        />
                        {backgroundImg && typeof backgroundImg === 'string' && (
                            <div className="mt-2">
                                <img src={backgroundImg} alt="Background" className="w-full h-48 object-cover rounded" />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="brochure">Brochure (PDF)</label>
                        <input
                            type="file"
                            id="brochure"
                            name="brochure"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {brochure && typeof brochure === 'string' && (
                            <div className="mt-2">
                                <a href={brochure} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Brochure</a>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="warrantyImg">Warranty Image</label>
                        <input
                            type="file"
                            id="warrantyImg"
                            name="warrantyImg"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {warrantyImg && typeof warrantyImg === 'string' && (
                            <div className="mt-2">
                                <img src={warrantyImg} alt="Warranty" className="w-full h-48 object-cover rounded" />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Update Trim'}
                    </button>
                </form>
            </div>
        </div>
    );
}
