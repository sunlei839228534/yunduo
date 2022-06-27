import { message } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { ContextWrapper } from 'components/lib';
import { Course } from 'types/course';
import { useCreateCourse } from 'utils/course';
import { CourseForm } from 'components/course'


export const AddCourseScreen = () => {
  const [form] = useForm<Course>()
  const { mutateAsync: createCourse, isLoading } = useCreateCourse()

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
    <CourseForm form={form} onFinish={handleSubmit} isLoading={isLoading} />
  </ContextWrapper>
}

