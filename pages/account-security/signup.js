import HeadTag from "../../components/HeadTag";
import LoginSignupHeader from "../../components/LoginSignupHeader";
import LoginSignupFooter from "../../components/LoginSignupFooter";
import { FcConferenceCall, FcReadingEbook, FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [client, useClient] = useState(false);
    const [freelancer, useFreelancer] = useState(false);
    const [btnText, useBtnText] = useState("Créer un compte");
    const [clientForm, setClientForm] = useState(false);
    const [freelancerForm, setFreelancerForm] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        country: 'France',
        role: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const ClientHandle = () => {
        useClient(true);
        if (freelancer) useFreelancer(false);
        setFormData({ ...formData, role: 'Entreprise' });
        useBtnText("Rejoindre en tant que Client");
    }

    const FreelancerHandle = () => {
        useFreelancer(true);
        if (client) useClient(false);
        setFormData({ ...formData, role: 'Freelance' });
        useBtnText("Postuler en tant que Freelance");
    }

    const HandleForm = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('/api/users/register', formData);
            console.log('Utilisateur enregistré:', response.data);
            setSuccess('Compte crée avec succès!');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors.map(err => err.msg).join(', '));
            } else {
                setError('Une erreur est survenue');
            }
        }
    }

    const HandleConditinForm = () => {
        if (client) {
            setClientForm(true);
            if (freelancerForm) setFreelancerForm(false);
        }

        if (freelancer) {
            setFreelancerForm(true);
            if (clientForm) setClientForm(false);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleGoogleSignup = () => {
        window.location.href = "http://localhost:3001/auth/google";
    }

    const handleLinkedInSignup = () => {
        window.location.href = "http://localhost:3001/auth/linkedin";
    }

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Créer un compte - Brenda" />
            <LoginSignupHeader />
            <main>
                {(clientForm || freelancerForm) ? null : (
                    <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 md:flex md:justify-center">
                        <div className="sm:border border-gray-300 rounded-xl">
                            <div className="lg:px-24 md:px-20 sm:px-10 sm:pt-10 pb-10 flex flex-col justify-center md:items-center">
                                <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl text-center">
                                    Rejoindre en tant que client ou freelance
                                </h2>
                                <div className="flex md:flex-row flex-col items-center md:space-x-8 md:space-y-0 space-y-5 mt-10">
                                    <div className={`${client ? "bg-[#0C4A6E]" : "bg-[#e5ecea] hover:bg-[#d1dfdb]"} rounded-xl py-7 sm:px-8 px-5 flex flex-col items-center space-y-4 md:max-w-[17rem] md:w-auto w-full cursor-pointer transition`} onClick={ClientHandle}>
                                        <div><FcConferenceCall className="text-5xl" /></div>
                                        <div>
                                            <h4 className={`${client ? "text-[#e5ecea]" : "text-zinc-800"} font-semibold text-lg text-center`}>
                                                Je suis un client, embauchant pour un projet
                                            </h4>
                                        </div>
                                    </div>
                                    <div className={`${freelancer ? "bg-[#0C4A6E]" : "bg-[#e5ecea] hover:bg-[#d1dfdb]"} rounded-xl py-7 sm:px-8 px-5 flex flex-col items-center space-y-4 md:max-w-[17rem] md:w-auto w-full cursor-pointer transition`} onClick={FreelancerHandle}>
                                        <div><FcReadingEbook className="text-5xl" /></div>
                                        <div>
                                            <h4 className={`${freelancer ? "text-[#e5ecea]" : "text-zinc-800"} font-semibold text-lg text-center`}>
                                                Je suis un freelance, à la recherche de travail
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <button className={`${(freelancer || client) ? "bg-[#0C4A6E] hover:bg-[#18465f] text-[#e5ecea]" : "bg-[#e5ecea] hover:bg-[#d1dfdb] text-gray-500"} py-2 md:px-20 px-3 mt-10 rounded-full font-semibold transition md:w-auto w-full`} onClick={HandleConditinForm}>
                                    {btnText}
                                </button>
                                <div className="mt-7">
                                    <p className="text-zinc-800 text-center">
                                        Vous avez déjà un compte?
                                        <Link href="/account-security/login">
                                            <a className="font-semibold text-blue-700 hover:underline"> Connexion </a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {clientForm && (
                    <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 md:flex md:justify-center">
                        <div className="sm:border border-gray-300 rounded-xl">
                            <div className="sm:px-7 sm:pt-10 pb-10 flex flex-col justify-center md:items-center">
                                <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl text-center">
                                    Inscrivez-vous pour trouver votre futur travail !
                                </h2>
                                <button className="w-full py-2 px-3 bg-white border border-gray-600 rounded-full font-semibold text-zinc-800 transition hover:bg-gray-100 flex items-center justify-center mt-5" onClick={handleGoogleSignup}>
                                    <FcGoogle className="text-xl mr-2" />
                                    Continuer avec Google
                                </button>
                                <button className="w-full py-2 px-3 bg-sky-600 rounded-full font-semibold text-white transition hover:bg-sky-700 flex items-center justify-center mt-5" onClick={handleLinkedInSignup}>
                                    <FaLinkedin className="text-xl mr-2" />
                                    Continuer avec LinkedIn
                                </button>
                                <div className="flex w-full mt-5 items-center space-x-2">
                                    <span className="border-b w-full border-gray-300 mt-1"></span>
                                    <span className="text-zinc-600">ou</span>
                                    <span className="border-b w-full border-gray-300 mt-1"></span>
                                </div>
                                <form className="mt-5 space-y-5 sm:w-auto md:w-[42rem] w-full" onSubmit={HandleForm}>
                                    <div className="grid md:grid-cols-2 md:gap-x-5 gap-y-5">
                                        <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                            <input
                                                type="text"
                                                name="firstname"
                                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                                placeholder="Prénom"
                                                onChange={handleChange}
                                                value={formData.firstname}
                                            />
                                        </div>
                                        <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                            <input
                                                type="text"
                                                name="lastname"
                                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                                placeholder="Nom"
                                                onChange={handleChange}
                                                value={formData.lastname}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                        <input
                                            type="email"
                                            name="email"
                                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                        <input
                                            type="password"
                                            name="password"
                                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                            placeholder="Mot de passe"
                                            onChange={handleChange}
                                            value={formData.password}
                                        />
                                    </div>
                                    <select id="Country" name="country" className="bg-transparent border-2 border-gray-300 text-zinc-800 text-sm rounded-lg focus:border-[#b8d8d4fd] block w-full px-3 py-2 cursor-pointer font-semibold" onChange={handleChange} value={formData.country}>
                                        <option value="Armenia">Arménie</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australie</option>
                                        <option value="Austria">Autriche</option>
                                        <option value="Azerbaijan">Azerbaïdjan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbade</option>
                                        <option value="United States">États-Unis</option>
                                        <option value="Palestine">Palestine</option>
                                        <option value="Estonia">Estonie</option>
                                        <option value="Singapore">Singapour</option>
                                        <option value="Japan">Japon</option>
                                        <option value="South Korea">Corée du Sud</option>
                                        <option value="France">France</option>
                                        <option value="Netherlands">Pays-Bas</option>
                                        <option value="Denmark">Danemark</option>
                                        <option value="Norway">Norvège</option>
                                        <option value="Finland">Finlande</option>
                                    </select>
                                    <div className="flex space-x-3 my-4">
                                        <input id="sendmeemail" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer mt-[2px]" />
                                        <label htmlFor="sendmeemail" className="text-zinc-800 cursor-pointer text-sm">
                                            Envoyez-moi des emails avec des conseils sur la façon de trouver des talents correspondant à mes besoins.
                                        </label>
                                    </div>
                                    <div className="flex space-x-3 my-4">
                                        <input id="yes" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer mt-[2px]" />
                                        <label htmlFor="yes" className="text-zinc-800 cursor-pointer text-sm">
                                            Oui, je comprends et j'accepte les Conditions d'utilisation de CyberConnect, y compris l'Accord utilisateur et la Politique de confidentialité.
                                        </label>
                                    </div>
                                    <button className="w-full py-2 px-3 bg-[#0C4A6E] rounded-full font-semibold text-white transition hover:bg-[#18465f]" type="submit">
                                        Créer un compte
                                    </button>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                                <div className="mt-7">
                                    <p className="text-zinc-800 text-center">
                                        Vous avez déjà un compte?
                                        <Link href="/account-security/login">
                                            <a className="font-semibold text-blue-700 hover:underline"> Connexion </a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {freelancerForm && (
                    <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 md:flex md:justify-center">
                        <div className="sm:border border-gray-300 rounded-xl">
                            <div className="sm:px-7 sm:pt-10 pb-10 flex flex-col justify-center md:items-center">
                                <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl text-center">
                                    Inscrivez-vous pour trouver votre futur travail !
                                </h2>
                                <button className="w-full py-2 px-3 bg-white border border-gray-600 rounded-full font-semibold text-zinc-800 transition hover:bg-gray-100 flex items-center justify-center mt-5" onClick={handleGoogleSignup}>
                                    <FcGoogle className="text-xl mr-2" />
                                    Continuer avec Google
                                </button>
                                <button className="w-full py-2 px-3 bg-sky-600 rounded-full font-semibold text-white transition hover:bg-sky-700 flex items-center justify-center mt-5" onClick={handleLinkedInSignup}>
                                    <FaLinkedin className="text-xl mr-2" />
                                    Continuer avec LinkedIn
                                </button>
                                <div className="flex w-full mt-5 items-center space-x-2">
                                    <span className="border-b w-full border-gray-300 mt-1"></span>
                                    <span className="text-zinc-600">ou</span>
                                    <span className="border-b w-full border-gray-300 mt-1"></span>
                                </div>
                                <form className="mt-5 space-y-5 sm:w-auto md:w-[42rem] w-full" onSubmit={HandleForm}>
                                    <div className="grid md:grid-cols-2 md:gap-x-5 gap-y-5">
                                        <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                            <input
                                                type="text"
                                                name="firstname"
                                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                                placeholder="Prénom"
                                                onChange={handleChange}
                                                value={formData.firstname}
                                            />
                                        </div>
                                        <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                            <input
                                                type="text"
                                                name="lastname"
                                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                                placeholder="Nom"
                                                onChange={handleChange}
                                                value={formData.lastname}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                        <input
                                            type="email"
                                            name="email"
                                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                        <input
                                            type="password"
                                            name="password"
                                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700"
                                            placeholder="Mot de passe"
                                            onChange={handleChange}
                                            value={formData.password}
                                        />
                                    </div>
                                    <select id="Country" name="country" className="bg-transparent border-2 border-gray-300 text-zinc-800 text-sm rounded-lg focus:border-[#b8d8d4fd] block w-full px-3 py-2 cursor-pointer font-semibold" onChange={handleChange} value={formData.country}>
                                        <option value="Armenia">Arménie</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australie</option>
                                        <option value="Austria">Autriche</option>
                                        <option value="Azerbaijan">Azerbaïdjan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbade</option>
                                        <option value="United States">États-Unis</option>
                                        <option value="Palestine">Palestine</option>
                                        <option value="Estonia">Estonie</option>
                                        <option value="Singapore">Singapour</option>
                                        <option value="Japan">Japon</option>
                                        <option value="South Korea">Corée du Sud</option>
                                        <option value="France">France</option>
                                        <option value="Netherlands">Pays-Bas</option>
                                        <option value="Denmark">Danemark</option>
                                        <option value="Norway">Norvège</option>
                                        <option value="Finland">Finlande</option>
                                    </select>
                                    <div className="flex space-x-3 my-4">
                                        <input id="sendmeemail" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer mt-[2px]" />
                                        <label htmlFor="sendmeemail" className="text-zinc-800 cursor-pointer text-sm">
                                            Envoyez-moi des emails avec des conseils sur la façon de trouver des talents correspondant à mes besoins.
                                        </label>
                                    </div>
                                    <div className="flex space-x-3 my-4">
                                        <input id="yes" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer mt-[2px]" />
                                        <label htmlFor="yes" className="text-zinc-800 cursor-pointer text-sm">
                                            Oui, je comprends et j'accepte les Conditions d'utilisation de Brenda, y compris l'Accord utilisateur et la Politique de confidentialité.
                                        </label>
                                    </div>
                                    <button className="w-full py-2 px-3 bg-[#0C4A6E] rounded-full font-semibold text-white transition hover:bg-[#18465f]" type="submit">
                                        Créer un compte
                                    </button>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                                <div className="mt-7">
                                    <p className="text-zinc-800 text-center">
                                        Vous avez déjà un compte?
                                        <Link href="/account-security/login">
                                            <a className="font-semibold text-blue-700 hover:underline"> Connexion </a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <LoginSignupFooter />
        </div>
    );
}

export default SignUp;
