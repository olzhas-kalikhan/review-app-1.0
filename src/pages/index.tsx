import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const data = useSession();
  console.log(data);
  // if (!session) return <div>Unauthorized</div>;
  return (
    <div className="text-red-200">
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

export default Home;
