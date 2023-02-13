import { Button, Col, Row, Table } from "antd"
import { ColumnProps } from "antd/lib/table"
import { ActionViewWrapper } from "components/lib"
import { useDispatch } from "react-redux"
import { Class } from "types/class"
import { modalOpen } from "../class.slice"

//班级名称 课程  老师 人数/上限 备注

const columns: ColumnProps<Class>[] = [
  {
    title: '班级名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '课程',
    dataIndex: 'course',
    key: 'course'
  },
  {
    title: '老师',
    dataIndex: 'teacher',
    key: 'teacher'
  }, {
    title: '人数/上限',
    render(value, record, index) {
      return 'value'
    }
  }, {
    title: '备注',
    dataIndex: 'notes',
  }
]

export const ManageClassScreen = () => {
  return (
    <>
      <ClassActionView />
      <ClassTable />
    </>
  )
}

const ClassActionView = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(modalOpen())
  }

  return (
    <ActionViewWrapper>
      <Row align="middle">
        <Col span={6}>
          <Button onClick={handleClick} type="primary">建班排课</Button>
        </Col>
      </Row>
    </ActionViewWrapper>

  )
}

const ClassTable = () => {
  return (
    <Table columns={columns} >

    </Table>
  )
}