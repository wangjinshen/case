<template>
  <div class="calendar">
    <div ref="Tbody" class="schedule" :style="scheduleStyle"></div>
    <table class="calendar-table">
      <thead class="calendar-head">
        <tr>
          <th rowspan="8" class="week-td">星期/时间</th>
          <th colspan="24">00:00 - 12:00</th>
          <th colspan="24">12:00 - 24:00</th>
        </tr>
        <tr>
          <td colspan="2" v-for="i in 24" :key="i">{{i}}</td>
        </tr>
      </thead>
      <tbody
        class="calendar-body"
        @mousemove="onMousemove"
        @mousedown="onMousedown"
        @mouseup="onMouseup"
      >
        <tr>
          <td>星期一</td>
          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('1,'+i)"
            :data-id="('1,'+i)"
          ></td>
        </tr>
        <tr>
          <td>星期二</td>
          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('2,'+i)"
            :data-id="('2,'+i)"
          ></td>
        </tr>
        <tr>
          <td>星期三</td>

          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('3,'+i)"
            :data-id="('3,'+i)"
          ></td>
        </tr>
        <tr>
          <td>星期四</td>
          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('4,'+i)"
            :data-id="('4,'+i)"
          ></td>
        </tr>
        <tr>
          <td>星期五</td>
          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('5,'+i)"
            :data-id="('5,'+i)"
          ></td>
        </tr>
        <tr>
          <td>星期六</td>
          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('6,'+i)"
            :data-id="('6,'+i)"
          ></td>
        </tr>
        <tr>
          <td>星期日</td>
          <td
            class="calendar-time"
            @click="itemClick"
            v-for="i in 48"
            :key="('7,'+i)"
            :data-id="('7,'+i)"
          ></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="49">
            <div class="calendar-foot">
              <div class="calendar-foot-left">
                <span class="none-action">未选</span>
                <span class="action">已选</span>
              </div>
              <span class="clear" @click="clearData">清空选择</span>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
    <!-- <ul>
      <li v-for="(item, index) in viewDateArr" :key="index">
        <h2>
          {{
          item.title
          }}
        </h2>
        <p>
          <span v-for="(it, index) in item.arr" :key="index">{{item.arr[index+1]}}</span>
        </p>
      </li>
    </ul> -->
  </div>
