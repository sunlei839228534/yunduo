import { Button, Divider, Drawer, Form, FormProps, Input, message, Radio } from "antd"
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { useForm } from "antd/lib/form/Form"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close, StudentState } from "screen/student/student.slice"
import { RootState } from "store"
import { Student } from "types/student"
import { useCreateStudent, useStudentUpdate } from "api/student"


interface StudentFormProps extends FormProps {
  isLoading?: boolean,
  record?: Student | null
}

export const StudentForm = ({ isLoading, ...props }: StudentFormProps) => <Form labelWrap {...props}>
  <Form.Item name="name"
    label="学员名称"
    rules={[{
      required: true,
      message: '请填写学生名称'
    }]}>
    <Input style={{ width: '25rem' }} showCount maxLength={16} id="name" placeholder='最多输入16个字'></Input>
  </Form.Item>
  <Form.Item name="status"
    label="学员状态"
  >
    <Radio.Group id="status">
      <Radio value={0}>未结业</Radio>
      <Radio value={1}>已结业</Radio>
    </Radio.Group>
  </Form.Item>
  <Form.Item name="code"
    label="学员编号"
  >
    <Input style={{ width: '30rem' }} id="code"></Input>
  </Form.Item>
  <Form.Item name="mobile"
    label="联系方式"
  >
    <Input style={{ width: '30rem' }} id="mobile"></Input>
  </Form.Item>
  <Form.Item name="wechat"
    label="学员微信"
  >
    <Input style={{ width: '30rem' }} id="wechat"></Input>
  </Form.Item>
  <Form.Item
    name="sex"
    label="学员性别"
  >
    <Radio.Group id="sex">
      <Radio value={0}>男<ManOutlined /></Radio>
      <Radio value={1}>女<WomanOutlined /></Radio>
    </Radio.Group>
  </Form.Item>
  <Form.Item>
    <Divider />
    <Button loading={isLoading} htmlType='submit' type="primary">
      确认
    </Button>
  </Form.Item>
</Form>

export const StudentFormModal = () => {
  const dispatch = useDispatch()
  const [form] = useForm()

  const { visible, form: formFields, formType: type } = useSelector<RootState, StudentState>(state => state.student)

  const { mutateAsync: createStudent } = useCreateStudent()
  const { mutateAsync: updateStudent } = useStudentUpdate()

  useEffect(() => {
    form.setFieldsValue(formFields)
  }, [form, formFields])

  const handleClose = () => {
    dispatch(close())
    form.resetFields()
  }

  const handleSubmit = async (e: Student) => {
    const text = type === 'add' ? '新增成功！' : '编辑成功！'
    try {
      if (type === 'add') {
        await createStudent(e)
      } else {
        await updateStudent({
          id: formFields!.id,
          record: e,
        })
      }
      form.resetFields()
      message.success(text)
      dispatch(close())
    } catch (e) {
      if (e instanceof Error) {
        // message.error(e.message)
      }
    }
  }

  return <Drawer
    width={430}
    visible={visible}
    onClose={handleClose}
    title={<DrawerTitle type={type} />}
  >
    <StudentForm
      onFinish={handleSubmit}
      style={{ padding: '2rem' }}
      form={form}
    ></StudentForm>
  </Drawer>
}

export const DrawerTitle = ({ type }: { type: any }) => {
  const drawerTitle = type === 'add' ? '新增学员' : '编辑学员'

  return <div style={{
    color: '#001529'
  }}>{drawerTitle}</div>
}