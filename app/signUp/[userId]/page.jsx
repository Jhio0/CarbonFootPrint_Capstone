"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAccount } from '../../account/_services/account-service'; // Adjust path accordingly

export default function AddDetails( {params} ) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();
  const userId = params.userId;

  const updateAccount = async (event) => {
    event.preventDefault();
    try {
      const account = {
        username,
        firstName,
        lastName,
      };
      await addAccount(userId, account);

    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <div className='bg-black w-full h-300 justify-center p-20 m-auto flex flex-col'>
      <div>
        <h1> Add Account Details </h1>
      </div>
      <div>
        <form onSubmit={updateAccount}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">Update Account</button>
        </form>
      </div>
    </div>
  );
}
