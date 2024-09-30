import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../../../features/authSlice'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch  = useDispatch()
    const navigate = useNavigate()

    const {user,isError,isSuccess,isLoading,message} = useSelector(
    (state) => state.auth
    )

    useEffect(() => {
    if (user || isSuccess){
      navigate("/admin-hyundai/dashboard")
    }
    dispatch(reset())
    }, [user,isSuccess, dispatch, navigate])

    const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({username,password}))
  }
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:ml-12">
          <h1 className="text-5xl font-bold text-white">Login now!</h1>
          <p className="py-6 text-white">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-white w-full max-w-sm shadow-2xl rounded-lg p-8">
          <form className="card-body space-y-6" onSubmit={Auth}>
          {isError && <p className="text-red-500 text-center mb-4">{message}</p>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User name</span>
              </label>
              <input type="text" 
              placeholder="username" 
              className="input input-bordered border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password"
              placeholder="password" 
              className="input input-bordered border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-indigo-500 hover:underline">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
              {isLoading ? "Loading..." : "Login"}

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
