import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";
import {getUserByUsername} from "@repo/db";

interface IDashboardPageProps {
  params: {
    username: string;
  };
}
export default async function Dashboard({ params }: IDashboardPageProps) {
  const session = await getServerSession(authOptions);
  const user = await getUserByUsername({username : params.username});
  const userId = user?.id as string;
  const res = await fetch(`http://localhost:3000/api/collections/?userId=${userId}`,{method : "GET"});
  const collections = await res.json();
  return (
    <>
      <div>This is your dashboard {params.username}</div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(user,null,2)}</pre>
      <pre>{JSON.stringify(collections.collections,null,2)}</pre>
    </>
  );
}
