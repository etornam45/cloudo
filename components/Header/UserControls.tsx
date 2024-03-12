import { Button } from "../ui/button";

export default function UserControls() {
  return <div className="flex gap-4">
    <Button variant={"outline"}>Sign In</Button>
    <Button>Sign Up</Button>
  </div>;
}