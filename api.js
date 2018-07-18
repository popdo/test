/**
 * ViewImage.min.js 1.2.0
 * https://tokinx.github.io/ViewImage/
 */
(function(b){b.extend({viewImage:function(d){var c=b.extend({target:".view-image img",exclude:""},d);b(c.exclude).attr("view-image",!1);b(c.target).click(function(a){a={t:b(this),z:.9,m:Math.min,ww:b(window).width(),wh:b(window).height()};console.log(a.t);if(!b(this).attr("view-image")&&!b(this).is(c.exclude)&&(a.t.attr("src")||a.t.attr("href").match(/.+\.(jpg|jpeg|webp|gif|png)/gi)))return a.t.attr("src")?(a.is="zoom-out"===a.t[0].style.cursor,a.os=a.t.offset(),a.w=a.t.width(),a.h=a.t.height(),a.scale=
a.is?1:a.m(a.m(a.t[0].naturalWidth,a.ww*a.z)/a.w,a.m(a.t[0].naturalHeight,a.wh*a.z)/a.h),a.X=a.is?0:(-a.os.left+(a.ww-a.w)/2)/a.scale,a.Y=a.is?0:(-a.os.top+(a.wh-a.h)/2+b(document).scrollTop())/a.scale,a.t.attr("style",(a.is?"":"position: relative;z-index: 999;")+"transition: transform 0.4s;transform: scale("+a.scale+") translate("+a.X+"px, "+a.Y+"px);cursor: zoom-"+(a.is?"in":"out")+";")):(a.c=".vi-"+Math.random().toString(36).substr(2),b("body").append("<div class='"+a.c.substr(1)+"' style='position: fixed;background: rgba(255, 255, 255, "+
a.z+");top: 0;left: 0;right: 0;bottom: 0;z-index: 999;'></div>"),b(a.c).html("<img src="+a.t.attr("href")+" style='position: absolute;top: 50%;left: 50%;max-width: 90%;max-height: 90%;transform: translate(-50%,-50%);'>"),b(a.c).click(function(){b(this).remove()})),!1})}})})(jQuery);


