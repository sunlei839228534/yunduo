import { useForm } from "antd/lib/form/Form"
import { ContextWrapper } from "components/lib"
import { StudentForm } from "components/student"
import { Student } from "types/student"

export const AddStudentScreen = () => {
  const [form] = useForm<Student>()

  const handleSubmit = async (e: Student) => {

  }

  return <ContextWrapper>
    <StudentForm form={form} onFinish={handleSubmit} ></StudentForm>
  </ContextWrapper>
}