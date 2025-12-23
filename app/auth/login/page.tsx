import { LoginForm } from "@/components/auth/login-form";

import Image from "next/image";
import ShoeLogo from "@/public/shoe-icon1.png";

const LoginPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary flex size-6 items-center justify-center rounded-md">
            {/* <GalleryVerticalEnd className="size-4" /> */}
            <Image src={ShoeLogo} alt="Logo" width={24} height={24} />
          </div>
          Shoemerce Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
