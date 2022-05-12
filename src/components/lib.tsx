import styled from "@emotion/styled";
import { Button } from "antd";

export const Row = styled.div<{ gap?: number | boolean, between?: boolean, marginBottom?: number }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom ? props.marginBottom + 'rem' : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`