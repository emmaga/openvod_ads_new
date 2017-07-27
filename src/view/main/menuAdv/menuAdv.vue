<template>
  <div>
    <div style="overflow:auto;">
      <div class="Txt-left">
        菜单广告位
      </div>
      <div style="padding: 20px;">
        <div class="Txt-left" style="margin-top: 20px;">
          <el-button type="primary" style="margin-bottom: 15px;"
                     @click="addMenuAdvPositionData.show = true">添加广告位</el-button>
          <div>
            <el-table
              :data="menuAdvList"
              border
              style="width: 100%">
              <el-table-column
                label="名称"
                width="500">
                <template scope="scope">
                  <!--<el-icon name="time"></el-icon>-->
                  <span style="margin-left: 10px">{{ scope.row.Name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    @click="getAdvList(scope.row.ID)">广告列表</el-button>
                  <el-button
                    size="small"
                    type=""
                    @click="editAdvPosition(scope.row)">属性</el-button>
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
    <add-menuAdv :addMenuData="addMenuAdvPositionData" @close="addMenuAdvPositionData.show = false;getMenuAdvList()"></add-menuAdv>
    <edit-menuAdv :editMenuData="editMenuAdvPositionData" @close="editMenuAdvPositionData.show = false;getMenuAdvList()"></edit-menuAdv>
    <menuAdv-list :menuListData="menuAdvListData" @close="menuAdvListData.show = false;getMenuAdvList()"></menuAdv-list>

  </div>
</template>

<script>
  import addMenuAdv from '@/view/main/menuAdv/addMenuAdv'
  import editMenuAdv from '@/view/main/menuAdv/editMenuAdv'
  import menuAdvList from '@/view/main/menuAdv/menuAdvList'
  export default {
    data () {
      return {
        menuAdvList: null,
        advTotal: null,
        currentPage: 1,
        pageSize: 25,
        addMenuAdvPositionData: {
          show: false
        },
        editMenuAdvPositionData: {
          show: false,
          data: {
            Description: '',
            ID: '',
            Name: ''
          }
        },
        menuAdvPositionListData: {
          show: false,
          data: {
            Description: '',
            ID: '',
            Name: ''
          }
        },
//        广告列表数据
        menuAdvListData: {
          show: false,
          id: null,
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
      'add-menuAdv': addMenuAdv,
      'edit-menuAdv': editMenuAdv,
      'menuAdv-list': menuAdvList
    },
    methods: {
      getMenuAdvList () {
        this.axios.post('/menuposition', {
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
              this.menuAdvList = data.data.data.data
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
        this.editMenuAdvPositionData.show = true
        this.editMenuAdvPositionData.data = row
      },
      getAdvList (ID) {
        this.menuAdvListData.show = true
        this.menuAdvListData.id = ID
      },
      deleteAdvPosition (ID) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
      handleCurrentChange (val) {
        console.log(val)
        this.currentPage = val
        this.getMenuAdvList()
      }
    },
    created () {
      this.getMenuAdvList()
    }
  }
</script>

<style lang="css" scoped>

</style>
