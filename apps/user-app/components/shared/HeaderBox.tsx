interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
        {title}
        {type === "greeting" && (
          <span className="text-primary">
            &nbsp;{user}
          </span>
        )}
      </h1>
      <p className="text-sm lg:text-base font-normal text-muted-foreground">{subtext}</p>
    </div>
  );
};

export { HeaderBox };
