type Props = {
  label: string;
  value?: string;
};

const CardDetailItem = (props: Props) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">{props.label}</h4>
      <p className="text-sm text-muted-foreground">{props.value}</p>
    </div>
  );
};

export default CardDetailItem;
