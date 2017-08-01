<template>
  <div class="advListModal" v-show="menuListData.show">
    <div class="advListModal_content">
      <div class="FS20 mar-bottom20">广告列表
        <button class="btn" style="float: right" @click="closeAdvList">&times;</button>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
      <div class="pad-20">
        <div class="WID100">
          <el-button class="FL" type="primary" style="margin-bottom: 15px;"
                     @click="addAdvShow = true;getAdvNewList()">添加广告
          </el-button>
          <el-button class="FR" type="primary" style="margin-bottom: 15px;"
                     @click="getAdvList">搜索
          </el-button>
          <el-input class="WID40 FR" v-model="listData.keyword" placeholder="请输入关键字" type="text" auto-complete="off"></el-input>
        </div>
        <div>
          <el-table
            :data="advList"
            border
            style="width: 100%">
            <!--<el-table-column-->
              <!--label="预览图"-->
              <!--width="250">-->
              <!--<template scope="scope">-->
                <!--&lt;!&ndash;<el-icon name="time"></el-icon>&ndash;&gt;-->
                <!--<span style="margin-left: 10px">{{ scope.row.Seq }}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              label="名称"
              align="left"
              width="400">
              <template scope="scope">
                <!--<el-icon name="time"></el-icon>-->
                <span style="margin-left: 10px">{{ scope.row.Name_CN }}</span>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--label="url"-->
              <!--width="250">-->
              <!--<template scope="scope">-->
                <!--&lt;!&ndash;<el-icon name="time"></el-icon>&ndash;&gt;-->
                <!--<span style="margin-left: 10px">{{ scope.row.URL }}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" align="left">
              <template scope="scope">
                <!--<el-button-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="editAdvPosition(scope.row)">属性</el-button>-->
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteAdv(scope.row.AdvID)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align: left;margin-top: 15px;margin-bottom: 20px;">
            <el-pagination
              @current-change="handlePageChange"
              :current-page.sync="listData.currentPage"
              :page-size="listData.pageSize"
              layout="total, prev, pager, next"
              :total="listData.Total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>


    <!--添加广告弹窗-->
    <div class="addAdvModal" v-show="addAdvShow">
      <div class="addAdvModal_content">
        <div class="FS20 mar-bottom20">添加广告
        <button class="btn" style="float: right" @click="closeAddAdv">&times;</button>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
        <div class="pad-20">
            <el-button class="FR mar-left10" type="primary" style="margin-bottom: 15px;"
                       @click="getAdvNewList">搜索
            </el-button>
            <el-input class="WID40 FR" placeholder="请输入关键字" v-model="newlistData.keyword" type="text" auto-complete="off"></el-input>
          </div>
          <div>
            <!--<el-table-->
              <!--ref="multipleTable"-->
              <!--:data="advNewList"-->
              <!--border-->
              <!--tooltip-effect="dark"-->
              <!--style="width: 100%"-->
              <!--@selection-change="handleSelectionChange">-->
              <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="预览图"-->
                <!--width="150">-->
                <!--<template scope="scope">{{ scope.row.date }}</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="name"-->
                <!--label="名称"-->
                <!--width="200">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="address"-->
                <!--label="url"-->
                <!--show-overflow-tooltip>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
            <el-table
              ref="multipleTable"
              :data="advNewList"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                align="left"
                width="200">
              </el-table-column>
              <!--<el-table-column-->
                <!--label="预览图"-->
                <!--width="200">-->
                <!--<template scope="scope">-->
                  <!--<img  style="height: 150px;" :src="scope.row.URL" alt="">-->
                  <!--&lt;!&ndash;<video v-if="currentMenu.Type === 'Video'" height="150px" width="150px" :src="scope.row.URL" alt=""  controls="controls"></video>&ndash;&gt;-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                prop="name"
                label="名称"
                align="left"
              >
                <template scope="scope">{{ scope.row.Name_CN }}</template>
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="address"-->
                <!--label="url"-->
                <!--show-overflow-tooltip>-->
                <!--<template scope="scope">{{ scope.row.URL }}</template>-->
              <!--</el-table-column>-->
            </el-table>
            <div class="block" style="text-align: left;margin-top: 15px;margin-bottom: 20px;">
              <el-pagination
                @current-change="handlePageChange_add"
                :current-page.sync="newlistData.currentPage"
                :page-size="newlistData.pageSize"
                layout="total, prev, pager, next"
                :total="newlistData.Total">
              </el-pagination>
            </div>
          </div>
          <div class="Txt-right">
            <el-button type="primary" @click="addItem">添加</el-button>
            <el-button class="MarginLeft20" @click="closeAddAdv">取消</el-button>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        advList: [],
        listData: {
          currentPage: 1,
          pageSize: 25,
          Total: null,
          keyword: ''
        },
        addAdvShow: false,
        allSelectedList: [],
