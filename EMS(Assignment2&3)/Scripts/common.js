function $1(id){
    return document.getElementById(id)
}
function $hide(id){
    $1(id).style.display = "none"
}
function $show(id){
    $1(id).style.display = "inline-block"
}
