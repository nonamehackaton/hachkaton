import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axiosInstance';
import HeadTag from '../../components/HeadTag';
import LoginSignupHeader from '../../components/LoginSignupHeader';
import { BsFillPersonFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import LoginSignupFooter from '../../components/LoginSignupFooter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeadTag title="Log In - Brenda"/>
      <LoginSignupHeader/>
      <main>
        <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 sm:flex sm:justify-center">
          <div className="sm:border border-gray-300 rounded-xl">
            <div className="sm:px-24 sm:pt-7 pb-7 flex flex-col justify-center items-center">
              <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl">
                Log in to Brenda
              </h2>
              <form className="mt-7 space-y-4 sm:w-auto w-full" onSubmit={handleForm}>
                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg sm:w-[25rem] items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3]">
                  <BsFillPersonFill className="text-lg text-zinc-700 cursor-pointer hover:text-zinc-500"/>
                  <input 
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent mx-3 text-zinc-700"
                    placeholder="Username or Email"
                  />
                </div>
                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg sm:w-[25rem] items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3]">
                  <BsFillPersonFill className="text-lg text-zinc-700 cursor-pointer hover:text-zinc-500"/>
                  <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent mx-3 text-zinc-700"
                    placeholder="Password"
                  />
                </div>
                <button className="w-full py-2 px-3 bg-[#0C4A6E] rounded-full font-semibold text-white transition hover:bg-[#18465f]" type="submit">
                  Continue with Email
                </button>
              </form>
              <div className="flex w-full mt-5 items-center space-x-2">
                <span className="border-b w-full border-gray-300 mt-1"></span>
                <span className="text-zinc-600">or</span>
                <span className="border-b w-full border-gray-300 mt-1"></span>
              </div>
              <button className="w-full py-2 px-3 bg-white border border-gray-600 rounded-full font-semibold text-zinc-800 transition hover:bg-gray-100 flex items-center justify-center mt-5">
                 <FcGoogle className="text-xl mr-2"/> 
                 Continue with Google
              </button>
              <button className="w-full py-2 px-3 bg-sky-600 rounded-full font-semibold text-white transition hover:bg-sky-700 flex items-center justify-center mt-5">
                 <FaLinkedin className="text-xl mr-2"/> 
                 Continue with Linkdin
              </button>
            </div>
            <div className="lg:px-24 py-7 flex flex-col justify-center items-center border-t border-gray-300 mt-7">
              <div className="flex w-full justify-center items-center">
                <span className="text-zinc-600"> Don't have an Brenda Account? </span>
              </div>
              <div className="sm:w-auto w-full">
                <button className="w-full py-2 sm:px-20 px-3 border border-[#0C4A6E] rounded-full font-semibold text-[#0C4A6E] transition hover:border-[#0C4A6E] hover:text-[#0C4A6E] flex items-center justify-center mt-5" onClick={() => router.push("/account-security/signup")}>
                  sign Up
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LoginSignupFooter/>
    </div>
  );
};

export default Login;