//        添加广告数据
        advNewList: [],
        newlistData: {
          currentPage: 1,
          pageSize: 25,
          Total: null,
          keyword: ''
        },
        selectedSqueue: [],
        changeingPage: false
      }
    },
    computed: {
      advListModalShow: function () {
        return this.menuListData.show
      }
    },
    watch: {
      advListModalShow: function (newDATA) {
        if (newDATA === true) {
          this.getAdvList()
        }
      }
    },
    props: ['menuListData'],
    methods: {
      getAdvList () {
        this.axios.post('/menuposition', {
          action: 'getAdvList',
          data: {
            per_page: this.listData.pageSize,
            page: this.listData.currentPage,
            keyword: this.listData.keyword,
            PositionID: this.menuListData.id,
            exclude: false
          }
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              this.advList = data.data.data.data
              for (var m = 0; m < this.advList.length; m++) {
                console.log(this.advList[m].Name)
                this.advList[m].Name_CN = this.advList[m].Name['zh-CN']
              }
              this.listData.Total = data.data.data.Total
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      getAdvNewList () {
        this.axios.post('/menuposition', {
          action: 'getAdvList',
          data: {
            per_page: this.newlistData.pageSize,
            page: this.newlistData.currentPage,
            keyword: this.newlistData.keyword,
            PositionID: this.menuListData.id,
            exclude: true
          }
        })
          .then((data) => {
            this.changeingPage = false
            console.log(data)
            if (data.status === 200) {
              this.advNewList = data.data.data.data
              for (var m = 0; m < this.advNewList.length; m++) {
                this.advNewList[m].Name_CN = this.advNewList[m].Name['zh-CN']
              }
              this.newlistData.Total = data.data.data.Total
              console.log(this.advNewList)
              if (this.selectedSqueue.length === 0) {
                var length = Math.ceil(this.newlistData.Total / this.newlistData.pageSize)
                for (var i = 0; i < length; i++) {
                  this.selectedSqueue.push([])
                }
              }
              var temp = this.getIndex(this.selectedSqueue[this.newlistData.currentPage - 1], this.advNewList)
              var tempChecked = []
              for (var j = 0; j < temp.length; j++) {
                tempChecked.push(this.advNewList[temp[j]])
              }
              this.$nextTick(() => {
                this.toggleSelection(tempChecked)
              })
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            this.changeingPage = false
            console.log(error)
          })
      },
      deleteAdv (AdvID) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/menuposition', {
            action: 'deleteAdv',
            data: {
              PositionID: this.menuListData.id,
              AdvIDs: [AdvID]
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
                this.getAdvList()
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }).catch(() => {})
      },
      closeAdvList () {
        this.listData = {
          currentPage: 1,
          pageSize: 25,
          Total: null,
          keyword: ''
        }
        this.$emit('close', false)
      },
      closeAddAdv () {
        this.addAdvShow = false
        this.newlistData = {
          currentPage: 1,
          pageSize: 25,
          Total: null,
          keyword: ''
        }
      },
      addItem () {
        console.log(this.selectedSqueue)
        var idArr = []
        for (var i = 0; i < this.selectedSqueue.length; i++) {
          for (var j = 0; j < this.selectedSqueue[i].length; j++) {
            idArr.push(this.selectedSqueue[i][j].AdvID)
          }
        }
        console.log(idArr)
        if (idArr.length < 1) {
          this.$message({
            type: 'error',
            message: '请选择要添加的广告!'
          })
          return
        }
        this.axios.post('/menuposition', {
          action: 'addAdv',
          data: {
            AdvIDs: idArr,
            PositionID: this.menuListData.id
          }
        })
          .then((data) => {
            if (data.status === 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.closeAddAdv()
              this.getAdvList()
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            this.changeingPage = false
            console.log(error)
          })
      },
      handlePageChange (val) {
        this.changeingPage = true
        console.log(val)
        this.listData.currentPage = val
        this.getPositionAdv()
      },
      handlePageChange_add (val) {
        console.log(val)
        this.newlistData.currentPage = val
        this.getAdvNewList()
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
//        console.log(this.itemList)
        if (!this.changeingPage) {
          this.selectedSqueue[this.newlistData.currentPage - 1] = val
        }
//        console.log(this.selectedSqueue)
      },
      getIndex (arr, fatherArr) {
        var tempArr = []
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < fatherArr.length; j++) {
            if (fatherArr[j].ID === arr[i].ID) {
              tempArr.push(j)
            }
          }
        }
        return tempArr
      }
    }
  }
</script>

<style lang="css" scoped>
  .advListModal, .addAdvModal {
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

  .advListModal_content{
    position: relative;
    padding: 20px;
    width: 70%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
  .addAdvModal_content {
    position: relative;
    padding: 20px;
    width: 70%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }

</style>
