<template>
  <div class="menuInfoModal" v-show="menuInfoData.show">
    <div class="menuInfoModal_content">
      <div class="FS20 mar-bottom15">菜单内容
        <button class="btn" style="float: right" @click="closeModal">&times;</button>
      </div>
      <div>
        <div class="nav">
          <el-button type="primary" style="margin-bottom: 15px;"
                     @click="addMenuModalShow = true">添加菜单
          </el-button>
          <div style="background: #eef1f6;">
            <draggable v-model="menuList" :move="getdata" @update="datadragEnd">
              <transition-group>
                <div v-for="element in menuList" :key="element.Seq" class="nav-list" @click="getMenuInfo(element)">
                  {{element.Name}}
                </div>
              </transition-group>
            </draggable>
          </div>

        </div><div class="content" >
          <div class="Txt-left FS18 mar-bottom20" v-if="currentMenu">
            <span>{{currentMenu.Name}}</span>
            <el-button class="FR" type="danger" style="margin-bottom: 15px;"
                       @click="deleteMenu">删除菜单
            </el-button>
          </div>
          <div class="Txt-left " v-if="currentMenu">
            <el-button type="primary" style="margin-bottom: 15px;"
                       @click="uploadModalShow = true">上传素材
            </el-button>
            <el-button  type="danger" style="margin-bottom: 15px;"
                       @click="deleteMenuMaterial">批量删除素材
            </el-button>
            <el-button  type="" style="margin-bottom: 15px;"
                        @click="editMenuModalShow = true">菜单属性
            </el-button>
          </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="menuMaterialList"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="left"
              width="55">
            </el-table-column>
            <el-table-column
              label="序号"
              width="80">
              <template scope="scope">{{ scope.row.Seq }}</template>
            </el-table-column>
            <el-table-column
              label="预览图"
              width="200">
              <template scope="scope">
                <img v-if="currentMenu.Type === 'Picture'" style="height: 150px;" :src="scope.row.URL" alt="">
                <video v-if="currentMenu.Type === 'Video'" height="150px" width="150px" :src="scope.row.URL" alt=""  controls="controls"></video>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              align="left"
              width="200">
              <template scope="scope">{{ scope.row.Name }}</template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="url"
              width="200"
              show-overflow-tooltip>
              <template scope="scope">{{ scope.row.URL }}</template>
            </el-table-column>
            <el-table-column label="操作" align="left">
              <template scope="scope">
                <el-button
                  size="small"
                  type=""
                  @click="changeAdvSeq.show = true;changeAdvSeq.data = scope.row">序号</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="block" style="text-align: left;margin-top: 15px;margin-bottom: 20px;">-->
            <!--<el-pagination-->
              <!--@current-change="handlePageChange"-->
              <!--:current-page.sync="advNewListData.currentPage"-->
              <!--:page-size="advNewListData.pageSize"-->
              <!--layout="total, prev, pager, next"-->
              <!--:total="advNewListData.Total">-->
            <!--</el-pagination>-->
          <!--</div>-->
        </div>
        </div>
      </div>

    </div>
    <!--弹窗-->
    <!--添加菜单弹窗-->
    <div class="addMenuModal" v-show="addMenuModalShow">
      <div class="addMenuModal_content">
        <div class="FS20 mar-bottom15">添加菜单

        <button class="btn" style="float: right" @click="closeAddMenu">&times;</button>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
        <div style="width: 90%;">
          <el-form :model="addMenuData" :rules="rules_add" ref="addMenuData" label-width="35%" class="demo-ruleForm">
            <el-form-item label="名称" required prop="Name">
              <el-input type="text" placeholder="请输入名称" v-model="addMenuData.Name" auto-complete="off"></el-input>
            </el-form-item>
            <!--<el-form-item label="序号" required prop="Seq">-->
              <!--<el-input type="number" placeholder="请输入序号" v-model="addMenuData.Seq" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="格式">
              <el-radio class="radio" v-model="addMenuData.Type" label="Picture">图片</el-radio>
              <el-radio class="radio" v-model="addMenuData.Type" label="Video">视频</el-radio>
            </el-form-item>
            <el-form-item label="图标" required>
              <div class="block Txt-left pos-rel" >
                <el-upload
                  class="avatar-uploader"
                  action="http://mres.cleartv.cn/upload"
                  accept='.jpg,.png'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="addMenuData.PicURL" :src="addMenuData.PicURL" class="avatar">
                  <i v-if="!addMenuData.PicURL" class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
                <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：190*240,不超过300K</span>
              </div>
            </el-form-item>

            <el-form-item label="背景海报" required>
              <div class="block Txt-left pos-rel" >
                <el-upload
                  class="avatar-uploader"
                  action="http://mres.cleartv.cn/upload"
                  accept='.jpg,.png'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload2">
                  <img v-if="addMenuData.BackgroundPicURL" :src="addMenuData.BackgroundPicURL" class="avatar">
                  <i v-if="!addMenuData.BackgroundPicURL" class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
                <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：1920*1080,不超过1M</span>
              </div>
            </el-form-item>

          </el-form>
        </div>
        <div class="Txt-right">
          <el-button type="primary" @click="submitForm('addMenuData')">添加</el-button>
          <el-button class="MarginLeft20" @click="closeAddMenu">取消</el-button>
        </div>
      </div>
    </div>

    <!--菜单属性弹窗-->
    <div class="editMenuModal" v-if="editMenuModalShow">
      <div class="editMenuModal_content">
        <div class="FS20 mar-bottom15">菜单属性

        <button class="btn" style="float: right" @click="closeEditMenu">&times;</button>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
        <div style="width: 90%;">
          <el-form :model="editMenuData" :rules="rules_edit" ref="editMenuData" label-width="35%" class="demo-ruleForm">
            <el-form-item label="名称" required prop="Name">
              <el-input type="text" placeholder="请输入名称" v-model="editMenuData.Name" auto-complete="off"></el-input>
            </el-form-item>
            <!--<el-form-item label="序号" required prop="Seq">-->
              <!--<el-input type="number" placeholder="请输入序号" v-model="editMenuData.Seq" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="格式">
              <el-radio class="radio" v-model="editMenuData.Type" v-if="editMenuData.Type === 'Picture'" label="Picture">图片</el-radio>
              <el-radio class="radio" v-model="editMenuData.Type" v-if="editMenuData.Type === 'Video'" label="Video">视频</el-radio>
            </el-form-item>
            <el-form-item label="图标" required>
              <div class="block Txt-left pos-rel" >
                <el-upload
                  class="avatar-uploader"
                  action="http://mres.cleartv.cn/upload"
                  accept='.jpg,.png'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess5"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="editMenuData.PicURL" :src="editMenuData.PicURL" class="avatar">
                  <i v-if="!editMenuData.PicURL" class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
                <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：190*240,不超过300K</span>
              </div>
            </el-form-item>

            <el-form-item label="背景海报" required>
              <div class="block Txt-left pos-rel" >
                <el-upload
                  class="avatar-uploader"
                  action="http://mres.cleartv.cn/upload"
                  accept='.jpg,.png'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess6"
                  :before-upload="beforeAvatarUpload2">
                  <img v-if="editMenuData.BackgroundPicURL" :src="editMenuData.BackgroundPicURL" class="avatar">
                  <i v-if="!editMenuData.BackgroundPicURL" class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
                <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：1920*1080,不超过1M</span>
              </div>
            </el-form-item>

          </el-form>
        </div>
        <div class="Txt-right">
          <el-button type="primary" @click="submitForm_edit('editMenuData')">添加</el-button>
          <el-button class="MarginLeft20" @click="closeEditMenu">取消</el-button>
        </div>
      </div>
    </div>

    <!--上传素材弹窗-->
    <div class="uploadMaterialModal" v-show="uploadModalShow">
      <div class="uploadMaterialModal_content">
        <div class="FS20 mar-bottom15">上传素材

        <button class="btn" style="float: right" @click="closeUploadModal">&times;</button>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
        <div style="width: 90%;" v-if="currentMenu">
          <el-form :model="uploadData" :rules="rules_upload" ref="uploadData" label-width="35%" class="demo-ruleForm">
            <el-form-item label="素材名称" required prop="Name">
              <el-input type="text" placeholder="请输入素材名称" v-model="uploadData.Name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" required v-if="currentMenu.Type === 'Picture'">
              <div class="block Txt-left pos-rel" >
                <el-upload
                  class="avatar-uploader"
                  action="http://mres.cleartv.cn/upload"
                  accept='.jpg,.png'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload3">
                  <img v-if="uploadData.URL" :src="uploadData.URL" class="avatar">
                  <i v-if="!uploadData.URL" class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
                <span class="pos-abs" style="top: 0px; left: 190px;">建议尺寸：1920*1080,不超过1M</span>
              </div>
            </el-form-item>

            <el-form-item label="视频" required v-if="currentMenu.Type === 'Video'">
              <div class="block Txt-left pos-rel" >
                <el-upload
                  class="avatar-uploader"
                  action="http://mres.cleartv.cn/upload"
                  accept='.mp4'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess4">
                  <video v-if="uploadData.URL" height="150px" width="150px" :src="uploadData.URL" alt=""  controls="controls"></video>
                  <i v-if="!uploadData.URL" class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>
                <span class="pos-abs" style="top: 0px; left: 190px;">格式：mp4</span>
              </div>
            </el-form-item>

          </el-form>
        </div>
        <div class="Txt-right">
          <el-button type="primary" @click="submitForm_upload('uploadData')">上传素材</el-button>
          <el-button class="MarginLeft20" @click="closeUploadModal()">取消</el-button>
        </div>
      </div>
    </div>

    <!--修改序号弹窗-->
    <div class="changeAdvSeqModal" v-show="changeAdvSeq.show">
      <div class="changeAdvSeqModal_content" v-if="changeAdvSeq.data">
        <div class="FS20" style="">修改序号<button class="btn" style="float: right" @click="closeChangeSeqModal">&times;</button></div>
        <!--<div style="margin-top: 20px;margin-bottom: 5px;border-bottom: 1px solid gray;"></div>-->
        <div>
          <div class="Txt-left mar-y20">当前序号：{{changeAdvSeq.data.Seq}}</div>
          <!--<div>-->
            <!--<el-input v-model="changeAdvSeq.Seq" type="number" placeholder="请输入新序号"></el-input>-->
          <!--</div>-->
          <el-form :model="changeAdvSeq" :rules="rules_changeSeq" ref="changeSeq"  class="demo-ruleForm">
            <el-form-item label="新序号" required prop="Seq">
              <el-input v-model="changeAdvSeq.Seq" type="number" placeholder="请输入新序号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--<div style="margin-top: 20px;margin-bottom: 5px;border-bottom: 1px solid gray;"></div>-->
        <div class="Txt-right mar-top20">
          <!--<button class="btn btn-success" @click="positionAddAdv">添加</button>-->
          <!--<button class="btn mar-left20 btn-warning" @click="allAdvListShow = false">取消</button>-->
          <el-button type="primary" @click="changeMenuMaterialSeq('changeSeq')">修改</el-button>
          <el-button class="mar-left20" @click="closeChangeSeqModal">取消</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import draggable from 'vuedraggable'
  export default {
    data () {
      var Name = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入名称'))
        } else {
          callback()
        }
      }
      var Seq = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入序号'))
        } else {
          callback()
        }
      }
      return {
        menuList: [],
        addMenuModalShow: false,
        editMenuModalShow: false,
        addMenuData: {
          AdvID: '',
          PicSize: '',
          Name: '',
          Seq: '',
          BackgroundPicURL: '',
          Type: 'Picture',
          BackgroundPicSize: '',
          PicURL: ''
        },
        editMenuData: {
          AdvID: '',
          PicSize: '',
          Name: '',
          Seq: '',
          BackgroundPicURL: '',
          Type: 'Picture',
          BackgroundPicSize: '',
          PicURL: ''
        },
        rules_add: {
          Name: [
            {validator: Name, trigger: 'blur'}
          ],
          Seq: [
            {validator: Seq, trigger: 'blur'}
          ]
        },
        rules_edit: {
          Name: [
            {validator: Name, trigger: 'blur'}
          ],
          Seq: [
            {validator: Seq, trigger: 'blur'}
          ]
        },
        menuMaterialList: [],
        currentMenu: null,
        multipleSelection: [],
//        上传素材
        uploadModalShow: false,
        uploadData: {
          URL: '',
          LifeStartTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          Name: '',
          Seq: 1,
          LifeEndTime: '2020-12-31 23:59:59',
          MenuID: '',
          Description: '',
          Duration: '',
          Size: ''
        },
        rules_upload: {
          Name: [
            {validator: Name, trigger: 'blur'}
          ]
        },
//        修改序号
        changeAdvSeq: {
          show: false,
          data: null,
          Seq: ''
        },
        rules_changeSeq: {
          Seq: [
            {validator: Seq, trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      draggable
    },
    computed: {
      menuInfoModalShow: function () {
        return this.menuInfoData.show
      }
    },
    watch: {
      menuInfoModalShow: function (newDATA) {
        if (newDATA === true) {
//          alert(this.menuInfoData.menuID)
          console.log(this.menuInfoData)
          this.getMenuList()
        }
      },
      currentMenu: function (newDATA) {
        this.editMenuData = {
          PicSize: newDATA.PicSize,
          Name: newDATA.Name,
          Seq: newDATA.Seq,
          BackgroundPicURL: newDATA.BackgroundPicURL,
          Type: newDATA.Type,
          BackgroundPicSize: newDATA.BackgroundPicSize,
          PicURL: newDATA.PicURL,
          MenuID: newDATA.ID
        }
      }
    },
    props: ['menuInfoData'],
    methods: {
      closeModal () {
        this.menuInfoData.show = false
        this.menuMaterialList = []
        this.currentMenu = null
      },
//      菜单拖拽函数
      getdata (evt) {
//        console.log(evt.draggedContext.element.id)
      },
      datadragEnd (evt) {
//        console.log(evt)
//        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
//        console.log(this.menuList)
//        console.log(this.menuList[evt.newIndex])
        this.changeMenuSeq(this.menuList[evt.newIndex].ID, evt.newIndex + 1)
      },
      changeMenuSeq (MenuID, Seq) {
        console.log(MenuID)
        console.log(Seq)
        this.axios.post('/menuadv/menu', {
          action: 'changeSeq',
          data: {
            MenuID: MenuID,
            Seq: Seq
          }
        })
          .then((data) => {
            if (data.status === 200) {
              this.getMenuList()
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
//      toggleSelection (rows) {
//        if (rows) {
//          rows.forEach(row => {
//            this.$refs.multipleTable.toggleRowSelection(row)
//          })
//        } else {
//          this.$refs.multipleTable.clearSelection()
//        }
//      },
//      添加菜单部分
      getMenuList () {
        this.axios.post('/menuadv/menu', {
          action: 'getList',
          data: {
            AdvID: this.menuInfoData.menuID
          }
        })
          .then((data) => {
//            console.log(data)
            if (data.status === 200) {
//              console.log(data)
              this.menuList = data.data.data
              console.log(this.menuList)
              if (!this.currentMenu) {
                this.currentMenu = this.menuList[0]
//              console.log(this.menuList)
//              console.log(this.currentMenu)
                this.getMenuInfo(this.currentMenu)
              }
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handleAvatarSuccess (res, file) {
        this.$message({
          type: 'success',
          message: '图片上传成功!'
        })
        this.addMenuData.PicURL = file.response.upload_path
        this.addMenuData.PicSize = file.size
      },
      handleAvatarSuccess2 (res, file) {
        this.$message({
          type: 'success',
          message: '图片上传成功!'
        })
        this.addMenuData.BackgroundPicURL = file.response.upload_path
        this.addMenuData.BackgroundPicSize = file.size
      },
      handleAvatarSuccess5 (res, file) {
        this.$message({
          type: 'success',
          message: '图片上传成功!'
        })
        this.editMenuData.PicURL = file.response.upload_path
        this.editMenuData.PicSize = file.size
      },
      handleAvatarSuccess6 (res, file) {
        this.$message({
          type: 'success',
          message: '图片上传成功!'
        })
        this.editMenuData.BackgroundPicURL = file.response.upload_path
        this.editMenuData.BackgroundPicSize = file.size
      },
      beforeAvatarUpload (file) {
//        this.$message({
//          type: 'success',
//          message: '图片上传成功!'
//        })
        console.log(file.type)
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 0.3

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 300K!')
        }
        return isJPG && isLt2M
      },
      beforeAvatarUpload2 (file) {
//        this.$message({
//          type: 'success',
//          message: '图片上传成功!'
//        })
        console.log(file.type)
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addMenuData.PicURL === '') {
              this.$message({
                type: 'error',
                message: '请上传图标!'
              })
              return
            }
            if (this.addMenuData.BackgroundPicURL === '') {
              this.$message({
                type: 'error',
                message: '请上传背景海报!'
              })
              return
            }
            this.addMenuData.AdvID = this.menuInfoData.menuID
            console.log(this.addMenuData)
            this.axios.post('/menuadv/menu', {
              action: 'add',
              data: this.addMenuData
            })
              .then((data) => {
                console.log(data)
                if (data.status === 200) {
                  console.log(data)
                  this.$message({
                    type: 'success',
                    message: '菜单添加成功!'
                  })
                  this.getMenuList()
                  this.closeAddMenu()
                } else {
                  this.$message('！')
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
      submitForm_edit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editMenuData.PicURL === '') {
              this.$message({
                type: 'error',
                message: '请上传图标!'
              })
              return
            }
            if (this.editMenuData.BackgroundPicURL === '') {
              this.$message({
                type: 'error',
                message: '请上传背景海报!'
              })
              return
            }
//            this.editMenuData.Type = 'Video'
            console.log(this.editMenuData)
            this.axios.post('/menuadv/menu', {
              action: 'edit',
              data: this.editMenuData
            })
              .then((data) => {
                console.log(data)
                if (data.status === 200) {
                  console.log(data)
                  this.$message({
                    type: 'success',
                    message: '菜单修改成功!'
                  })
                  this.currentMenu.Name = this.editMenuData.Name
                  console.log(this.currentMenu.Name)
//                  this.getMenuList()
//                  this.closeEditMenu()
                  console.log(this.currentMenu.Name)
                  this.editMenuModalShow = false
                } else {
                  this.$message('！')
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
      closeAddMenu () {
        this.addMenuModalShow = false
        this.$refs['addMenuData'].resetFields()
        this.addMenuData = {
          AdvID: '',
          PicSize: '',
          Name: '',
          Seq: '',
          BackgroundPicURL: '',
          Type: 'Picture',
          BackgroundPicSize: '',
          PicURL: ''
        }
      },
      closeEditMenu () {
        this.editMenuModalShow = false
        this.$refs['editMenuData'].resetFields()
//        this.editMenuData = this.currentMenu
//        console.log(this.currentMenu)
      },
//      获取菜单素材列表部分
      deleteMenu () {
        console.log(this.currentMenu)
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/menuadv/menu', {
            action: 'delete',
            data: {
              MenuID: this.currentMenu.ID
            }
          })
            .then((data) => {
              if (data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getMenuList()
                this.getMenuInfo(null)
              } else {
                this.$message('！')
              }
            })
            .catch((error) => {
              this.changeingPage = false
              console.log(error)
            })
        }).catch(() => {})
      },
      getMenuInfo (row) {
        this.currentMenu = row
        console.log(row)
        this.axios.post('/menuadv/menu/material', {
          action: 'getList',
          data: {
            MenuID: row.ID,
            per_page: 25,
            page: 1
          }
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              console.log(data)
              this.menuMaterialList = data.data.data.data
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
      },
      deleteMenuMaterial () {
        console.log(this.multipleSelection)
        if (this.multipleSelection.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择要删除的素材!'
          })
          return
        }
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var idArr = []
          for (var i = 0; i < this.multipleSelection.length; i++) {
            idArr.push(this.multipleSelection[i].ID)
          }
          console.log(idArr)
          this.axios.post('/menuadv/menu/material', {
            action: 'deleteList',
            data: {
              MaterialList: idArr
            }
          })
          .then((data) => {
            if (data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMenuInfo(this.currentMenu)
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            this.changeingPage = false
            console.log(error)
          })
        }).catch(() => {})
      },
      closeChangeSeqModal () {
        this.changeAdvSeq.show = false
        this.$refs['changeSeq'].resetFields()
      },
      changeMenuMaterialSeq (formName) {
//        var date = new Date()
        console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        console.log(this.changeAdvSeq)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changeAdvSeq.data.Seq = this.changeAdvSeq.Seq
            this.changeAdvSeq.data.MaterialID = this.changeAdvSeq.data.ID
            this.axios.post('/menuadv/menu/material', {
              action: 'edit',
              data: this.changeAdvSeq.data
            })
              .then((data) => {
                console.log(data)
                if (data.status === 200) {
                  console.log(data)
                  this.$message({
                    type: 'success',
                    message: '序号修改成功!'
                  })
                  this.getMenuInfo(this.currentMenu)
                  this.closeChangeSeqModal()
                } else {
                  this.$message('！')
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
//      上传素材部分
      closeUploadModal () {
        this.$refs['uploadData'].resetFields()
        this.uploadModalShow = false
        this.uploadData = {
          URL: '',
          LifeStartTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          Name: '',
          Seq: 1,
          LifeEndTime: '2020-12-31 23:59:59',
          MenuID: '',
          Description: '',
          Duration: '',
          Size: ''
        }
      },
      handleAvatarSuccess3 (res, file) {
        this.$message({
          type: 'success',
          message: '图片上传成功!'
        })
        this.uploadData.URL = file.response.upload_path
        this.uploadData.Size = file.size
      },
      beforeAvatarUpload3 (file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      handleAvatarSuccess4 (res, file) {
        this.$message({
          type: 'success',
          message: '视频上传成功!'
        })
        this.uploadData.URL = file.response.upload_path
        this.uploadData.Size = file.size
      },
      submitForm_upload (formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.currentMenu)
          if (valid) {
            if (this.uploadData.URL === '') {
              if (this.currentMenu.Type === 'Picture') {
                this.$message({
                  type: 'error',
                  message: '请上传图片!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '请上传视频!'
                })
              }
              return
            }
            this.uploadData.MenuID = this.currentMenu.ID
            console.log(this.uploadData)
            this.axios.post('/menuadv/menu/material', {
              action: 'add',
              data: this.uploadData
            })
              .then((data) => {
                console.log(data)
                if (data.status === 200) {
                  console.log(data)
                  this.$message({
                    type: 'success',
                    message: '素材上传成功!'
                  })
                  this.getMenuInfo(this.currentMenu)
                  this.closeUploadModal()
                } else {
                  this.$message('！')
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  .menuInfoModal,.addMenuModal,.editMenuModal,.uploadMaterialModal,.changeAdvSeqModal {
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
  .menuInfoModal_content{
    position: relative;
    padding: 20px;
    width: 85%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
  .addMenuModal_content,.editMenuModal_content,.uploadMaterialModal_content,.changeAdvSeqModal_content{
    position: relative;
    padding: 20px;
    width: 60%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
  .nav{
    padding-right: 10px;
    display: inline-block;
    width: 150px;
  }
  .content{
    border:1px solid #dddddd;
    padding: 10px;
    vertical-align: top;
    display: inline-block;
    width: -moz-calc(100% - 150px);
    /*chrome safari*/
    width:-webkit-calc(100% - 150px);
    /*Standard */
    width: calc(100% - 150px);
  }
  .nav-list{
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #48576a;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .nav-list:hover{
    background: #d1dbe5;
  }
  .radio{
    margin-top:0px;
  }
</style>
