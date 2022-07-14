import { UserLayout } from "@/components/Layout";
import { useSession } from "next-auth/react";
import React, { ReactElement } from "react";

const Profile = () => {
  const { data, status } = useSession();
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Profile;
