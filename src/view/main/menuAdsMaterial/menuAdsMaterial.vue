<template>
  <div>
    <div style="overflow:auto;">
      <div class="Txt-left FS18 pad-x20 pad-top20px">
        <span class="FS16">当前位置：</span><b>菜单广告素材</b>
      </div>
      <div class="pad-x20">
        <div class="Txt-left" style="margin-top: 20px;">
          <el-button type="primary" style="margin-bottom: 15px;"
                     @click="addAdvData.show = true">添加广告
          </el-button>
          <div id="advList">
            <el-table
              :data="advList"
              border
              style="width: 100%">
              <el-table-column
                label="名称"
                width="500">
                <template scope="scope">
                  <!--<el-icon name="time"></el-icon>-->
                  <span style="margin-left: 10px">{{ scope.row.Name['zh-CN'] }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--label="周期"-->
              <!--width="400">-->
              <!--<template scope="scope">-->
              <!--&lt;!&ndash;<el-icon name="time"></el-icon>&ndash;&gt;-->
              <!--<span style="margin-left: 10px">{{ scope.row.LifeStartTime }} ~ {{ scope.row.LifeEndTime }}</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    v-if="username === scope.row.UserName || role === 'Normal'"
                    @click="menuInfoData.menuID = scope.row.ID;menuInfoData.show = true">菜单内容
                  </el-button>
                  <el-button
                    size="small"
                    type=""
                    v-if="username === scope.row.UserName || role === 'Normal'"
                    @click="editAdvData.data=scope.row;editAdvData.show = true">属性
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    v-if="username === scope.row.UserName || role === 'Normal'"
                    @click="deleteMenuAdsMaterial(scope.row.ID)">删除
                  </el-button>
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
    <add-adv :addData="addAdvData" @close="addAdvData.show = false;getAdvList()"></add-adv>
    <edit-adv :editData="editAdvData" @close="editAdvData.show = false;getAdvList()"></edit-adv>
    <menu-info :menuInfoData="menuInfoData" @close="menuInfoData.show = false;getAdvList()"></menu-info>
  </div>
</template>

<script>
  import uploadMenuAdvMaterial from '@/view/main/menuAdsMaterial/uploadMenuAdvMaterial'
  import editMenuAdvMaterial from '@/view/main/menuAdsMaterial/editMenuAdvMaterial'
  import menuInfo from '@/view/main/menuAdsMaterial/menuInfo'
  export default {
    data () {
      return {
        advList: null,
        advTotal: null,
        currentPage: 1,
        pageSize: 25,
        addAdvData: {
          show: false
        },
        editAdvData: {
          show: false,
          data: {
            ID: '',
            Name: {
              'zh-CN': '',
              'en-US': ''
            },
            Owner: '',
            Description: '',
            LifeStartTime: '',
            LifeEndTime: '',
            PicURL: '',
            PicSize: '',
            HighlightPicURL: '',
            HighlightPicSize: ''
          }
        },
        menuInfoData: {
          show: false,
          menuID: null,
          name: '???'
        }
      }
    },
    components: {
      'add-adv': uploadMenuAdvMaterial,
      'edit-adv': editMenuAdvMaterial,
      'menu-info': menuInfo
    },
    methods: {
      getAdvList () {
        this.axios.post('/menuadv', {
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
      deleteMenuAdsMaterial (ID) {
        alert(ID)
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/menuadv', {
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
                this.getAdvList()
              } else {
                this.$message('！')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }).catch(() => {})
      },
      handleCurrentChange (val) {
        console.log(val)
        this.currentPage = val
        this.getAdvList()
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
      this.getAdvList()
    }
  }
</script>

<style lang="css" scoped>
</style>
