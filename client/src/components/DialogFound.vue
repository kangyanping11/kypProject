<template>
    <div class="logFund">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="实习类型:" >
                        <el-select v-model="form.type" placeholder="实习类型">
                            <el-option
                             v-for="(formtype, index) in format_type_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='describe' label="实习描述:">
                        <el-input type="text" v-model="form.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop='xuhao'  label="学号:">
                        <el-input type="text" v-model="form.xuhao"></el-input>
                    </el-form-item>

                    <el-form-item prop='name' label="姓名:">
                        <el-input type="text" v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item prop='sex' label="性别:">
                        <el-input type="text" v-model="form.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <el-input type="text" v-model="form.zhuanye"></el-input>
                    </el-form-item>
                     <!-- <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item> -->

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
    // fform: Object
  },
  data() {
    return {
      format_type_list: [
        "校内实习",
        "校外实习",
      ],
      
      form_rules: {
        describe: [
          { required: true, message: "描述不能为空！", trigger: "blur" }
        ],
        xuhao: [
          { required: true, message: "学号不能为空！", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别不能为空！", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空！", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          console.log('1form',this.form)
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profiles/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.form = {}
            console.log('2form',this.form)
            this.dialog.show = false;
            // if(this.dialog.option == "add"){this.form = {}}
            this.$emit("update");
          });
        }
      });
    }
  },
//   created(){
//     console.log(' created')
//     console.log('this.fform',this.fform)
//     console.log('this.form',this.form)
//     this.form=this.fform
//   },
//   mounted(){
//     console.log('Mounted')
//     this.form=this.fform
//   },
//   // deactivated() { this.$destroy('el-dialog') },
//   destroyed(){
// console.log('Destory')
//   }
  
};
</script>

