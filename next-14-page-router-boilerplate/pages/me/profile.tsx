import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Profile(props: any) {
  const { data } = useSession();
  console.log(props);

  return (
    <div>
      <h1>Profile</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
};
