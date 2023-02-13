import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { isArray } from "utils";

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

export interface customError {
  error_code: number,
  msg: string[],
  request: string
}


export const ErrorBox = ({ error }: {
  error: customError | null
}) => {
  console.log(error);
  if (error?.error_code) {
    return <Typography.Text type="danger">{isArray(error.msg) ? error.msg[0] : error.msg}</Typography.Text>
  }
  return null
}

const FullPage = styled.div`
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
`

export const FullPageLoading = () => <FullPage>
  <Spin size={"large"} />
</FullPage>


export const ContextWrapper = styled.div`
  padding: 4rem;
`
export const ActionViewWrapper = styled.div`
  margin: 0 0 1.6rem 0
`