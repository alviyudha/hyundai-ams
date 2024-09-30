import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../../../libs/api';

export default function FormAddDealer() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        urlFacebook: '',
        whatsapp: '',
        urlMaps: '',
        urlInstagram: '',
        imgDealer: null,
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [whatsappError, setWhatsappError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'whatsapp') {
            validateWhatsapp(value);
        }
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] });
    };

    const validateWhatsapp = (number) => {
        const whatsappPattern = /^\+62/;
        if (!whatsappPattern.test(number)) {
            setWhatsappError('WhatsApp number must start with +62.');
        } else {
            setWhatsappError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (whatsappError) {
            alert(whatsappError);
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await postAPI('dealer', formDataToSend, {
               
                    'Content-Type': 'multipart/form-data',
              
            });

            if (response.status === 200) {
                alert('Dealer added successfully');
                navigate("/admin-hyundai/dealers");
            }
        } catch (error) {
            setErrorMsg(error.response.data.msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Add Dealer</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name Dealer</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded uppercase"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="urlFacebook">Facebook URL</label>
                        <input
                            type="text"
                            id="urlFacebook"
                            name="urlFacebook"
                            value={formData.urlFacebook}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="whatsapp">WhatsApp Number</label>
                        <input
                            type="text"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                        {whatsappError && <p className="text-red-500 mt-2">{whatsappError}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="urlMaps">Google Maps URL</label>
                        <input
                            type="text"
                            id="urlMaps"
                            name="urlMaps"
                            value={formData.urlMaps}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="urlInstagram">Instagram URL</label>
                        <input
                            type="text"
                            id="urlInstagram"
                            name="urlInstagram"
                            value={formData.urlInstagram}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="imgDealer">Dealer Image</label>
                        <input
                            type="file"
                            id="imgDealer"
                            name="imgDealer"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Add Dealer</button>
                </form>
            </div>
        </div>
    );
}
