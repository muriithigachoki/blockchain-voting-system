import { useForm } from "react-hook-form";
import "./login.css";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema, { formData } from "../../zodSchemas/LoginSchema";
import loginService from "../../servicers/loginService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = (data: formData) => {
    loginService
      .create(data)
      .then((res) => {
        navigate("/");
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("county", res.data.county);
        localStorage.setItem("constituency", res.data.constituency);
        localStorage.setItem("constituency", res.data.constituency);
        localStorage.setItem("token", res.data.token);
        alert(`${res.statusText}`);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit((data) => handleLogin(data))}>
        <h2>Login</h2>
        <div className="mb-4">
          <label htmlFor="Password" className="form-label">
            name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form-control"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
