import styled, { css } from 'styled-components';

import { centerImage, robotoMedium, centerBoth } from '~/renderer/mixins';
import { transparency, icons, PRIMARY_COLOR } from '~/renderer/constants';

export const StyledNavDrawerItem = styled.div`
  width: calc(100% - 16px);
  height: 40px;
  margin: 4px auto;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  will-change: background-color;
  transition: 0.15s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    opacity: 0.15;
    overflow: hidden;
    background-color: ${PRIMARY_COLOR};
    ${centerBoth()};
  }

  ${({ selected }: { selected: boolean }) => css`
    pointer-events: ${selected ? 'none' : 'auto'};

    &::before {
      display: ${selected ? 'block' : 'none'};
    }
  `};
`;

interface IIconProps {
  selected: boolean;
  icon: any;
}

export const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  ${centerImage('24px', 'auto')};

  ${({ selected, icon }: IIconProps) => css`
    background-color: ${selected ? PRIMARY_COLOR : '#000'};
    mask-image: url(${icon});
    opacity: ${selected
      ? transparency.icons.active
      : transparency.icons.inactive};
  `};
`;

export const StyledLabel = styled.div`
  font-size: 14px;
  margin-left: 32px;
  ${robotoMedium()};

  ${({ selected }: { selected: boolean }) => css`
    color: ${selected ? PRIMARY_COLOR : '#000'};
  `};
`;