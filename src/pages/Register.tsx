import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import NextLink from "@/components/NextLink";
import { FormInput } from "@/components/form";
import { Heading, Button, Container, Box, HStack } from "@chakra-ui/react";

const Register = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<any>({
    defaultValues: { email: "", name: "", password: "" },
  });

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
    <Container maxW="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1" size="xl">
          Register
        </Heading>
        <FormInput control={control} name="name" label="Name" />
        <FormInput control={control} name="email" label="Email" />
        <FormInput control={control} name="password" label="Password" />
        <HStack spacing={2}>
          <Button type="submit">Sign Up</Button>
          <NextLink href="/Login">
            <Button variant="link">Login</Button>
          </NextLink>
        </HStack>
      </form>
    </Container>
  );
};

export default Register;
