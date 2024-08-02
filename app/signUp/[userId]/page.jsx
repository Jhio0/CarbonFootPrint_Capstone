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
    <div className='bg-gray-900 w-full justify-center items-center p-20 m-auto flex flex-col'>
      <div className='items-left'>
        <h1 className='text-2xl'> Add Account Details </h1>
      </div>
      <div>
        <form onSubmit={updateAccount} className='flex flex-col'>
          <input
            placeholder="Username"
            value={username}
            className='p-2 m-2 bg-gray-800 rounded-md'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="First Name"
            value={firstName}
            className='p-2 m-2 bg-gray-800 rounded-md'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={lastName}
            className='p-2 m-2 bg-gray-800 rounded-md'
            onChange={(e) => setLastName(e.target.value)}
          />
          <button className="btn bg-gray-800 mt-2" type="submit">Update Account</button>
        </form>
      </div>
    </div>
  );
}
