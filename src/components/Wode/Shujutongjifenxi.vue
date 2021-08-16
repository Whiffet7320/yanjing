<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">全部平台数据</div>
    </div>
    <div class="box">
      <div class="bingtu">
        <div id="main" style="width: 600px; height: 400px"></div>
      </div>
      <div class="shuzhuangtu">
        <div class="tit">更新时间：2019-02-28 13:11:00</div>
        <div id="main2" style="width: 600px; height: 400px"></div>
      </div>
    </div>
    <div class="zhexiantu">
      <div id="main3" style="width: 1200px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  async mounted() {
    const resp = await this.$api.otherIndex();
    console.log(resp);
    //   饼图
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    };
    option.series[0].data.push({
      value: resp.data.thisMonthOrder,
      name: "本月订单量",
    });
    option.series[0].data.push({
      value: resp.data.thisWeekOrder,
      name: "本周订单量",
    });
    option.series[0].data.push({
      value: resp.data.thisDayOrder,
      name: "今日订单量",
    });
    option.series[0].data.push({
      value: resp.data.totalCount,
      name: "订单总数",
    });
    myChart.setOption(option);
    // 树状图
    var chartDom2 = document.getElementById("main2");
    var myChart2 = echarts.init(chartDom2);
    var option2;

    option2 = {
      title: {
        text: "成交额统计",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: ["今日成交额", "本月成交额", "本季度成交额"],
      },
      series: [
        {
          name: "2011年",
          type: "bar",
          data: [],
        },
      ],
    };
    option2.series[0].data.push(resp.data.totalDayMoney);
    option2.series[0].data.push(resp.data.totalMonthMoney);
    option2.series[0].data.push(resp.data.totalSeasonMoney);
    myChart2.setOption(option2);
    // 折线图
    var chartDom3 = document.getElementById("main3");
    var myChart3 = echarts.init(chartDom3);
    var option3;
    option3 = {
      title: {
        text: "近30天销售额统计表",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "line",
          areaStyle: {},
        },
      ],
    };
    const res = await this.$api.otherNearly_thirty_date();
    console.log(res);
    var i = 0;
    for (const key in res.data) {
      this.$set(option3.xAxis.data, i, key);
      this.$set(option3.series[0].data, i, res.data[key]);
      i++;
      // option3.xAxis.data.push(key);
      // option3.series.data.push(res.data[key])
    }
    myChart3.setOption(option3);
  },
};
</script>

<style lang="scss" scoped>
.nav1 {
  width: 100%;
  height: 80px;
  opacity: 1;
  background: #ffffff;
  .tit1 {
    opacity: 1;
    font-size: 25px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #2f313d;
    line-height: 80px;
    margin-left: 44px;
  }
}
.box {
  display: flex;
  .bingtu {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    opacity: 1;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
  }
  .shuzhuangtu {
    margin-top: 35px;
    margin-left: 10px;
    .tit {
      transform: translateY(10px);
      opacity: 1;
      font-size: 18px;
      font-family: SourceHanSansCN-Normal;
      text-align: right;
      color: #282828;
      line-height: 22px;
    }
    #main2 {
      padding: 20px;
      margin-top: 36px;
      opacity: 1;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
    }
  }
}
.zhexiantu {
  padding: 20px;
  width: 1210px;
  margin-top: 35px;
  opacity: 1;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
}

</style>