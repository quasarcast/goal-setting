import { QColor, QDate, QInput } from 'quasar'

export default {
  shortText: {
    component: QInput,
    baseProps: {
      filled: true,
    },
  },
  longText: {
    component: QInput,
    baseProps: {
      filled: true,
      type: 'textarea',
    },
  },
  hexaColor: {
    component: QColor,
    baseProps: {
      formatModel: 'hexa',
    },
  },
  date: {
    component: QDate,
    baseProps: {
      formatModel: 'hexa',
    },
  },
}
