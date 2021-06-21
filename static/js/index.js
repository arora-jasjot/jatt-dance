$(document).ready(function(){
    $("#responsive")[0].style.height = "0px";
    $("#icon").click(function (){
        if($("#responsive")[0].style.height == "0px")
            $("#responsive")[0].style.height = "auto";
        else
            $("#responsive")[0].style.height = "0px";
    })
    $(".nav-tab").click(function (){
        $("#responsive")[0].style.height = "0px";
    })
  });