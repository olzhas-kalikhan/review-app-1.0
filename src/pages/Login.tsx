import { CreateUserInput } from "@/models/user";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onError: () => {},
    onSuccess: () => {
      router.push("/");
    },
  });
  const onSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <>
      <form
        className="flex flex-col bg-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Login</h1>
        {/* register your input into the hook by invoking the "register" function */}

        <input {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <Link href="/login">Register</Link>
    </>
  );
};

export default Login;
