'use client'
import React, {useState, useEffect} from 'react';

export default function Test1() {
    const [report, setReport] = useState([
        
    ]);

    const [newReport, setNewReport] = useState({title: '', description:''});
    const addReport = async (e) => {
        e.preventDefault();
        if (newReport.title !=='' && newReport.description !=='') {
            await addDoc(collection(db, 'reporttests'), {
                title: newReport.title,
                description: newReport.description,
            });
            setNewReport({title:'',description:''});
        }
    }

    useEffect(() => {
        const q = query(collection(db, 'reporttests'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let reportsArr = [];
    
          querySnapshot.forEach((doc) => {
            reportsArr.push({ ...doc.data(), id: doc.id });
          });
          setReport(reportsArr);
          return () => unsubscribe();
        });
      }, []);

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, 'items', id));
      };

    return (
        <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
          <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
            <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
            <div className='bg-slate-800 p-4 rounded-lg'>
              <form className='grid grid-cols-6 items-center text-black'>
                <input
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, Title: e.target.value })}
                  className='col-span-3 p-3 border'
                  type='text'
                  placeholder='Enter Item'
                />
                <input
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({ ...newReport, description: e.target.value })
                  }
                  className='col-span-2 p-3 border mx-3'
                  type='number'
                  placeholder='Enter $'
                />
                <button
                  onClick={addReport}
                  className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
                  type='submit'
                >
                  +
                </button>
              </form>
              <ul>
                {report.map((report, id) => (
                  <li
                    key={id}
                    className='my-4 w-full flex justify-between bg-slate-950'
                  >
                    <div className='p-4 w-full flex justify-between'>
                      <span className='capitalize'>{report.title}</span>
                      <span>${report.description}</span>
                    </div>
                    <button
                      onClick={() => deleteItem(item.report)}
                      className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      );
};