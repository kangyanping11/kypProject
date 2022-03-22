<template>
<div class="fillcontain">
  <div>
            <el-form
                :inline="true"
                ref="search_data" 
                :model='search_data' >
                <el-form-item label="时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="date"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="date"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                    <el-button type="primary" size ="small" icon="search" @click='onReset()'>重置</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" v-if="user.identity == 'manager'" @click='onAddMoney()'>添加</el-button>
                </el-form-item>
            </el-form>
  </div>
  <div class="table_container">
    <el-table v-if="tableData.length>0" :data="tableData"  style="width: 100%" border height="500">
    <el-table-column label="序号" type="index" align="center" width="80">
    </el-table-column>
    <el-table-column prop="date" label="日期" align="center">
        <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date.split('T')[0] }}</span>
        </template>
    </el-table-column>
    <el-table-column prop="xuhao" label="学号" align="center">
    </el-table-column>
    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
    <el-table-column prop="sex" label="性别" align="center">
        <template slot-scope="scope">  
            <span>{{ scope.row.sex }}</span>
        </template>
    </el-table-column>
    <el-table-column prop="zhuanye" label="专业" align="center"></el-table-column>
    
    <!-- v-if="user.identity == 'manager'" -->
     <el-table-column label="操作"  align="center"   ><!-- v-if="user.identity == 'manager'" -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      
      <!-- <i class="el-icon-time"></i>  -->
    
    
    </el-table>
  </div>
  <!-- 分页 -->
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync ="paginations.page_index"
      :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size"
      :total="paginations.total"
      layout="total, sizes, prev, pager, next, jumper"
      >
    </el-pagination>
  </div>
  <!-- 弹框页面 -->
  <DialogFound :dialog='dialog' :form='form' @update="getProfile"></DialogFound>
</div>
</template>
<script>
import DialogFound from '../components/DialogFound.vue'

export default {
  name: "foundlist",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        xuhao: "",
        name: "",
        sex: "",
        zhuanye: "",
        id: "",
        remark:''
      },
       //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data:{
        startTime:'',
        endTime:'',
      }

    };
  },
  components: {
    DialogFound
  },
  computed:{
    // 进行权限认证
    user(){
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios
        .get("/api/profiles")
        .then((res) => {
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
        this.setPaginations();
        })
        .catch((err) => {
          // console.log(err);
        });
    },
     setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(size){
      console.log('当前页有多少条数据')
      this.paginations.page_size = size;
       // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleCurrentChange(page){
      console.log('当前页是第几页')
      this.paginations.page_index = page
      let nums = this.paginations.page_size*page
      let index = this.paginations.page_size*(page-1)
      let table = []
      for(let i = index; i<nums;i++){
        if(this.allTableData[i]){
          table.push(this.allTableData[i])
        }
      }
      this.tableData =table
    },
    handleEdit(index, row) {
        this.dialog = {
          show: true,
          title: "修改信息",
          option: "edit"
        };
        this.form = {
        type: row.type,
        describe: row.describe,
        xuhao: row.xuhao,
        name: row.name,
        sex: row.sex,
        zhuanye: row.zhuanye,
        id: row._id
      };
        console.log(index, row);
        console.log( this.form);
        // console.log('编辑');
        // this.$axios.post()
    },
    handleDelete(index, row) {
        console.log(index, row);
        console.log('删除');
        this.$axios.delete(`/api/profiles/delete/${row._id}`)
        .then(res => {
        this.$message.success("删除成功")
        this.getProfile()
        })
    },
    onReset(){
      this.getProfile();
      this.search_data.startTime='';
      this.search_data.endTime='';   
    },
    onScreeoutMoney(){
      if(!this.search_data.startTime || !this.search_data.endTime){
          this.$message({
            type:'warning',
            message:'请选择时间区间'
          });
      this.getProfile();
      return;
      }
      const sTime = this.search_data.startTime.getTime()
      const eTime = this.search_data.endTime.getTime()

      this.allTableData = this.filterTableData.filter(item =>{
        // console.log(item.date) //2022-01-11T03:24:33.337Z
        let date = new Date(item.date)
        // console.log('date',date)  //Tue Jan 11 2022 11:24:33 GMT+0800 (中国标准时间)
        let time = date.getTime();
        // console.log('time',time)//1641871473337
        return time >= sTime &&  time <= eTime
      })
      this.setPaginations();

    },
    onAddMoney(){
      // 添加
      this.dialog = {
        show: true,
        title: "添加信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        xuhao: "",
        name: "",
        sex: "",
        zhuanye: "",
        id: ""
      };
    }
  },
};
</script>
<style scoped>
/* .pagination{
  background-origin: 1px solid red;
} */
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
/* .btnRight {
  float: right;
} */
.pagination {
  text-align: right;
  margin-top: 10px;
}
 /deep/ .el-button--primary{
  background-color: #324057;
    border-color: #324057;
} 
</style>
