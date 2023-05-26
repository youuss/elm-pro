export default {
  /**
   * 当前页
   */
  current: {
    type: Number,
    default: 1,
  },
  /**
   * 当前页数
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * 总数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * 组件布局
   */
  layout: {
    type: String,
    default: 'prev, pager, next',
  },
  /**
   * 每页显示个数选择器的选项设置
   */
  pageSizes: {
    type: Array,
    default: () => [] as number[],
  },
  /**
   * 是否自定义total，当服务端不返回total情况，用当前内容行数判断
   */
  isCustomTotal: {
    type: Boolean,
    default: false,
  },
};
