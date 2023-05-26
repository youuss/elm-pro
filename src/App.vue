<template>
  <ElmLayout>
    <template #header>
      <ElmProForm :formOption="{model}" :formItems="formItems">
        <template #btn>
          <el-button @click="queryTable()" type="primary">查询</el-button>
        </template>
      </ElmProForm>
    </template>
    <template #container>
      <ElmProTable :tableConfig="{
        data: tableData,
        columns,
        border: true
      }" >
        <template #headerExtra>
          <el-button type="primary">新增</el-button>
          <el-button>导出</el-button>
        </template>
        <template #btn>
          <div>
            <el-button text>查看</el-button>
            <el-button text type="danger">删除</el-button>
          </div>
        </template>
      </ElmProTable>
      <ElmPagination :current="pagination.current" :total="pagination.total" @change="pageHandler"/>
    </template>
  </ElmLayout>
</template>

<script setup lang="ts">
import useConfig from './useConfig';

const {
  model, formItems, columns, tableData, pagination, queryTable, pageHandler,
} = useConfig({
  table: {
    beforeQuery: (params) => {
      console.log('table beforeQuery', params);
      return params;
    },
    query: (params) => {
      console.log('table query', params);
      return {
        list: [
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ],
        total: 100,
      };
    },
    immediately: false,
    columns: [
      {
        prop: 'date',
        label: 'Date',
        width: 180,
      },
      {
        prop: 'name',
        label: 'Name',
        width: 180,
      },
      {
        prop: 'address',
        label: 'Address',
      },
      {
        prop: 'btn',
        label: '操作',
      },
    ],
    pagination: {
      currentKey: 'pn',
      pageSizeKey: 'ps',
      totalKey: 'total',
    },
  },
  search: {
    formOption: {
      model: {
        name: '',
        country: '',
        address: '',
        sex: '',
      },
    },
    formItems: [
      {
        prop: 'name', label: '姓名', type: 'input',
      },
      {
        prop: 'city',
        label: '城市',
        type: 'select',
        inputControl: {
          // todo 塞入formItem其余props
          disabled: (_form: any) => {
            console.log('利用model进行判断', _form);
            return _form.name === '';
          },
        },
        options: {
          // option相关配置
          initData: [{
            cityId: 1,
            cityName: '北京',
          }, {
            cityId: 2,
            cityName: '杭州',
          }, {
            cityId: 3,
            cityName: '广州',
          }],
          // options字段映射，默认label/value
          optionLabelKey: 'cityName',
          optionValueKey: 'cityId',
          // 远程获取数据
          remote: () => new Promise((resolve) => {
            console.log('options remote');
            setTimeout(() => {
              resolve([{
                cityId: 6,
                cityName: '厦门',
              }, {
                cityId: 5,
                cityName: '安徽',
              }, {
                cityId: 4,
                cityName: '天津',
              }]);
            }, 1000);
          }),
          // 依赖某些字段变更获取下拉数据
          dependsOn: ['name'],
        },
      },
      { prop: 'birth', label: '出生日期', type: 'date' },
      { prop: 'date', label: '日期', type: 'date' },
      { prop: 'btn', type: 'actions' },
    ],
    layout: {
      labelWidth: '120px',
      lineCount: 4,
      type: 'horizontal',
    },
  },
});

</script>
