<template>
    <div class="main">
        <h3>充值记录</h3>
        <table>
            <thead>
                <tr>
                    <th>充值单号</th>
                    <th>充值途径</th>
                    <th>充值类型</th>
                    <th>充值金额</th>
                    <th>充值数量</th>
                    <th>充值时间</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10010</td>
                    <td>支付宝</td>
                    <td>书币</td>
                    <td>20</td>
                    <td>2000</td>
                    <td>2019-4-10 12:00:00</td>
                </tr>
            </tbody>
        </table>
        <h3>消费记录</h3>
        <table>
            <thead>
                <tr>
                    <th>消费作品</th>
                    <th>消费书币</th>
                    <th>消费时间</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10010</td>
                    <td>2000</td>
                    <td>2019-4-10 12:00:00</td>
                </tr>
            </tbody>
        </table>
    </div>
</template> 

<script>
    export default{
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    div.main>table{
        margin-top: 20px;
        width: 800px;
        text-align: center;
        border-collapse: collapse;
    }
    div.main>h3{
        margin-top: 20px;
    }
    div.main>table>tbody>tr>td,th{
        font-size: 14px;
        border: 1px solid #000;
    }
</style>