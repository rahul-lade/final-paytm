import { SendMoneyForm } from "./_components/SendMoneyForm";

const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">P2P Transfer</h1>
        <p className="text-sm text-muted-foreground">Send money to anyone using their phone number</p>
      </div>
      <div className="max-w-lg">
        <SendMoneyForm />
      </div>
    </div>
  );
};

export default Page;