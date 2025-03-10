import { type IIconProps, IconWrapper } from "../styled";
import { FiPercent } from "@react-icons/all-files/fi/FiPercent";

/**
 * 판매 아이콘
 */
export const SellIcon = ({ size = "m" }: IIconProps) => {
  return (
    <IconWrapper size={size}>
      <FiPercent />
    </IconWrapper>
  );
};
