"use client";
import Link from "next/link";

function Page() {
  return (
    <main className="bg-gray-900 mb-4 py-4 px-8 rounded flex">
      <div>
        <Link href="/" className="font-bold">
          Home
        </Link>
        <h1 className="text-white">Carbon Footprint Calculator</h1>
        <iframe
          width="710"
          height="1300"
          frameborder="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          src="https://calculator.carbonfootprint.com/calculator.aspx"
        ></iframe>
      </div>
    </main>
  );
}

export default Page;
