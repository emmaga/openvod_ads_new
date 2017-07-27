<template>
  <div>
    <div style="overflow:auto;">
      <div class="Txt-left">
        广告投放
      </div>
      <div style="padding: 20px;">
        <div class="Txt-left" style="margin-top: 20px;">
          <el-button type="primary" style="margin-bottom: 15px;"
                     @click="addUserShow = true">添加用户</el-button>
          <div id="userList">
            <el-table
              :data="userList"
              border
              style="width: 100%">
              <el-table-column
                label="名称"
                width="400">
                <template scope="scope">
                  <!--<el-icon name="time"></el-icon>-->
                  <span style="margin-left: 10px">{{ scope.row.Username }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    @click="assignedItemData.show = true;assignedItemData.data = scope.row">已分配项目</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="assignItemData.show = true;assignItemData.data = scope.row">添加项目</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteUser(scope.row.ID)">删除</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="changePasswordShow = true;changePasswordData.ID = scope.row.ID">重置密码</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="text-align: left;margin-top: 15px;margin-bottom: 20px;">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="userTotal">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!--弹窗-->
    <!--添加用户-->
    <div class="addUserModal" v-show="addUserShow">
      <div class="addUserModal_content">
        <div class="FS20 mar-bottom15">添加用户
        <button class="btn" style="float: right" @click="closeAddUser('addUserData')">&times;</button>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
        <div style="width: 90%;">
          <el-form :model="addUserData" :rules="rules_addUser" ref="addUserData" label-width="35%" class="demo-ruleForm">
            <el-form-item label="名字" required prop="Username">
              <el-input type="text" v-model="addUserData.Username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" required prop="Password">
              <el-input type="text" v-model="addUserData.Password" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="Txt-right">
          <el-button type="primary" @click="submitForm_addUser('addUserData')">添加</el-button>
          <el-button class="MarginLeft20" @click="closeAddUser('addUserData')">取消</el-button>
        </div>
      </div>
    </div>

    <!--重置密码-->
    <div class="changePasswordModal" v-show="changePasswordShow">
      <div class="changePasswordModal_content">
        <div class="FS20 mar-bottom15">重置密码
        <button class="btn" style="float: right" @click="closeChangePassword('changePasswordData')">&times;</button>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
        <div style="width: 90%;">
          <el-form :model="changePasswordData" :rules="rules_changePassword" ref="changePasswordData" label-width="35%" class="demo-ruleForm">
            <el-form-item label="新密码" required prop="Password">
              <el-input type="number" v-model="changePasswordData.Password" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="Txt-right">
          <el-button type="primary" @click="changePassword('changePasswordData')">重置</el-button>
          <el-button class="MarginLeft20" @click="closeChangePassword('changePasswordData')">取消</el-button>
        </div>
      </div>
    </div>

    <!--<add-advP :addData="addAdvPositionData" @close = "addAdvPositionData.show = false;getAdPositionList()"></add-advP>-->
    <!--<edit-advP :editData="editAdvPositionData" @close = "editAdvPositionData.show = false;getAdPositionList()"></edit-advP>-->
    <!--<adv-list :listData="userListData" @close = "userListData.show = false"></adv-list>-->
    <assigned-item :itemData="assignedItemData" @close = "assignedItemData.show = false;getUserList()"></assigned-item>
    <assign-item :itemData="assignItemData" @close = "assignItemData.show = false;getUserList()"></assign-item>
  </div>
</template>

<script>
  import assignedItem from '@/view/main/userManage/assignedItem'
  import assignItem from '@/view/main/userManage/assignItem'
//  import editAdvPosition from '@/view/main/adsBoard/editAdvPosition'
//  import advList from '@/view/main/adsBoard/advList'
  import { md5 } from '@/static/js/Common'
  export default {
    data () {
      var Username = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入名字'))
        } else {
          callback()
        }
      }
      var Password = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入初始密码'))
        } else {
          callback()
        }
      }
      var newPassword = (rule, value, callback) => {
//        alert(1)
        console.log(value)
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          callback()
        }
      }
      return {
        userList: null,
        userTotal: null,
        currentPage: 1,
        pageSize: 25,
//        添加用户
        addUserShow: false,
        addUserData: {
          Username: '',
          Password: '',
          Role: 'Normal'
        },
//        重置密码
        changePasswordShow: false,
        changePasswordData: {
          OldPassword: '',
          ID: '',
          Password: ''
        },
        rules_addUser: {
          Username: [
            {validator: Username, trigger: 'blur'}
          ],
          Password: [
            {validator: Password, trigger: 'blur'}
          ]
        },
        rules_changePassword: {
          Password: [
            {validator: newPassword, trigger: 'blur'}
          ]
        },
//        已分配项目
        assignedItemData: {
          show: false,
          data: null
        },
//        添加项目
        assignItemData: {
          show: false,
          data: null
        }
      }
    },
    components: {
      'assigned-item': assignedItem,
      'assign-item': assignItem
    },
    methods: {
//      用户列表
      getUserList () {
        this.axios.post('/user', {
          action: 'getList',
          data: {
            per_page: this.pageSize,
            page: this.currentPage
          }
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              console.log(data)
              this.userList = data.data.data.data
              this.userTotal = data.data.data.Total
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handleCurrentChange (val) {
        console.log(val)
        this.currentPage = val
        this.getUserList()
      },
//      添加用户
      closeAddUser (formName) {
        this.addUserShow = false
        this.$refs[formName].resetFields()
      },
      submitForm_addUser (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/user', {
              action: 'add',
              data: {
                Username: this.addUserData.Username,
                Password: md5()('' + this.addUserData.Password),
                Role: 'Normal'
              }
            })
              .then((data) => {
                console.log(data)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '用户添加成功!'
                  })
                  this.closeAddUser(formName)
                  this.getUserList()
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      },
//      删除用户
      deleteUser (ID) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/user', {
            action: 'delete',
            data: {
              ID: ID
            }
          })
            .then((data) => {
              console.log(data)
              if (!data) return
              if (data.data.rescode === '200') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getUserList()
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }).catch(() => {})
      },
//      重置密码
      changePassword (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/user', {
              action: 'changePassword',
              data: {
                OldPassword: '',
                ID: this.changePasswordData.ID,
                Password: md5()('' + this.changePasswordData.Password)
              }
            })
              .then((data) => {
                console.log(data)
                if (!data) return
                if (data.data.rescode === '200') {
                  this.$message({
                    type: 'success',
                    message: '密码重置成功!'
                  })
                  this.closeChangePassword(formName)
                  this.getUserList()
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      },
      closeChangePassword (formName) {
        this.changePasswordShow = false
        this.$refs[formName].resetFields()
      }
    },
    created () {
      this.getUserList()
    }
  }
</script>

<style lang="css" scoped>
  .addUserModal,.changePasswordModal{
    /*display: none;*/
    background: rgba(0, 0, 0, 0.8);
    /*width: 100%;*/
    z-index: 667;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
  }
  .addUserModal_content,.changePasswordModal_content {
    position: relative;
    padding: 20px;
    width: 50%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
</style>
