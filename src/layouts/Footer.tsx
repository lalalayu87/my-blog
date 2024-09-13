import Link from "next/link";
import IconGithub from "@/components/icon/Github";

export const Footer = () => {
  return (
    <footer className="mb-16 mt-20 flex flex-col items-center justify-center gap-4 text-center print:hidden">
      <div className="flex justify-center gap-4">
        <Link href="https://github.com/lalalayu87" target="_blank">
          <IconGithub
            className="fill-foreground transition hover:fill-green-600"
            height={30}
            width={30}
            // color="black"
          ></IconGithub>
        </Link>
      </div>
      <div>
        © 2024. <span className="font-semibold">JY YOU</span> all rights
        reserved.
      </div>
    </footer>
  );
};
