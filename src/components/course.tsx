import { Button, Form, Input, Radio, InputNumber, Divider, FormProps, message, Drawer } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CourseState, addCourse, editCourse, close } from 'screen/course/course.slice'
import { RootState } from 'store'
import { Course } from 'types/course'
import { useCourseUpdate, useCreateCourse } from 'utils/course'

interface CourseFormProps extends FormProps {
  isLoading?: boolean,
  record?: Course | null
}

export const CourseForm = ({ isLoading, ...props }: CourseFormProps) => {
  const chargeModeVal = Form.useWatch('chargeMode', props.form)

  return <Form labelWrap {...props} >
    <Form.Item name="name"
      label="课程名称"
      rules={[{
        required: true,
        message: '请填写课程名称'
      }]}>
      <Input showCount maxLength={16} id="name" placeholder='最多输入16个字'></Input>
    </Form.Item>
    <Form.Item
      name="teachingMode"
      label="授课方式"
      rules={[{
        required: true,
        message: '请填写授课方式'
      }]}
    >
      <Radio.Group id="teachingMode">
        <Radio value={2}>一对多</Radio>
        <Radio value={1}>一对一</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      label="收费模式"
      rules={[{
        required: true,
        message: '请填写收费模式'
      }]}
      name="chargeMode"
    >
      <Radio.Group id="chargeMode">
        <Radio value={1}>按课时收费</Radio>
        <Radio value={2}>按时间段收费</Radio>
      </Radio.Group>
    </Form.Item>
    {
      chargeModeVal === 1 ? <Form.Item
        rules={[
          {
            required: true,
            message: '请填写收费标准'
          }
        ]}
        label='收费标准(按课时)' name="chargeStandard">
        <InputNumber min={1} id="chargeStandard" addonAfter={'课时/节'} />
      </Form.Item> : null
    }
    <Form.Item >
      <Divider />
      <Button loading={isLoading} htmlType='submit' type="primary">
        确认
      </Button>
    </Form.Item>
  </Form>
}

export const CourseFormModal = () => {
  const dispatch = useDispatch()
  const [form] = useForm()

  const { visible, form: formFields, formType: type } = useSelector<RootState, CourseState>(state => state.course)


  const { mutateAsync: updateCourse } = useCourseUpdate()
  const { mutateAsync: createCourse } = useCreateCourse()

  useEffect(() => {
    form.setFieldsValue(formFields)
  }, [form, formFields])


  const handleSubmit = async (e: Course) => {
    const text = type === 'add' ? '新增成功！' : '编辑成功！'
    try {
      if (type === 'add') {
        await createCourse(e)
      } else {
        await updateCourse({
          id: formFields!.id,
          record: e,
        })
      }
      form.resetFields()
      message.success(text)
      dispatch(close())
    } catch (e) {
      if (e instanceof Error) {
        form.resetFields()
        message.error(e.message)
      }
    }
  }

  const handleClose = () => {
    dispatch(close())
    form.resetFields()
  }

  return <Drawer
    width={430}
    visible={visible}
    title={<DrawerTitle type={type} />}
    onClose={handleClose}
  >
    <CourseForm
      onFinish={handleSubmit}
      style={{ padding: '2rem' }}
      form={form}
    ></CourseForm>
  </Drawer>
}

export const DrawerTitle = ({ type }: { type: any }) => {
  const drawerTitle = type === 'add' ? '新增课程' : '编辑课程'

  return <div style={{
    color: '#001529'
  }}>{drawerTitle}</div>
}