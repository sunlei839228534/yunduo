import { Button, Divider, Form, FormProps, Input, InputNumber, message, Modal, Select, Typography } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useCreateClass } from "api/class"
import { useQueryCourse } from "api/course"
import { useQueryTeacher } from "api/teacher"
import { FormInstance } from "rc-field-form"
import { useDispatch, useSelector } from "react-redux"
import { ClassState, modalClose } from "screen/class/class.slice"
import { RootState } from "store"
import { Class } from "types/class"
import { Course } from "types/course"
import { User } from "types/user"

const { Title } = Typography
const { TextArea } = Input

interface ClassFormProps extends FormProps<Class> {
  handleSubmit: (e: Class) => void
}

export const ClassModal = () => {
  const dispatch = useDispatch()
  const [form] = useForm()
  const { visible } = useSelector<RootState, ClassState>(state => state.class)
  const { mutateAsync: createClass } = useCreateClass()

  const handleModalClose = () => {
    dispatch(modalClose())
    form.resetFields()
  }

  const handleSubmit = async (e: Class) => {
    try {
      await createClass(e)
      handleModalClose()
      message.success('创建成功！')
    } catch (e) {
      form.resetFields()
    }
  }


  return (
    <Modal
      title='新建班级'
      visible={visible}
      onCancel={handleModalClose}
      footer={null}
    >
      <ClassForm form={form} handleSubmit={handleSubmit} />
    </Modal>
  )
}


const ClassForm = ({ handleSubmit, form }: ClassFormProps) => {
  const { data: Courses } = useQueryCourse()
  const { data: Teachers } = useQueryTeacher()

  return <Form
    onFinish={handleSubmit}
    form={form}
    labelWrap
    initialValues={{
      maxPerson: 30
    }}
  >
    <Title level={5}>基本信息</Title>
    <Form.Item name="name" label="班级名称" required>
      <Input id="name" placeholder="请输入班级名称" />
    </Form.Item>
    <Form.Item name="teacher" label="主讲老师" required>
      <Select id="teacher"
        options={Teachers?.map((teacher: User['user']) => ({
          label: teacher.nickname,
          value: teacher.id
        }))}></Select>
    </Form.Item>
    <Form.Item name="course" label="课程" required>
      <Select id="course"
        options={Courses?.map((course: Course) => ({
          label: course.name,
          value: course.id
        }))}
      ></Select>
    </Form.Item>
    <Form.Item name="maxPerson" label="人数上限" required>
      <InputNumber id="maxPerson" />
    </Form.Item>
    <Form.Item name="notes" label="备注">
      <TextArea id="notes" rows={3} />
    </Form.Item>
    <Form.Item style={{ textAlign: 'center' }}>
      <Divider />
      <Button htmlType='submit' type="primary">
        创建班级
      </Button>
    </Form.Item>
  </Form >
}