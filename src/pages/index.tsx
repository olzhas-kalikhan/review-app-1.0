import { UserLayout } from "@/components/Layout";
import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { ReactElement } from "react";

const Home = () => {
  const { data, status } = useSession();

  if (status === "unauthenticated") return <div>Unauthorized</div>;
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </button>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
export default Home;
