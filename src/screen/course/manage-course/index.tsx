import { ContextWrapper } from "components/lib"
import { useQueryCourse } from "utils/course"
import { Table } from 'antd'
import { ColumnProps } from "antd/lib/table"
import { Course } from "types/course"


const columns: ColumnProps<Course>[] = [
  {
    title: '课程名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '授课方式',
    dataIndex: 'teachingMode',
    key: 'teachingMode',
  },
  {
    title: '收费模式',
    dataIndex: 'chargeMode',
    key: 'chargeMode'
  },
  {
    title: '收费标准',
    dataIndex: 'chargeStandard',
    key: 'chargeStandard'
  }
]
export const ManageCourseScreen = () => {
  const { data: Course, isLoading } = useQueryCourse()


  return <div style={{ padding: '4rem 0' }}>
    <Table rowKey={'id'} loading={isLoading} dataSource={Course} columns={columns} />
  </div>
}
