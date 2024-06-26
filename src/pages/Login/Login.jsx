import React, { useContext } from "react"
import img from "../../assets/images/login/login.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import axios from "axios"

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        // console.log(email, password)

        signIn(email, password)
            .then((r) => {
                const loggedInUser = r.user
                console.log(loggedInUser)
                const user = { email }
                // get access token
                axios
                    .post("http://localhost:5000/jwt", user, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.success) navigate(location?.state ? location?.state : "/")
                    })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <h1 className="text-3xl font-bold">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            New to Car Doctors?
                            <Link to="/sign-up" className="text-orange-600 font-bold">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
