import { LoginPanel } from "@/components/LoginPanel";
import { ShowcasePanel } from "@/components/ShowcasePanel";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <LoginPanel />
        <div className="relative hidden min-h-screen lg:block">
          <ShowcasePanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