</template>
<script>
import { screen, setItemDate } from "../utils";
export default {
  name: "calendar-table",
  data() {
    return {
      left: 0, //
      top: 0,
      clientX: 0,
      clientY: 0,
      isMousedown: false, // 为true时，才出发mousemove
      scheduleStyle: {},
      dateTime: [],
      viewDateArr: [],
      oldArr: [],
      domPoction: null
    };
  },
  methods: {
    clearData() {
      let time = document.querySelectorAll(".calendar-time");
      Array.from(time).forEach(ele => {
        let timeId = ele.getAttribute("data-id");
        ele.classList.remove("bg");
        this.dateTime = this.dateTime.filter(i => i !== timeId);
      });
    },
    //点击事件
    itemClick(e) {
      e.preventDefault();
      let dom = e.target;
      //获取class
      let classListData = Array.from(e.target.classList);
      let timeId = dom.getAttribute("data-id");
      if (classListData.includes("bg")) {
        //选择取消高亮
        dom.classList.remove("bg");
        this.dateTime = this.dateTime.filter(e => {
          return e !== timeId;
        });
      } else {
        //添加高亮
        dom.classList.add("bg");
        this.dateTime.push(timeId);
      }
    },
    onMousemove(e) {
      e.preventDefault();
      const { clientX, clientY } = e;
      if (this.isMousedown) {
        let left = this.left,
          top = this.top,
          width = 0,
          height = 0;
        //判断滑动方向
        width = clientX - this.clientX;
        height = clientY - this.clientY;
        //x轴向左
        if (clientX < this.clientX) {
          width = this.clientX - clientX;
          left = this.left - width;
        }
        if (clientY < this.clientY) {
          height = this.clientY - clientY;
          top = this.top - height;
        }
        this.scheduleStyle = {
          width: `${width}px`,
          height: `${height}px`,
          display: "block",
          opacity: 0.6,
          left: `${left}px`,
          top: `${top}px`
        };
      }
    },
    // 鼠标按下事件
    onMousedown(e) {
      e.preventDefault();
      this.isMousedown = true;
      const { clientX, clientY } = e;
      this.left = e.pageX;
      this.top = e.pageY;
      this.clientX = clientX;
      this.clientY = clientY;
      //判断滑动方向
      this.scheduleStyle = {
        width: `0px`,
        height: `0px`,
        display: "block",
        opacity: 0.6,
        left: `${clientX}px`,
        top: `${clientY}px`
      };
    },
    onMouseup(e) {
      e.preventDefault();
      this.isMousedown = false;
      this.oldArr = this.dateTime;
      this.scheduleStyle = {
        width: `0px`,
        height: `0px`,
        display: "none",
        opacity: 0
      };
      //getBoundingClientRect
      //节点位置
      this.domPoction = this.$refs.Tbody.getBoundingClientRect();
      let time = document.querySelectorAll(".calendar-time");
      //位置对比
      Array.from(time).forEach(ele => {
        let itemPoction = ele.getBoundingClientRect();
        if (
          itemPoction.top + 10 - this.domPoction.top >= 0 &&
          this.domPoction.bottom + 10 - itemPoction.bottom >= 0 &&
          itemPoction.left + 5 - this.domPoction.left >= 0 &&
          this.domPoction.right + 5 - itemPoction.right >= 0
        ) {
          //在范围内的节点进行操作
          let timeId = ele.getAttribute("data-id");
          if (!this.dateTime.includes(timeId)) {
            ele.classList.add("bg");
            this.dateTime.push(timeId);
          } else {
            ele.classList.remove("bg");
            this.dateTime = this.dateTime.filter(i => i !== timeId);
          }
        }
      });
    }
  },
  //监听
  watch: {
    dateTime(val) {
      let viewDate = {};
      let viewDateArr = [];
      val.map(e => {
        let arr = e.split(",");
        if (!viewDate.hasOwnProperty(screen(arr[0]))) {
          viewDate[screen(arr[0])] = [arr[0], setItemDate(arr[1])];
        } else {
          if (!viewDate[screen(arr[0])].includes(setItemDate(arr[1]))) {
            viewDate[screen(arr[0])].push(setItemDate(arr[1]));
          }
        }
      });
      let dataArr = Object.keys(viewDate)
        .map(k => viewDate[k])
        .sort((a, b) => Number(a[0]) - Number(b[0]));

      dataArr.forEach(ele => {
        viewDateArr.push({
          title: screen(ele[0]),
          arr: ele
        });
      });
      this.viewDateArr = viewDateArr;
      this.$emit("caseData", viewDateArr);
    }
  }
};
</script>

<style lang="stylus" scoped>
*, :after, :before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

table {
  border-spacing: 0;
}

.calendar {
  background-color: #fff;
  position: relative;
  margin-top: 10px;
  display: inline-block;

  .schedule {
    position: fixed;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    display: block;
    background: #2F88FF;
    pointer-events: none;
  }

  .calendar-table {
    border-collapse: collapse;
    border-radius: 4px;

    tr, td, th {
      border: 1px solid #E4E9ED;
      font-size: 12px;
      text-align: center;
      min-width: 11px;
      height: 21px;
    }

    thead {
      th, td {
        background: #F8F9FA;
      }
    }

    .calendar-body {
      tr {
        td {
          border: 1px solid #E4E9ED;

          &:hover {
            background-color: #f1f1f1;
          }

          &.selected {
            background-color: #2F88FF;
          }
        }

        & > td:first-child {
          background-color: #F8F9FA;
        }
      }
    }
  }

  .calendar-foot {
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 0;

    .calendar-foot-left {
      span {
        margin-left: 20px;
        position: relative;
      }

      .action {
        &::after {
          position: absolute;
          content: '';
          display: block;
          width: 10px;
          height: 20px;
          background: #2f88ff;
          top: 0;
          left: -14px;
          border: 1px solid #E4E9ED;
        }
      }

      .none-action {
        &::after {
          position: absolute;
          content: '';
          display: block;
          width: 10px;
          height: 20px;
          background: #fff;
          top: 0;
          left: -14px;
          border: 1px solid #E4E9ED;
        }
      }
    }

    .clear {
      color: #2f88ff;
    }
  }
}

td::selection {
  background: rgba(0, 0, 0, 0);
}

th::selection {
  background: rgba(0, 0, 0, 0);
}

.bg {
  background: #2f88ff;
  cursor: pointer;
}
</style>
