import Vue from 'vue'
import { 
    Button,
    Icon,
    Form,
    Field,
    Tabbar,
    TabbarItem,
    Loading,
    Swipe,
    SwipeItem,
    IndexBar,
    IndexAnchor,
    Cell,
    AddressList,
    AddressEdit,
    Popup,
    Toast,
    Dialog
} from 'vant'

Vue.use(Button)
    .use(Icon)
    .use(Form)
    .use(Field)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Loading)
    .use(Swipe)
    .use(SwipeItem)
    .use(IndexBar)
    .use(IndexAnchor)
    .use(Cell)
    .use(AddressList)
    .use(AddressEdit)
    .use(Popup)
    .use(Toast)
    .use(Dialog)

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
    