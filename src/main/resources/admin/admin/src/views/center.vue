<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      label-width="80px"
    >  
     <el-row>
                              <el-col :span="12">
        <el-form-item   v-if="flag=='xuesheng'"  label="学生号" prop="xueshenghao">
          <el-input v-model="ruleForm.xueshenghao" readonly              placeholder="学生号" clearable></el-input>
        </el-form-item>
      </el-col>
                                          <el-col :span="12">
        <el-form-item   v-if="flag=='xuesheng'"  label="学生姓名" prop="xueshengxingming">
          <el-input v-model="ruleForm.xueshengxingming"               placeholder="学生姓名" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="24">  
        <el-form-item v-if="flag=='xuesheng'" label="头像" prop="touxiang">
          <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="xueshengtouxiangUploadChange"
          ></file-upload>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item v-if="flag=='xuesheng'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie" placeholder="请选择性别">
            <el-option
                v-for="(item,index) in xueshengxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item   v-if="flag=='xuesheng'"  label="手机号码" prop="shoujihaoma">
          <el-input v-model="ruleForm.shoujihaoma"               placeholder="手机号码" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item   v-if="flag=='xuesheng'"  label="邮箱" prop="youxiang">
          <el-input v-model="ruleForm.youxiang"               placeholder="邮箱" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item   v-if="flag=='xuesheng'"  label="身份证号" prop="shenfenzhenghao">
          <el-input v-model="ruleForm.shenfenzhenghao"               placeholder="身份证号" clearable></el-input>
        </el-form-item>
      </el-col>
                                                <el-col :span="12">
        <el-form-item   v-if="flag=='jiaoshi'"  label="教师工号" prop="jiaoshigonghao">
          <el-input v-model="ruleForm.jiaoshigonghao" readonly              placeholder="教师工号" clearable></el-input>
        </el-form-item>
      </el-col>
                                          <el-col :span="12">
        <el-form-item   v-if="flag=='jiaoshi'"  label="教师姓名" prop="jiaoshixingming">
          <el-input v-model="ruleForm.jiaoshixingming"               placeholder="教师姓名" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="24">  
        <el-form-item v-if="flag=='jiaoshi'" label="头像" prop="touxiang">
          <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="jiaoshitouxiangUploadChange"
          ></file-upload>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item v-if="flag=='jiaoshi'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie" placeholder="请选择性别">
            <el-option
                v-for="(item,index) in jiaoshixingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item   v-if="flag=='jiaoshi'"  label="联系方式" prop="lianxifangshi">
          <el-input v-model="ruleForm.lianxifangshi"               placeholder="联系方式" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item   v-if="flag=='jiaoshi'"  label="邮箱" prop="youxiang">
          <el-input v-model="ruleForm.youxiang"               placeholder="邮箱" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item   v-if="flag=='jiaoshi'"  label="身份证号" prop="shenfenzhenghao">
          <el-input v-model="ruleForm.shenfenzhenghao"               placeholder="身份证号" clearable></el-input>
        </el-form-item>
      </el-col>
                                                                                                                                          <el-form-item v-if="flag=='users'" label="用户名" prop="username">
        <el-input v-model="ruleForm.username" 
        placeholder="用户名"></el-input>
      </el-form-item>
      <el-col :span="24">
      <el-form-item>
        <el-button type="primary" @click="onUpdateHandler">修 改</el-button>
      </el-form-item>
      </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {},
      flag: '',
      usersFlag: false,
                                                                              xueshengxingbieOptions: [],
                                                                                                                                    jiaoshixingbieOptions: [],
                                                                                                                                                                            };
  },
  mounted() {
    var table = this.$storage.get("sessionTable");
    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
                                                    this.xueshengxingbieOptions = "男,女".split(',')
                                                                                        this.jiaoshixingbieOptions = "男,女".split(',')
                                                                                                                  },
  methods: {
                                                                                                                                                                                                                                                                                        xueshengtouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
                                                                                        jiaoshitouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
                                                                                                                            onUpdateHandler() {
                              if((!this.ruleForm.xueshenghao)&& 'xuesheng'==this.flag){
        this.$message.error('学生号不能为空');
        return
      }
                                                                  if((!this.ruleForm.mima)&& 'xuesheng'==this.flag){
        this.$message.error('密码不能为空');
        return
      }
                                                                  if((!this.ruleForm.xueshengxingming)&& 'xuesheng'==this.flag){
        this.$message.error('学生姓名不能为空');
        return
      }
                                                                                                                                                                                                      if( 'xuesheng' ==this.flag && this.ruleForm.shoujihaoma&&(!isMobile(this.ruleForm.shoujihaoma))){
        this.$message.error(`手机号码应输入手机格式`);
        return
      }
                                                                        if( 'xuesheng' ==this.flag && this.ruleForm.youxiang&&(!isEmail(this.ruleForm.youxiang))){
        this.$message.error(`邮箱应输入邮箱格式`);
        return
      }
                                                                        if( 'xuesheng' ==this.flag && this.ruleForm.shenfenzhenghao&&(!checkIdCard(this.ruleForm.shenfenzhenghao))){
        this.$message.error(`身份证号应输入身份证格式`);
        return
      }
                                                      if((!this.ruleForm.jiaoshigonghao)&& 'jiaoshi'==this.flag){
        this.$message.error('教师工号不能为空');
        return
      }
                                                                  if((!this.ruleForm.mima)&& 'jiaoshi'==this.flag){
        this.$message.error('密码不能为空');
        return
      }
                                                                  if((!this.ruleForm.jiaoshixingming)&& 'jiaoshi'==this.flag){
        this.$message.error('教师姓名不能为空');
        return
      }
                                                                                                                                                                                                      if( 'jiaoshi' ==this.flag && this.ruleForm.lianxifangshi&&(!isMobile(this.ruleForm.lianxifangshi))){
        this.$message.error(`联系方式应输入手机格式`);
        return
      }
                                                                        if( 'jiaoshi' ==this.flag && this.ruleForm.youxiang&&(!isEmail(this.ruleForm.youxiang))){
        this.$message.error(`邮箱应输入邮箱格式`);
        return
      }
                                                                        if( 'jiaoshi' ==this.flag && this.ruleForm.shenfenzhenghao&&(!checkIdCard(this.ruleForm.shenfenzhenghao))){
        this.$message.error(`身份证号应输入身份证格式`);
        return
      }
                                                                                                                                                this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
