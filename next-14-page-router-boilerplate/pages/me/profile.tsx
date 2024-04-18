import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data } = useSession();

  return (
    <div>
      <h1>Profile</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
