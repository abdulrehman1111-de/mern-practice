import { useState } from "react";
import Button from "./Button";

export default function NewsletterForm({ onToast }) {
  const [email, setEmail] = useState("");

  const join = () => {
    if (/^\S+@\S+\.\S+$/.test(email)) {
      onToast("Welcome, your first coffee is on us");
      setEmail("");
    } else onToast("Please enter a valid email");
  };

  return (
    <div className="nl">
      <input
        type="email"
        placeholder="Your email"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && join()}
      />
      <Button onClick={join}>Subscribe</Button>
    </div>
  );
}
