import { Button, Col, Input, message, Popconfirm, Row, Table } from "antd"
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/lib/table"
import { useDispatch } from "react-redux"
import { Student } from "types/student"
import { STUDENT_MAP } from "utils/constant"
import { useQueryStudent, useStudentDelete } from "api/student"
import { addStudent, editStudent } from "../student.slice"

const columns: ColumnProps<Student>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '学员状态',
    dataIndex: 'status',
    key: 'status',
    render(value) {
      return STUDENT_MAP['status'][String(value)]
    }
  },
  {
    title: '学员编号',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '联系方式',
    dataIndex: 'mobile',
    key: 'mobile'
  },
  {
    title: '微信号',
    dataIndex: 'wechat',
    key: 'wechat'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render(value) {
      const sex = STUDENT_MAP['sex'][String(value)]
      return <>
        {sex}
        {(sex === '男' ? <ManOutlined /> : sex === '女' ? <WomanOutlined /> : '未知')}
      </>
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

export const ManageStudentScreen = () => {
  const { data: Students, isLoading } = useQueryStudent()

  return <>
    <StudentActionView />
    <Table columns={columns} loading={isLoading} dataSource={Students} rowKey={'id'} ></Table>
  </>
}

const StudentActionView = () => {
  const dispatch = useDispatch()

  const handleAddStudent = () => {
    dispatch(addStudent())
  }
  return (
    <div style={{ margin: '0 0 3.2rem 0', }}>
      <Row align="middle">
        <Col span={20}>
          <Input.Search style={{ width: 200 }} placeholder="请输入学员名称" />
        </Col>
        <Col span={4} >
          <span style={{ float: 'right', margin: "0 2rem" }} onClick={handleAddStudent} className="iconfont">&#xe698;</span>
        </Col>
      </Row>
    </div>)
}

const ActionScreen = ({ record }: { record: Student }) => {
  const { mutateAsync: deleteCourse } = useStudentDelete()
  const dispatch = useDispatch()

  const handleEditCourse = () => {
    dispatch(editStudent(record))
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
        title={`确定要删除${record.name} 吗?`}
        okText='确定'
        cancelText='取消'
        onConfirm={handleDeleteCourse}
      >
        <a href="#" >删除</a>
      </Popconfirm>
    </div>
  )
}
