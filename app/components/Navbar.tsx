import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MobileMenu } from "./MobileMenu";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);
  return (
    
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Marshal<span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {user ? (
          <h1> Welcome {user.given_name} </h1>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary">
              <RegisterLink>Register</RegisterLink>
            </Button>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
