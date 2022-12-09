interface Obj {
  [index: string]: {
    [index: string]: string
  }
}

export const COURSE_MAP: Obj = {
  teachingMode: {
    1: '一对一',
    2: '一对多'
  },
  chargeMode: {
    1: '按课时收费',
    2: '按时间段收费'
  },
}

export const STUDENT_MAP: Obj = {
  sex: {
    0: '男',
    1: '女',
  },
  status: {
    0: '未结业',
    1: '已结业'
  }
}