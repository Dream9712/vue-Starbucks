<template>
    <div
        id="app"
        :class="[
            'app-container',
            {'isNav': $route.meta && $route.meta.navBar }
        ]"
    >
        <StarHead v-if="$route.meta && !$route.meta.headHidden" />
        <router-view/>
        <NavBar v-if="$route.meta && $route.meta.navBar" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import StarHead from './components/common/StarHead'
import NavBar from './components/common/Nav'
export default {
    name: 'Home',
    components: {
        StarHead,
        NavBar,
    },
    data () {
        return {}
    },
    watch: {
        // 弹出层 body滚动跳失效
        modelStatus (val) {
            document.body.style.overflow = val ? 'hidden' : '' 
        }
    },
    computed: {
        ...mapState(['modelStatus']),
    },
    methods: {}
}
</script>

<style lang="scss">
@import './assets/scss/mixins.scss';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 14px;
}
.app-container {
    padding-top: $head_px;
    background: #f6f6f6;
    &.isNav {
        padding-bottom: 60px;
    }
}
</style>
