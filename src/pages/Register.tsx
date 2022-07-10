import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>();

  const { mutate, error: apiError } = trpc.useMutation(
    ["users.register-user"],
    {
      onError: () => {},
      onSuccess: () => {
        router.push("/login");
      },
    }
  );
  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <form
        className="flex flex-col bg-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Register</h1>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <input {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <span>{apiError?.message}</span>
        <input type="submit" />
      </form>
      <Link href="/login">Login</Link>
    </>
  );
};

export default Register;
