import { Button, Divider, Form, FormProps, Input, Radio } from "antd"
import { Student } from "types/student"


interface StudentFormProps extends FormProps {
  isEditing?: boolean,
  isLoading?: boolean,
  record?: Student | null
}

export const StudentForm = ({ isEditing, isLoading, ...props }: StudentFormProps) => {
  return <Form labelWrap {...props} >
    <Form.Item name="name"
      label="学生名称"
      rules={[{
        required: true,
        message: '请填写学生名称'
      }]}>
      <Input style={{ width: '30rem' }} showCount maxLength={16} id="name" placeholder='最多输入16个字'></Input>
    </Form.Item>

    <Form.Item >
      <Divider />
      <Button loading={isLoading} htmlType='submit' type="primary">
        {isEditing ? '确认' : '新建'}
      </Button>
    </Form.Item>
  </Form>
}