document.body.addEventListener('touchstart', function(){ });
(function ($, window) {
	var App = App ||
	{
		init: function () {
			$('#js_search_icon').on('click', function (e) {
				e.stopPropagation();
				$('#js_search').toggleClass('open');
			});


			$('#search-input').click(function(e){
				e.stopPropagation();//防冒泡
				$(this).addClass('searching');
			});
		}
	};

	$(document).ready(function () { 
		App.init();

		/**-----------------------------
		*Ajax无刷新列表分页
		* by ashu.
		* URI: http://www.ashuwp.com
		*------------------------------*/
		// $('#ajax_pagination a').click( function() {
		// // $( 'body' ).on("click","#ajax_pagination a",function() {
		// 	$this = $(this);
		// 	$this.addClass('loading'); 
		// 	var href = $this.attr("href"); //获取下一页的链接地址
		// 	if (href != undefined) { //如果地址存在
		// 		$.ajax( { //发起ajax请求
		// 			url: href, //请求的地址就是下一页的链接
		// 			type: "get", //请求类型是get

		// 			error: function(request) {
		// 			//如果发生错误怎么处理
		// 			},
		// 			success: function(data) { //请求成功
		// 				$this.removeClass('loading');
		// 				var $res = $(data).find(".post"); //从数据中挑出文章数据，请根据实际情况更改
		// 				$('#ajax_content').append($res); //将数据加载加进posts-loop的标签中
		// 				var newhref = $(data).find("#ajax_pagination a").attr("href"); //找出新的下一页链接
		// 				if( newhref != undefined ){
		// 					$("#ajax_pagination a").attr("href",newhref);
		// 				}else{
		// 					$("#ajax_pagination").hide(); //如果没有下一页了，隐藏
		// 				}
		// 			}
		// 		});
		// 	}
		// 	return false;
		// });

		/**-----------------------------
		*new window open external
		*------------------------------*/
		/* <![CDATA[ */
		$("a[rel='external'],a[rel='external nofollow']").click(function(){window.open(this.href);return false})
		/* ]]> */
		/**-----------------------------
		*Ajax评论分页功能
		*URL: http://kayosite.com/ajax-turn-page-for-wordpress-comments-list.html
		*------------------------------*/
		$body=(window.opera)?(document.compatMode=="CSS1Compat"?$('html'):$('body')):$('html,body');
		// 点击分页导航链接时触发分页
		$('body').on('click', '.comments-pagination a', function(e){
			e.preventDefault();
			$.ajax({
				type: "GET",
				url: $(this).attr('href'),
				beforeSend: function(){
					$('.comments-pagination').remove();
					$('.comment-list').remove();
					$('#loading_box').append('<div class="loading-dot"><i class="loading loading-0"></i><i class="loading loading-1"></i><i class="loading loading-2"></i></div>').hide().slideDown(); //jim add
					// $('#loading_box').slideDown(); //原版
					
				},
				dataType: "html",
				success: function(out){
					result = $(out).find('.comment-list');
					nextlink = $(out).find('.comments-pagination');
					$('#loading_box').slideUp('fast');
					$('#loading_box').after(result.fadeIn(500));
					$('.comment-list').after(nextlink);
					$('#loading_box .loading-dot').remove(); //jim add
					jQuery('html,body').animate({scrollTop: $('#comments').offset().top -80}, 800 ); //jim add

				}
			});
		});

		/**-----------------------------
		*关闭评论用户input信息
		*------------------------------*/	
		// Show & hide comments
		$('#comment_ds_btn').show();
		$('#comments').hide();
		$('#comment_ds_btn').click(function(){
			$('#comments').slideDown(500);
			$('#comment_ds_btn').hide();
			jQuery('html,body').animate({scrollTop: $('#comments').offset().top -20}, 600 ); 
		});

		// control comment welcome
		if ( $( '#commentform .welcome' )[0] ){
			$( '.author-info' ).hide();
			// $( 'span.info-edit' ).click(function(){
			$( '#main' ).on("click","span.info-edit",function(e) {
				e.stopPropagation();
				$( '.author-info' ).toggle(200);//toggle 点击显示再点击隐藏的意思。参数是动画时间

				var text=$(this).html();
				if(text=="修改"){
					$(this).html("隐藏");
				}else{
					$(this).html("修改");
				}
			});

			
		}

		// control commet textarea
		$('#submit').hide();
		$('.author-info').hide();
		$('#comment').click(function(e){
			e.stopPropagation();//防冒泡
			$(this).addClass('saying');
			$('#submit').fadeIn();
			if ($('#commentform .welcome').html() == ""){
				$('.author-info').show();
			}
		});
		$(document).click(function(){
			if($('#comment').val()==''){
				$('#comment').removeClass('saying');
				$('#submit').hide();
			};
			if ($('#js_search').hasClass('open')) {
				$('#js_search').removeClass('open');

			}

		});


		/**-----------------------------
		*TOP menu open and close
		*------------------------------*/	
		$('.menu-toggle').click( function() {
			$(this).parent().toggleClass('open');
		});

		// menu on mobile
		$( '#site-navigation li.page_item_has_children, #site-navigation li.menu-item-has-children' ).append( '<button class="iconfont menu-dropdown">&#xe614;</button>' );
		// Mobile nav button functionality
		$( '.menu-dropdown' ).bind( 'click', function() {
			$(this).parent().toggleClass( 'open-sub-menu' );
		});


		/**-----------------------------
		* return to top
		*------------------------------*/
		$('#return_top').hide();  
		$(function(){  
			$(window).scroll(function(){  
				if($(window).scrollTop()>300){  
					$('#return_top').fadeIn(300);  
				}  
				else{$('#return_top').fadeOut(200);}  
			});  
			$('#return_top').click(function(){  
				$('body,html').animate({scrollTop:0},300);  
				return false;  
			})  
		});

		/**-----------------------------
		* 文章点赞功能
		*------------------------------*/
		$.fn.postLike = function () {
			if ($(this).hasClass('done')) {
				// alert('点多了伤身体~');
				return false;
			} else {
				$(this).addClass('done');
				var id = $(this).data("id"),
				action = $(this).data('action'),
				rateHolder = $(this).children('.count');
				var ajax_data = {
					action: "dotGood",
					um_id: id,
					um_action: action
				};
				$.post("/wp-admin/admin-ajax.php", ajax_data,
					function (data) {
						$(rateHolder).html(data);

					}
				);
				return false;
			}
		};
		// $(document).on("click", ".dotGood", function() {
		$(".dotGood").click(function () {
			$(this).postLike();
		});

		/**-----------------------------
		* 滚动到指定位置触发addclass
		*------------------------------*/
		function scroll_addclass(div,cssname,offset){
			var a,b,c,d;
			d=$(div).offset().top;//浏览器窗口的高度
			a=eval(d + offset);//元素相对于窗口的距离
			b=$(window).scrollTop(); //监控窗口已滚动的距离;
			c=$(window).height();//整个文档的高度
			if(b+c>a){
				$((div)).addClass((cssname));
			}
			if(b+c<a){
				$((div)).removeClass((cssname));
			}
		}
		$(window).scroll(function(){
			scroll_addclass("#footer .social",'animated elastic-in',60);
		});

		/**-----------------------------
		* AjaxSearch
		*------------------------------*/

		var input_search = $("#search-input");
		function makeAjaxSearch(result) {
		if (result.length == 0) {
		$("#search_filtered").empty().show().append('<li><a href="javascript:vold(0)"><strong> search none</strong></a></li>');
		} else {
		$("#search_filtered").empty().show();
		for (var i = 0; i < result.length; i++) $("#search_filtered").append('<li><a href="' + result[i]["url"] + '">' + result[i]["title"] + '</a></li>');
		}
		}
		
		var delaySearch;function startSearch() {
		$.ajax({
		type: "GET",
		url: home_url,
		data: "s=" + input_search.val(),
		dataType: 'json',
		success: function (result) {
		makeAjaxSearch(result);
		console.log(result);
		}
		});
		}
		
		var event_ajax_search = {
		bind_event: function () {
		input_search.bind('keyup', function (e) {
		if (input_search.val() != "" && e.keyCode != 40) {
		if (delaySearch) {
		clearTimeout(delaySearch)
		}
		delaySearch = setTimeout(startSearch, 200);
		}
		if (e.keyCode == 40) {
		search_filtered.moveable();
		}
		})
		},
		unbind_event: function () {
		input_search.unbind('keyup');
		}
		};
		
		var search_filtered = {
		moveable: function () {
		var current = 0;
		$('#search_filtered').find('a').eq(current).focus();
		$(document).bind("keydown.search_result", function (e) {
		if (e.keyCode == 40) {if (current >= $('#search_filtered').find('a').size()) {
		current = 0;
		}$('#search_filtered').find('a').eq(++current).focus();
		e.preventDefault();}
		if (e.keyCode == 38) {
		if (current < 0) {
		current = $('#search_filtered').find('a').size() - 1;
		}$('#search_filtered').find('a').eq(--current).focus();
		e.preventDefault();
		}
		});
		},
		hide: function () {
		$(document).unbind("keyup.search_result");
		$('#search_filtered').fadeOut();
		}
		};
		input_search.focus(function () {
		event_ajax_search.bind_event();
		}).blur(function () {
		event_ajax_search.unbind_event();
		});

		 $(document).click(function(event){
			  var _con = $('#search_box'); 
			  if(!_con.is(event.target) && _con.has(event.target).length === 0){ 
				$('#search_filtered').slideUp('fast'); 
			  }
		});

		/**-----------------------------
		* 给代码高亮插件prism的pre添加class实现显示行号
		*------------------------------*/
		$(".post-content pre[class^='language-']").addClass("line-numbers");


	});	//jQuery(document).ready end
}(jQuery, window));	//function ($, window) end
