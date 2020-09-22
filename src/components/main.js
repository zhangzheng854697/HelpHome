import store from '../store/store.js'
function addTag(PageName){
	let Page = PageName.split('/')[1]
	store.state.tags.forEach(function(item,i){
		if(item.href == Page){
			item.effect = 'light'
		}else{
			item.effect = 'plain'
		}
	})
}
export default {
	addTag,
}