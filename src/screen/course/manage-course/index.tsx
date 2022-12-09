import { useQueryCourse, useCourseDelete } from "utils/course"
import { Table, Popconfirm, message, Row, Col, Button } from 'antd'
import { ColumnProps } from "antd/lib/table"
import { Course } from "types/course"
import { COURSE_MAP } from "utils/constant"
import { useDispatch } from "react-redux"
import { addCourse, editCourse } from "../course.slice"


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
    render(value) {
      return COURSE_MAP['teachingMode'][String(value)]
    },
  },
  {
    title: '收费模式',
    dataIndex: 'chargeMode',
    key: 'chargeMode',
    render(value) {
      return COURSE_MAP['chargeMode'][String(value)]
    }
  },
  {
    title: '收费标准',
    dataIndex: 'chargeStandard',
    key: 'chargeStandard',
    render(value) {
      return `${value}课时/节`
    }
  },
  {
    title: '操作',
    key: 'action',
    render(_, record) {
      return <ActionScreen record={record} />
    }
  }
]

export const ManageCourseScreen = () => {
  const { data: Course, isLoading } = useQueryCourse()

  return <div style={{ padding: '4rem 0' }}>
    <CourseActionView />
    <Table rowKey={'id'} loading={isLoading} dataSource={Course} columns={columns} />
  </div>
}

const CourseActionView = () => {
  const dispatch = useDispatch()

  const handleAddCourse = () => {
    dispatch(addCourse())
  }

  return (
    <div style={{ margin: '0 0 32px 0', }}>
      <Row>
        <Col span={6}>
          <Button onClick={handleAddCourse} type="primary">新增课程</Button>
        </Col>
      </Row>
    </div>)
}


const ActionScreen = ({ record }: { record: Course }) => {
  const { mutateAsync: deleteCourse } = useCourseDelete()
  const dispatch = useDispatch()

  const handleEditCourse = () => {
    dispatch(editCourse(record))
  }

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(record.id)
      message.success('删除成功！')
    } catch (e) {

    }
  }

  return (
    <div>
      <a onClick={handleEditCourse} style={{ marginRight: '2rem' }}>
        编辑
      </a>
      <Popconfirm
        title={`确定要删除课程 ${record.name} 吗?`}
        okText='确定'
        cancelText='取消'
        onConfirm={handleDeleteCourse}
      >
        <a href="#" >删除</a>
      </Popconfirm>
    </div>
  )
}
