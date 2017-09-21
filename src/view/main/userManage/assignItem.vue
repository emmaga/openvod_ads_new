<template>
  <div class="assignItemModal" v-show="itemData.show">
    <div class="assignItemModal_content">
      <div class="FS20 mar-bottom20">添加项目

        <button class="btn" style="float: right" @click="closeModal">&times;</button>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #ddd;"></div>
      <div class="Txt-left FS18 mar-bottom20" v-if="itemData.data">账号：{{itemData.data.Username}}</div>
      <div class="pad-20">
        <div>
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
              @current-change="handlePageChange"
              :current-page.sync="listData.currentPage"
              :page-size="listData.pageSize"
              layout="total, prev, pager, next"
              :total="listData.Total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="Txt-right">
        <el-button type="primary" @click="addItem">添加</el-button>
        <el-button class="MarginLeft20" @click="closeModal">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        itemList: [],
        listData: {
          currentPage: 1,
          pageSize: 25,
          Total: null
        },
        selectedSqueue: [],
        allSelectedList: [],
        changeingPage: false,
        tableData3: [{
          image: null,
          Name: '清鹤开机广告1',
          url: 'www.baidu.com'
        }, {
          image: null,
          Name: '清鹤开机广告2',
          url: 'www.baidu.com'
        }, {
          image: null,
          Name: '清鹤开机广告3',
          url: 'www.baidu.com'
        }, {
          image: null,
          Name: '清鹤开机广告4',
          url: 'www.baidu.com'
        }],
        multipleSelection: []
      }
    },
    computed: {
      assignItemModalShow: function () {
        return this.itemData.show
      }
    },
    watch: {
      assignItemModalShow: function (newDATA) {
        if (newDATA === true) {
          this.getItemList()
        }
      }
    },
    props: ['itemData'],
    methods: {
      getItemList () {
        this.axios.post('/project', {
          action: 'getUnassignedList',
          data: {
            per_page: this.listData.pageSize,
            page: this.listData.currentPage
          }
        })
          .then((data) => {
            this.changeingPage = false
            if (data.status === 200) {
              this.itemList = data.data.data.data
              this.listData.Total = data.data.data.Total
              if (this.selectedSqueue.length === 0) {
                var length = Math.ceil(this.listData.Total / this.listData.pageSize)
                for (var i = 0; i < length; i++) {
                  this.selectedSqueue.push([])
                }
              }
              var temp = this.getIndex(this.selectedSqueue[this.listData.currentPage - 1], this.itemList)
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
      closeModal () {
        this.$emit('close', false)
        this.itemList = []
        this.selectedSqueue = []
        this.listData = {
          currentPage: 1,
          pageSize: 25,
          Total: null
        }
      },
      handlePageChange (val) {
        this.changeingPage = true
        this.listData.currentPage = val
        this.getItemList()
//        console.log(this.selectedSqueue)
        this.$refs.multipleTable.clearSelection()
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
          this.selectedSqueue[this.listData.currentPage - 1] = val
        }
        console.log(this.selectedSqueue)
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
      },
      getID () {},
      addItem () {
        console.log(this.selectedSqueue)
        console.log(this.itemData.data)
        var idArr = []
        for (var i = 0; i < this.selectedSqueue.length; i++) {
          for (var j = 0; j < this.selectedSqueue[i].length; j++) {
            idArr.push(this.selectedSqueue[i][j].ID)
          }
        }
        console.log(idArr)
        if (idArr.length < 1) {
          this.$message({
            type: 'error',
            message: '请选择要分配的项目!'
          })
          return
        }
        this.axios.post('/user', {
          action: 'addProject',
          data: {
            ProjectIDs: idArr,
            UserID: this.itemData.data.ID
          }
        })
          .then((data) => {
            if (data.status === 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.closeModal()
            } else {
              this.$message('！')
            }
          })
          .catch((error) => {
            this.changeingPage = false
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="css" scoped>
  .assignItemModal {
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

  .assignItemModal_content {
    position: relative;
    padding: 20px;
    width: 60%;
    margin: 40px auto;
    opacity: 1;
    z-index: 3;
    background: #fff;
    border-radius: 5px;
  }

</style>
