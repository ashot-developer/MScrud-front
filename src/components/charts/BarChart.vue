<template>
  <q-card class="q-pa-sm text-white" style="background:linear-gradient( 135deg, #363636 25%, #2c343c 80%)">
    <q-card-section class="text-h6">
      Շրջանառություն
      <q-btn icon="fa fa-download" class="float-right text-white" @click="SaveImage" flat dense color="white">
        <q-tooltip>Download PNG</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-md">
      <IEcharts style="height: 300px;" ref="barRef" @ready="onReady" :option="bar" :resizable="true"></IEcharts>
    </q-card-section>
  </q-card>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';
    import axios from 'axios';
    import { axiosParams } from '../../services/consts';
    export default {
        name: "BarChart",
        data() {
            return {
                ins: null,
                echarts: null,
                bar: {},
                }
        },
        methods: {
            SaveImage() {
                const linkSource = this.$refs.barRef.getDataURL();
                const downloadLink = document.createElement('a');
                document.body.appendChild(downloadLink);
                downloadLink.href = linkSource;
                downloadLink.target = '_self';
                downloadLink.download = 'BarChart.png';
                downloadLink.click();
            },
            async onReady(instance, echarts) {
                var data = [];
                await axios.get(axiosParams.url + '/incomBlack').then((res) => {
                    return data = res.data;
                })
                this.echarts = echarts
                console.log(data)
                let dataAxis = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'];
                let yMax = Math.max.apply(null, data);
                let dataShadow = [];
                for (let i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }
                this.bar = {
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} դրամ"
                    },
                    grid: {
                        top: '5%',
                        bottom: '15%',
                        left: '8%',
                        right: '5%'
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0.05)'}
                            },
                            barGap: '-100%',
                            barCategoryGap: '70%',
                            data: dataShadow,
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#fff'},
                                            {offset: 0.5, color: '#fff'},
                                            {offset: 1, color: '#fff'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#fff'},
                                            {offset: 0.7, color: '#fff'},
                                            {offset: 1, color: '#fff'}
                                        ]
                                    )
                                }
                            },
                            data: data
                        }
                    ]
                }
            }
        },
        components: {
            IEcharts
        },
    }
</script>

<style scoped>
</style>
