interface Course {
  [index: string]: {
    [index: string]: string
  }
}

export const COURSE_MAP: Course = {
  teachingMode: {
    1: '一对一',
    2: '一对多'
  },
  chargeMode: {
    1: '按课时收费',
    2: '按时间段收费'
  },
}