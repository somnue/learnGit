/**
 * @author TianHan
 */
/*** 登录页面  ***/
   $(function(){
     //页面的渐显效果
      $('body').css("opacity", 0); 
      $('body').animate({ opacity: '1' }, 2000);
      //获取焦点  ID需要和页面的用户名称保持一致，否则将获取不到焦点  
      setTimeout("$('#username').focus()",2100);   
      
    });  