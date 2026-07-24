import { useState } from "react";
import { Label as ShadcnLabel } from "../components/ui/label";
import { Input as ShadcnInput } from "../components/ui/input";
import { Button as ShadcnButton } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username == "admin" && password == "admin") {
            login("token_ABC")
            navigate("/products")
        } else {
            setErrorMsg("Wrong username/password!")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <form onSubmit={handleLogin} className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded shadow space-y-4">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <div>
                    <ShadcnLabel htmlFor="username">Username</ShadcnLabel>
                    <ShadcnInput
                        id="username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    ></ShadcnInput>
                </div>
                <div>
                <ShadcnLabel htmlFor="email">Email</ShadcnLabel>
                    <ShadcnInput
                        id="email"
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></ShadcnInput>
                </div>
                <div>
                    <ShadcnLabel htmlFor="password">Password</ShadcnLabel>
                    <ShadcnInput
                        id="password"
                        type="text"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></ShadcnInput>
                </div>
                {errorMsg && (
                    <p>{errorMsg}</p>
                )}
                <ShadcnButton type="submit" className="w-full">Login</ShadcnButton>
            </form>
        </div>
    )
}