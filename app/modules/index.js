import ui from './ui/index'
import other from './other/index'
export default {
    state:{
        count: 0,
        meun:0,
        bg:false,
        loading:0,
        token:VukTook.getSession("itvadmintoken"),
        admin:sessionStorage.getItem("itvusername")
    },
    modules: {
        ui,
        other
    },
}
