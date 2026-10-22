"use client";
import { useEffect, useState } from "react";

function Cookies() {
  const [displayNotice, setDisplayNotice] = useState(false);

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem("firstVisitToken");
      if (!token) {
        setDisplayNotice(true);
      }
    }
    const time = setTimeout(checkToken, 1000 * 25);
    return () => clearTimeout(time);
  }, []);
  function acceptCookie() {
    localStorage.setItem("firstVisitToken", "My first visit.");
    setDisplayNotice(false);
  }
  function declineCookie() {
    localStorage.clear();
    setDisplayNotice(false);
  }
  return (
    <section className="fixed bottom-4 -translate-x-1/2 left-1/2 z-50">
      {displayNotice && (
        <div className="w-sm lg:w-xl bg-black p-4 rounded text-sm mx-auto">
          <p className="mb-2 text-neutral-300 ">
            Our website uses cookies to make you have the best and smooth user
            experience on our website.
          </p>
          <div className="flex gap-2 mt-4">
            <button
              title="Accept cookies"
              onClick={acceptCookie}
              className="bg-black border flex gap-2 items-center text-white px-4 py-2 hover:scale-x-105 trans rounded  cursor-pointer lg:hover:bg-black/90"
            >
              
              Accept
            </button>
            <button
              title="Reject cookies"
              onClick={declineCookie}
              className=" px-4 py-2 flex gap-2 items-center border-accent text-accent border rounded text-sm cursor-pointer lg:hover:scale-x-105 trans"
            >
             Reject
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cookies;
