import { HeaderBox } from "@/components/shared/HeaderBox";
import { SendMoneyForm } from "./_components/SendMoneyForm";

const Page = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeaderBox title="P2P Transfer" subtext="Send money to anyone using their phone number" />
      <div className="flex justify-center">
        <SendMoneyForm />
      </div>
    </div>
  );
};

export default Page;