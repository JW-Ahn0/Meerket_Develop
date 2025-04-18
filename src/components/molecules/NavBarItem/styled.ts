import styled from '@emotion/styled';
import type { NavBarItemType } from '.';

export const NavBarItemWrapper: ReturnType<
  typeof styled.div<{ state: NavBarItemType }>
> = styled.div<{ state: NavBarItemType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  color: ${({ state, theme }) =>
    state === 'active' ? theme.colors.black : theme.colors.grey400};
  cursor: pointer;
`;
