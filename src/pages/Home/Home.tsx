import { useEffect } from "react";
import { toast } from "sonner";

function Home() {
  useEffect(() => {}, []);
  return (
    <div>
      <h1 onClick={() => toast("My first toast")}>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
