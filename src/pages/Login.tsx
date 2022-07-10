import { loginUserSchema } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn, getCsrfToken } from "next-auth/react";
import { Context } from "@/server/createContext";

const Login = ({ csrfToken }: any) => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (values: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      ...values,
      callbackUrl: `${window.location.origin}`,
    });
    if (res?.error) {
      setError("email", { message: res.error });
    } else {
      clearErrors("email");
    }
    if (res?.url) router.push(res.url + callbackUrl);
    // setSubmitting(false);
  };

  return (
    <>
      <form
        className="flex flex-col bg-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Login</h1>
        {/* register your input into the hook by invoking the "register" function */}
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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

export async function getServerSideProps(context: Context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
