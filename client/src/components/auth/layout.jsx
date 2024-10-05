import { Outlet } from "react-router-dom";
import loginvideo from "../../assets/loginvideo.mp4"; // Assuming the file is mp4

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Video section */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-orange-600">
            Empowering Artisians
            
          </h1>
          <video
            className="w-full h-full max-w-md"
            src={loginvideo}
            autoPlay
            loop
            muted
          />
        </div>
      </div>

      {/* Outlet for Auth pages */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

