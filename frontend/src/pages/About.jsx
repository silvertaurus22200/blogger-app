import { useEffect } from "react";
import {useForm} from "react-hook-form"
useEffect

function About() {
    const {
register,
handleSubmit,
watch,
trigger,
formState: { errors },
} = useForm({
    defaultValues: {
      username: "", // Invalid initially (required field)
      password: "", // Invalid initially (min length)
      confirmPassword: "", // Invalid initially (required)
    }
  });

  useEffect(() => {
    trigger(); // Trigger validation on the first render
  }, [trigger]);

// Watch specific fields
const password = watch("password", "");
const confirmPassword = watch("confirmPassword", "");

// Submit handler
const onSubmit = (data) => {
console.log(data);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username Field */}
      <div>
        <label>Username</label>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default About