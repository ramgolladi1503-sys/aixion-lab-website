import Link from "next/link";
import { Opening } from "@/components/compositions";
export default function NotFound() {
  return (
    <>
      <Opening
        label="404"
        title="This page isn’t here."
        copy="The site has a new structure. Find the work, research and story from the navigation."
      />
      <div className="shell next-project">
        <Link className="button" href="/">
          Return home →
        </Link>
      </div>
    </>
  );
}
