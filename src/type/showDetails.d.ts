declare interface IOptionMenu {
  title1: string;
  title2?: string;
  titleCondition?: boolean;
  onPress: () => void;
  icon1: string;
  icon2: string;
  iconCondition: boolean;
}

declare interface IOptionRender {
  onPress: () => void;
  render: JSX.Element;
}
