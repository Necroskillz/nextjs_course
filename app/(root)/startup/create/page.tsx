import React from "react";
import StartupForm from "@/components/StartupForm";

const CreateStartupPage = () => {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default CreateStartupPage;
