import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../../../libs/api';

export default function FormAddImgSlide() {
    const [imageslide, setImageSlide] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImageSlide(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', imageslide);

        try {
            const response = await postAPI('imgslide', formData, {
                'Content-Type': 'multipart/form-data',
            });
            console.log('Image slide created successfully', response.data);
            navigate('/admin-hyundai/image-slide');
        } catch (error) {
            console.error('Error creating image slide:', error.response);
            if (error.response && error.response.data && error.response.data.msg) {
                setErrorMsg(error.response.data.msg);
            } else {
                setErrorMsg('Failed to create image slide.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Add Image Slide</h2>
                {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="image">Image Slide Home</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Add Image</button>
                </form>
            </div>
        </div>
    );
}
