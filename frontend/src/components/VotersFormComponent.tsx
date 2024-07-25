import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import voterSchema, { formData } from "../zodSchemas/registerForm";
import votersService from "../servicers/presidentService";
import "../pages/AuthPages/login.css";

const VotersFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formData>({ resolver: zodResolver(voterSchema) });

  const onSubmit = (data: formData) => {
    votersService
      .create(data)
      .then((res) => alert(`voter created successfully: ${res}`))
      .catch((error) => alert(`failed to create a voter.${error}`));

    reset();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <h2>Register</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            UserName
          </label>
          <input
            {...register("username")}
            id="username"
            type="text"
            className="form-control"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="form-control"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="county" className="form-label">
            County
          </label>
          <input
            {...register("county")}
            id="county"
            type="county"
            className="form-control"
          />
          {errors.county && (
            <p className="text-danger">{errors.county.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="constituency" className="form-label">
            Constituency
          </label>
          <input
            {...register("constituency")}
            id="constituency"
            type="county"
            className="form-control"
          />
          {errors.county && (
            <p className="text-danger">{errors.county.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form-control"
          />
          {errors.county && (
            <p className="text-danger">{errors.county.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          register
        </button>
      </form>
    </div>
  );
};

export default VotersFormComponent;
