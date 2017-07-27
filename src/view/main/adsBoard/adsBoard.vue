<template>
  <div>
    <div style="overflow:auto;">
      <div class="Txt-left">
        广告投放
      </div>
      <div style="padding: 20px;">
        <div class="Txt-left" style="margin-top: 20px;">
          <el-button type="primary" style="margin-bottom: 15px;"
                     @click="addAdvPositionData.show = true">添加广告位</el-button>
          <div id="advList">
            <el-table
              :data="advList"
              border
              style="width: 100%">
              <el-table-column
                label="名称"
                width="180">
                <template scope="scope">
                  <!--<el-icon name="time"></el-icon>-->
                  <span style="margin-left: 10px">{{ scope.row.Name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="描述"
                width="180">
                <template scope="scope">
                  <!--<el-icon name="time"></el-icon>-->
                  <span style="margin-left: 10px">{{ scope.row.Description }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="模版"
                width="180">
                <template scope="scope">
                  <!--<el-icon name="time"></el-icon>-->
                  <span style="margin-left: 10px">{{ scope.row.AdvPositionTemplateName }}</span>
                </template>
              </el-table-column>
              <div v-if="role === 'Admin'">
                <el-table-column
                  label="创建者"
                  width="180">
                  <template scope="scope">
                    <!--<el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.UserName }}</span>
                  </template>
                </el-table-column>
              </div>

              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    @click="getAdvList(scope.row.ID)" v-if="username === scope.row.UserName || role === 'Normal'">广告列表</el-button>
                  <el-button
                    size="small"
                    type=""
                    @click="editAdvPosition(scope.row)" v-if="username === scope.row.UserName || role === 'Normal'">属性</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteAdvPosition(scope.row.ID)" v-if="username === scope.row.UserName || role === 'Normal'">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="text-align: left;margin-top: 15px;margin-bottom: 20px;">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="advTotal">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!--弹窗-->

    <add-advP :addData="addAdvPositionData" @close = "addAdvPositionData.show = false;getAdPositionList()"></add-advP>
    <edit-advP :editData="editAdvPositionData" @close = "editAdvPositionData.show = false;getAdPositionList()"></edit-advP>
    <adv-list :listData="advListData" @close = "advListData.show = false"></adv-list>
  </div>
</template>

<script>
  import addAdvPosition from '@/view/main/adsBoard/addAdvPosition'
  import editAdvPosition from '@/view/main/adsBoard/editAdvPosition'
  import advList from '@/view/main/adsBoard/advList'
  export default {
    data () {
      return {
        advList: null,
        advTotal: null,
        currentPage: 1,
        pageSize: 25,
//        advTemplateList: null,
        addAdvPositionData: {
          show: false,
          templateList: []
        },
        editAdvPositionData: {
          show: false,
          templateList: [],
          data: {
            UserName: '',
            LifeEndTime: '',
            Description: '',
            AdvPositionTemplateName: '',
            LifeStartTime: '',
            ScheduleTypeParam: '',
            ScheduleType: '',
            ID: 1,
            Name: ''
          }
        },
        advListData: {
          show: false,
          currentPage: 1,
          pageSize: 25,
          listData: {
            Total: 1,
            data: []
          }
        }
      }
    },
    components: {
      'add-advP': addAdvPosition,
      'edit-advP': editAdvPosition,
      'adv-list': advList
    },
    methods: {
      getAdPositionList () {
        this.axios.post('/position', {
          action: 'getList',
          data: {
            per_page: this.pageSize,
            page: this.currentPage
          }
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
//              console.log(data)
              this.advList = data.data.data.data
              this.advTotal = data.data.data.Total
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      getAdTemplateList () {
        this.axios.post('/positiontemplate', {
          action: 'getList'
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              this.addAdvPositionData.templateList = data.data.data
              this.editAdvPositionData.templateList = data.data.data
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      editAdvPosition (row) {
        this.editAdvPositionData.show = true
        this.editAdvPositionData.data = {
          UserName: row.UserName,
          LifeEndTime: row.LifeEndTime,
          Description: row.Description,
          AdvPositionTemplateName: row.AdvPositionTemplateName,
          LifeStartTime: row.LifeStartTime,
          ScheduleTypeParam: row.ScheduleTypeParam,
          ScheduleType: row.ScheduleType,
          ID: row.ID,
          Name: row.Name
        }
      },
      deleteAdvPosition (ID) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          alert(ID)
          this.axios.post('/position', {
            action: 'delete',
            data: {
              ID: ID
            }
          })
            .then((data) => {
              console.log(data)
              if (data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getAdPositionList()
              } else {
                this.$message('！')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }).catch(() => {})
      },
      getAdvList (ID) {
        this.axios.post('/position', {
          action: 'getAdvList',
          data: {
            PositionID: ID,
            per_page: 25,
            page: 1
          }
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              console.log(data)
              this.advListData.listData = data.data.data
              console.log(this.advListData.listData)
              this.advListData.show = true
              this.advListData.PositionID = ID
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
        this.getAdPositionList()
      }
    },
    computed: {
      username: function () {
        return this.$store.state.username
      },
      role: function () {
        return this.$store.state.role
      }
    },
    created () {
      this.getAdPositionList()
      this.getAdTemplateList()
    }
  }
</script>

<style lang="css" scoped>
</style>
