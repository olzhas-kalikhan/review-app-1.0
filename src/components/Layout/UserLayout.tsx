import { Button, Heading, HStack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import NextLink from "../NextLink";

interface UserLayoutProps {
  children: any;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { data, status } = useSession();
  if (status === "unauthenticated") return null;

  return (
    <>
      <nav>
        <HStack spacing={4}>
          <Heading>{data?.user?.name}</Heading>
          <NextLink href="/">
            <Text>Home</Text>
          </NextLink>
          <NextLink href="/Profile">
            <Text>Profile</Text>
          </NextLink>
          <Button variant="outline" onClick={() => signOut()}>
            <Text>Sign out</Text>
          </Button>
        </HStack>
      </nav>
      {children}
    </>
  );
};
export default UserLayout;
