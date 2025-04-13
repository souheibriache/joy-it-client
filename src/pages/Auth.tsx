import { useState } from "react";
import logo from "../assets/logo.svg";
import { Facebook, Instagram, Linkedin, Lock, Mail } from "lucide-react";
import { useLoginUser } from "../utils/api/user-api";
import { Button } from "../components/ui/button";
import TopBar from "../components/TopBar";

type Props = {};
const Auth = ({}: Props) => {
  const { loginUserRequest, isLoading } = useLoginUser();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUserRequest(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="overflow-hidden relative h-[calc(100vh-60px)] w-full">
        <div className="container mx-auto flex flex-row h-full">
          <div className="flex flex-col justify-evenly flex-1 items-center p-40 py-32 relative -translate-x-24 ">
            <img src={logo} className="h-32" />
            <h1 className="text-3xl font-bold text-primary text-nowrap">
              Rejoignez-nous en quelques clics !
            </h1>
            <p className="text-xl text-center text-gray-900 w-3/4">
              Inscrivez-vous ou connectez-vous pour organiser facilement des
              activités et renforcer la cohésion de votre équipe.
            </p>

            <div className="absolute shadow-xl z-0 shadow-black/20 h-[140%] w-[140%] right-5 rounded-full"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-24 gap-10 h-full">
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col items-center gap-10 h-full"
            >
              <h1 className="text-2xl font-bold">Connectez-vous</h1>

              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
                  <Mail />
                  <input
                    type="email"
                    name="login"
                    placeholder="Mail"
                    value={formData.login}
                    onChange={handleChange}
                    className="border-none outline-none w-full"
                    required
                  />
                </div>

                <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
                  <Lock />
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-none outline-none w-full"
                    required
                  />
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <input
                    type="checkbox"
                    className="accent-primary h-5 w-5 outline-none"
                  />
                  <p>Se souvenir de moi</p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="font-semibold z-20 bg-primary hover:bg-secondary text-lg text-white p-5 px-10"
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>{" "}
            <div className="flex flex-col gap-5 items-center">
              <h1 className="text-2xl font-bold">Contactez-nous</h1>
              <div className="flex flex-row gap-5">
                <a href="https://instagram.com" target="_blank">
                  <Instagram
                    size={30}
                    className="cursor-pointer hover:text-primary"
                  />
                </a>
                <a href="https://linkedin.com" target="_blank">
                  <Linkedin
                    size={30}
                    className="cursor-pointer hover:text-primary"
                  />
                </a>
                <a href="https://facebook.com" target="_blank">
                  <Facebook
                    size={30}
                    className="cursor-pointer hover:text-primary"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-16 -translate-x-16">
          <div className="relative">
            <div className="absolute h-10 w-10 rounded-full bg-lightred -translate-y-36 translate-x-24"></div>
            <div className="absolute h-20 w-20 rounded-full bg-lightred -translate-y-24 translate-x-36"></div>
            <div className="absolute h-36 w-36 rounded-full bg-lightred -translate-y-4 translate-x-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
