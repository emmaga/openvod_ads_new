<template>
  <div id="advListModal" v-show="listData.show">
    <div class="advListModal_content">
      <div class="FS20">广告列表<button class="btn" style="float: right" @click="closeAdvList">&times;</button></div>
      <div class="pad-20">
        <div class="Txt-left">
          <el-button type="primary" style="margin-bottom: 15px;"
                     @click="getadvList">添加广告</el-button>
        </div>
        <div >
          <el-table
            :data="listData.listData.data"
            border
            style="width: 100%">
            <el-table-column
              label="序号"
              width="180">
              <template scope="scope">
                <!--<el-icon name="time"></el-icon>-->
                <span style="margin-left: 10px">{{ scope.row.Seq }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="名称"
              width="180">
              <template scope="scope">
                <!--<el-icon name="time"></el-icon>-->
                <span style="margin-left: 10px">{{ scope.row.Name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <!--<el-button-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="editAdvPosition(scope.row)">属性</el-button>-->
                <el-button
                  size="small"
                  type=""
                  @click="changeAdvSeq.AdvID = scope.row.AdvID;changeAdvSeq.oldSeq = scope.row.Seq;changeAdvSeq.show = true">序号</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="positionDeleteAdv(scope.row.AdvID)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align: left;margin-top: 15px;margin-bottom: 20px;">
            <el-pagination
              @current-change="handlePageChange"
              :current-page.sync="listData.currentPage"
              :page-size="listData.pageSize"
              layout="total, prev, pager, next"
              :total="listData.listData.Total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--添加广告弹窗-->
    <div id="addAdvListModal" v-if="allAdvListShow">
      <div class="addAdvListModal_content">
        <div class="FS20" style="">广告位添加广告<button class="btn" style="float: right" @click="closeAddAdv">&times;</button></div>
        <div style="margin-top: 20px;margin-bottom: 5px;border-bottom: 1px solid gray;"></div>
        <div>
          <!--<el-checkbox-group v-model="checkList" >-->
            <!--<div class="pad-y5 bor-bottom-1"  @click = "checkBox" v-for="item in allAdvList">-->
              <!--<el-checkbox :label="item.AdvID" :key="item.AdvID"><span class="Txt-left pad-left60 DISIB WID500">{{item.Name}}</span></el-checkbox>-->
            <!--</div>-->
          <!--</el-checkbox-group>-->
          <el-table
            ref="multipleTable"
            :data="itemList"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              align="left"
              type="selection"
              width="100">
            </el-table-column>
            <el-table-column
              align="left"
              prop="Name"
              label="项目"
            >
            </el-table-column>
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
        <div class="Txt-right mar-top20">
          <!--<button class="btn btn-success" @click="positionAddAdv">添加</button>-->
          <!--<button class="btn mar-left20 btn-warning" @click="allAdvListShow = false">取消</button>-->
          <el-button type="primary" @click="addItem">添加</el-button>
          <el-button class="mar-left20" @click="closeAddAdv">取消</el-button>
        </div>
      </div>
    </div>

    <!--修改序号弹窗-->
    <div id="changeAdvSeqModal" v-show="changeAdvSeq.show">
      <div class="changeAdvSeqModal_content">
        <div class="FS20" style="">修改序号<button class="btn" style="float: right" @click="changeAdvSeq.show = false;changeAdvSeq.Seq = ''">&times;</button></div>
        <!--<div style="margin-top: 20px;margin-bottom: 5px;border-bottom: 1px solid gray;"></div>-->
        <div>
          <div class="Txt-left mar-y20">当前序号：{{changeAdvSeq.oldSeq}}</div>
          <div>
            <el-input v-model="changeAdvSeq.Seq" type="number" placeholder="请输入新序号"></el-input>
          </div>
        </div>
        <!--<div style="margin-top: 20px;margin-bottom: 5px;border-bottom: 1px solid gray;"></div>-->
        <div class="Txt-right mar-top20">
          <!--<button class="btn btn-success" @click="positionAddAdv">添加</button>-->
          <!--<button class="btn mar-left20 btn-warning" @click="allAdvListShow = false">取消</button>-->
          <el-button type="primary" @click="ChangeAdvSeq()">修改</el-button>
          <el-button class="mar-left20" @click="changeAdvSeq.show = false;changeAdvSeq.Seq = ''">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        itemList: [],
        newlistData: {
          currentPage: 1,
          pageSize: 25,
          Total: null
        },
        allAdvListShow: false,
        selectedSqueue: [],
        checkList: [],
        changeAdvSeq: {
          AdvID: null,
          show: false,
          oldSeq: null,
          Seq: ''
        }
      }
    },
    props: ['listData'],
    methods: {
      closeAdvList () {
        this.$emit('close', false)
      },
      getadvList () {
        this.axios.post('/position', {
          action: 'getAdvList',
          data: {
            PositionID: this.listData.PositionID,
            per_page: this.newlistData.pageSize,
            page: this.newlistData.currentPage,
            exclude: true
          }
        })
          .then((data) => {
            this.changeingPage = false
//            console.log(data)
            if (data.status === 200) {
              this.itemList = data.data.data.data
              this.newlistData.Total = data.data.data.Total
              this.allAdvListShow = true
              if (this.selectedSqueue.length === 0) {
                var length = Math.ceil(this.newlistData.Total / this.newlistData.pageSize)
                for (var i = 0; i < length; i++) {
                  this.selectedSqueue.push([])
                }
              }
              var temp = this.getIndex(this.selectedSqueue[this.newlistData.currentPage - 1], this.itemList)
              var tempChecked = []
              for (var j = 0; j < temp.length; j++) {
                tempChecked.push(this.itemList[temp[j]])
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
      positionAddAdv () {
//        console.log(this.listData.PositionID)
        if (this.checkList.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择要添加的广告!'
          })
          return
        }
        this.axios.post('/position', {
          action: 'addAdv',
          data: {
            PositionID: this.listData.PositionID,
            AdvIDs: this.checkList,
            ScheduleParam: 'Random'
          }
        })
          .then((data) => {
//            console.log(data)
            if (data.status === 200) {
//              console.log(data)
              this.$message({
                type: 'success',
                message: '广告添加成功!'
              })
              this.checkList = []
              this.allAdvListShow = false
              this.getPositionAdv()
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      positionDeleteAdv (ID) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/position', {
            action: 'deleteAdv',
            data: {
              PositionID: this.listData.PositionID,
              AdvIDs: [
                ID
              ]
            }
          })
            .then((data) => {
//              console.log(data)
              if (data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getPositionAdv()
              } else {
                this.$message('！')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }).catch(() => {})
      },
      getPositionAdv () {
        this.axios.post('/position', {
          action: 'getAdvList',
          data: {
            PositionID: this.listData.PositionID,
            per_page: this.listData.pageSize,
            page: this.listData.currentPage
          }
        })
          .then((data) => {
//            console.log(data)
            if (data.status === 200) {
//              console.log(data)
              this.listData.listData.data = data.data.data.data
              this.listData.listData.Total = data.data.data.Total
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      ChangeAdvSeq () {
//        alert(this.changeAdvSeq.Seq)
        if (this.changeAdvSeq.Seq === '') {
          this.$message({
            type: 'error',
            message: '请输入新序号!'
          })
          return
        }
        console.log(this.changeAdvSeq.Seq)
        this.axios.post('/position', {
          action: 'changeAdvSeq',
          data: {
            PositionID: this.listData.PositionID,
            AdvID: this.changeAdvSeq.AdvID,
            Seq: this.changeAdvSeq.Seq
          }
        })
          .then((data) => {
            console.log(data)
            if (data.status === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.changeAdvSeq.show = false
              this.changeAdvSeq.Seq = ''
              this.getPositionAdv()
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handlePageChange (val) {
//        console.log(val)
        this.newlistData.currentPage = val
        this.getPositionAdv()
      },
      handlePageChange_add (val) {
        this.changeingPage = true
        this.newlistData.currentPage = val
        this.getadvList()
        this.$refs.multipleTable.clearSelection()
//        console.log(this.selectedSqueue)
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
        if (this.itemList.length === 0) return
        if (!this.changeingPage) {
          this.selectedSqueue[this.newlistData.currentPage - 1] = val
        }
//        console.log(this.selectedSqueue)
      },
      getIndex (arr, fatherArr) {
        var tempArr = []
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < fatherArr.length; j++) {
            if (fatherArr[j].AdvID === arr[i].AdvID) {
              tempArr.push(j)
            }
          }
        }
        return tempArr
      },
      closeAddAdv () {
        this.selectedSqueue = []
        this.newlistData.currentPage = 1
//        this.newlistData.Total = null
        this.allAdvListShow = false
      },
      addItem () {
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
        this.axios.post('/position', {
          action: 'addAdv',
          data: {
            PositionID: this.listData.PositionID,
            AdvIDs: idArr,
            ScheduleParam: 'Random'
          }
        })
          .then((data) => {
//            console.log(data)
            if (data.status === 200) {
//              console.log(data)
              this.$message({
                type: 'success',
                message: '广告添加成功!'
              })
              this.closeAddAdv()
              this.getPositionAdv()
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="css" scoped>
  #advListModal, #addAdvListModal,#changeAdvSeqModal{
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
  .advListModal_content,.addAdvListModal_content{
    position: relative;
    padding: 20px;
    width: 60%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
  .changeAdvSeqModal_content{
    position: relative;
    padding: 20px;
    width: 50%;
    margin: 80px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }
</style>
