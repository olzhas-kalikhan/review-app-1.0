import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn, getCsrfToken } from "next-auth/react";
import { Context } from "@/server/createContext";
import { FormInput } from "@/components/form";
import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react";
import NextLink from "@/components/NextLink";

const Login = ({ csrfToken }: any) => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const { control, handleSubmit, setError, clearErrors } = useForm<any>({
    defaultValues: { email: "", password: "" },
  });

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
    if (res?.url) router.push(callbackUrl?.[0] || res.url);
  };

  return (
    <Container maxW="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1" size="xl">
          Login
        </Heading>
        <input defaultValue={csrfToken} name="csrfToken" type="hidden" />
        <FormInput control={control} name="email" label="Email" />
        <FormInput
          name="password"
          control={control}
          label="Password"
          type="password"
        />
        <HStack spacing={2}>
          <Button type="submit">Sign In</Button>
          <NextLink href="/Register">
            <Button variant="link">Register</Button>
          </NextLink>
        </HStack>
      </form>
    </Container>
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
