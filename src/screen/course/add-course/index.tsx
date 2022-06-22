import styled from '@emotion/styled';
import { Button, Form, Input, Radio, InputNumber, message, Divider } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { AxiosError } from 'axios';
import { ContextWrapper } from 'components/lib';
import { Course } from 'types/course';
import { useCreateCourse } from 'utils/course';




export const AddCourseScreen = () => {
  const [form] = useForm<Course>()
  const chargeModeVal = Form.useWatch('chargeMode', form)
  const { mutateAsync: createCourse, isLoading, error, isSuccess } = useCreateCourse()

  const handleSubmit = async (e: Course) => {
    try {
      await createCourse(e)
      form.resetFields()
      message.success('新建成功！')
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message)
      }
    }
  }


  return <ContextWrapper>
    <Form aria-disabled={isLoading} labelWrap labelAlign='left' form={form} onFinish={handleSubmit} >
      <Form.Item name="name"
        label="课程名称"
        rules={[{
          required: true,
          message: '请填写课程名称'
        }]}>
        <Input style={{ width: '30rem' }} showCount maxLength={16} id="name" placeholder='最多输入16个字'></Input>
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
      <Form.Item>
        <Divider />
        <Button loading={isLoading} htmlType='submit' type="primary">
          新建
        </Button>
      </Form.Item>
    </Form>
  </ContextWrapper>
}

