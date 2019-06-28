var pageCount = 1;
var noExperts = 0;

// DOM LOAD
jQuery(function(){
    var $ = jQuery;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        $('body').addClass('mobile');
    } else {
        $('body').addClass('desktop');
    }
    
    
    var cookieNotice = getCookie('cookieNotice');
    if(!cookieNotice.length) {
        $('body').append('<div id="cookieNotice"><div id="cookieClose">x</div><p>Our Website uses cookies to improve your experience. By continuing to use the site you are agreeing to them. Please visit our <a href="/privacy-policy/">Privacy policy</a> page for more information about cookies and how we use them.</p></div>');
        
        var cookieTimer = setTimeout(function(){
            $('#cookieNotice').fadeOut();
            setTimeout(function(){
                $('#cookieNotice').remove();
            },1000);
            setCookie('cookieNotice','true',360);
        },10000);
        
        $('#cookieNotice').click(function(){
            setCookie('cookieNotice','true',360);
            clearTimeout(cookieTimer);
            $('#cookieNotice').fadeOut();
            setTimeout(function(){
                $('#cookieNotice').remove();
            },1000);
        });
    }
    $('.menuSearch a').html('<i class="fa fa-search"></i>');
    if($('#ctaStrip').length) {
        resizeElements('#ctaStrip .col a');
        /*$('#ctaStrip .col').each(function(){
           $(this).children('a').css('height',($(this).height() - 90)+'px'); 
        });*/
    }
    
    if($('#loadmoreEvents').length) {
    $('#loadmoreEvents').click(function(){
      var data = {
        action: 'get_events',
        pageNum: pageCount,
        ppp: $(this).attr('data_ppp'),
      };
      $.post(ajax_object.ajax_url, data, function(response){
        if(response) {
          $('#events').append(response);
          pageCount++;
          addtocalendar.load();
        } else {
          $('#loadmoreEvents').remove();
        }
      });
    });
  }
  if($('#blogArticles').length) {
    resizeElements($('.blogArticle'));
    $(window).resize(function(){
        $('.blogArticle').height('');
        resizeElements($('.blogArticle'));
    });
    setTimeout(function(){
        $('#blogArticles').masonry({
          itemSelector: '.blogArticle',
          columnWidth: '.grid-sizer',
          percentPosition: true
        });
    },500);
  }
  if($('#loadBlogArticles').length) {
    $('#loadBlogArticles').click(function(){
      var data = {
        action: 'get_articles',
        pageNum: pageCount,
        ppp: $(this).attr('data_ppp'),
        filter: $(this).attr('data_filter'),
      };
      $.post(ajax_object.ajax_url, data, function(response){
        if(response) {
          var $items = $(response);
          $('#blogArticles').append($items).masonry('appended',$items);
          $('.blogArticle').height('');
          resizeElements($('.blogArticle'));
          pageCount++;
          $('#blogArticles').masonry('destroy');
          $('#blogArticles').masonry({
            itemSelector: '.blogArticle',
            columnWidth: '.grid-sizer',
            percentPosition: true
          });
        } else {
          $('#loadBlogArticles').remove();
        }
      });
    });
  }
  
  if($('#loadNewsArticles').length) {
    $('#loadNewsArticles').click(function(){
      var data = {
        action: 'get_news_articles',
        pageNum: pageCount,
        ppp: $(this).attr('data_ppp'),
        filter: $(this).attr('data_filter'),
      };
      $.post(ajax_object.ajax_url, data, function(response){
        if(response) {
          var $items = $(response);
          $('#blogArticles').append($items).masonry('appended',$items);
          $('.blogArticle').height('');
          resizeElements($('.blogArticle'));
          pageCount++;
          $('#blogArticles').masonry('destroy');
          $('#blogArticles').masonry({
            itemSelector: '.blogArticle',
            columnWidth: '.grid-sizer',
            percentPosition: true
          });
        } else {
          $('#loadNewsArticles').remove();
        }
      });
    });
  }
  
  if($('#faqsHolder').length) {
    $('#faqCategories .col').click(function(){
        $('#faqCategories .col.active').removeClass('active');
        $(this).addClass('active');
        
        var filter = $(this).attr('data_filter');
        
        if(filter == 'all') {
            $('.faqItem').removeClass('active');
            $('.faqItem').addClass('visible');
        } else {
            $('.faqItem').removeClass('active');
            $('.faqItem').removeClass('visible');
            $('.faqItem.'+filter).addClass('visible');
        }
    });
    $('.faqItem').click(function(){
        if($(this).hasClass('active')) {
          $(this).removeClass('active');
        } else {
          $('.faqItem.active').removeClass('active');
          $(this).addClass('active'); 
        }
    });
  }
  
  if($('#twHolder').length) {
    $('#twHolder').each(function(){
        $(this).load('/twitterloader.php?twitterAccount='+$(this).attr('data_handle')+'&tweetCount='+$(this).attr('data_tweetcount'));
    });
  }
  $('.menu-item a').click(function(){
    if($(window).width() <= 803) {
        if($(this).parent('.menu-item').hasClass('menu-item-has-children')) {
            if(!$(this).parent('.menu-item').children('.sub-menu').hasClass('visible')) {
                $(this).parent('.menu-item').addClass('submenuOpen');
                $(this).parent('.menu-item').append('<div class="closeSubmenu"><i class="fa fa-chevron-up"></i></div>')
                $(this).parent('.menu-item').children('.sub-menu').addClass('visible');
                return false;
            }
        }
    }
    return true;
  });
  $(document).on('click','.closeSubmenu',function(){
    $(this).parent('.menu-item').removeClass('submenuOpen');
    $(this).parent('.menu-item').children('.sub-menu').removeClass('visible');
    $(this).remove();
  });
  $('#mobileNavToggle').click(function(){
    $('body').toggleClass('mobileNav');
  })
  $('#sidebarToggle').click(function(){
    $('#sidebar').toggleClass('visible');
  });
});

// PAGE LOAD
jQuery(window).ready(function(){
    var $ = jQuery;
    if($('#eventsSlider').length) {
        $('#eventsSlider').bxSlider({
            'mode': 'fade',
            'controls': true,
            'pager': false
        });
    }
    if($('.scrollingSection').length) {
        $('.page-id-1221 .scrollingSection').customScrollbar({});
    }
    if($('.adsHolder').length) {
        $('.adsHolder').bxSlider({
            'mode': 'fade',
            'controls': false,
            'pager' : ($(".adsHolder > .ad").length > 1) ? true: false,
        });
    }
    if($('#eventQuotes').length) {
       $('#eventQuotes').bxSlider({
            'mode': 'fade',
            'controls': false,
        });
    }
    if($('#studentNewsSlider').length) {
        var sliderWidth = $('#studentNewsSlider').width();
        var noSlides = Math.floor(sliderWidth / 260);
        var slideMargin = Math.floor((sliderWidth / noSlides) - 260);
        
        //console.log(sliderWidth);
        //console.log(noSlides);
        //console.log(slideMargin);
        
        $('#studentNewsSlider').bxSlider({
            'mode' : 'horizontal',
            'pager' : false,
            'minSlides' : noSlides,
            'maxSlides' : noSlides,
            'moveSlides' : 1,
            'slideWidth' : 260,
            'slideMargin' : slideMargin - 1
        });
        
    }
    if($('#testimonialsHolder').length) {
        $('#testimonialsHolder').bxSlider({
            'mode': 'fade',
            'controls': false,
            'pager' : ($("#testimonialsHolder > .testimonial").length > 1) ? true: false,
        });
    }
    
    if($('#expertsHolder').length) {
        
        spaceExperts();
        
        $(window).on('resize',function(){
            $('.expertOuter').css('margin-left',null);
            $('.expertOuter').css('margin-right',null);
            spaceExperts();
        });
        
        $('.expertImageHolder').click(function(){
           if($(this).hasClass('active')) {
             $(this).removeClass('active');
             $(this).parent('.expertOuter').removeClass('active');
             $('#expertsOuter').removeClass('active');
             $('#expertInfo').remove();
             exit;
           }
           $('.expertImageHolder.active').removeClass('active');
           $('.expertOuter.active').removeClass('active');
           
           $(this).addClass('active');
           $(this).parent('.expertOuter').addClass('active');
           $('#expertsOuter').addClass('active');
           
           var id = $(this).parent('.expertOuter').attr('id');
           id = id.substring(3,id.length);
           var expertID = $(this).parent('.expertOuter').attr('data_expert');
           var after = Math.ceil(id / noExperts) * noExperts;
           var totalExperts = $('.expertOuter').length;
           
           if(after > totalExperts) {
             after = totalExperts;
           }
           
           var data = {
             action: 'get_expert',
             expertID: expertID
           };
           $.post(ajax_object.ajax_url, data, function(response){
             if(response) {
               $('#expertInfo').remove();
               $('#exp'+after).after(response);
               $('#expertInfo').fadeIn('slow');
               $('html, body').animate({
                 scrollTop: ($('#expertInfo').offset().top - 330)
               }, 1000);
             }
           });
           
        });
        
        var expert = getUrlParameter('expert');
        if(expert) {
            $('.expertOuter[data_expert="'+expert+'"]').children('.expertImageHolder').click();
        }
        
    }
    
    if($('#openingexclusions').length) {
        $('#openingexclusions').click(function(){
            if($(this).hasClass('open')) {
              $('#openingExclusionHolder').remove();
              $(this).removeClass('open');
            } else {
               $(this).addClass('open');
               var data = {
                 action: 'get_openingExclusions',
               };
               $.post(ajax_object.ajax_url, data, function(response){
                 if(response) {
                   $('#openingexclusions').after(response);
                 }
               });
            }
        });
        $('#openingexclusions').click();
        $('#openingexclusions').css('display','none');
        $('#openingExclusionHolder').css('padding-top','20px');
    }
    
    if($('#costaexclusions').length) {
        $('#costaexclusions').click(function(){
            if($(this).hasClass('open')) {
              $('#costaOpeningExclusionHolder').remove();
              $(this).removeClass('open');
            } else {
               $(this).addClass('open');
               var data = {
                 action: 'get_costaOpeningExclusions',
               };
               $.post(ajax_object.ajax_url, data, function(response){
                 if(response) {
                   $('#costaexclusions').after(response);
                 }
               });
            }
        });
    }
    if($('#timetableHolder').length) {
        resizeElements('.activity .activityTitle');
        resizeElements('.activity');
        
        $('.activity').click(function(){
            var group = $(this).attr('data_group');
            var description = $(this).attr('data_description');
            var banner = $(this).attr('data_banner');
            var title = $(this).children('.activityTitle').html();
            var bookURL = $(this).attr('data_bookurl');
            
            $('body').append('<div class="overlayHolder"><div class="overlayInner '+group+'"><img src="'+banner+'" alt="'+title+'" /><div id="activityDetailsInner"><h1>'+title+'</h1><span id="activityDetailsDescription"><p>'+description+'</p></span><p class="bookButton"><a target="_blank" href="'+bookURL+'" class="whiteborderbutton">BOOK CLASS</a></p></div></div></div>');
            $('.overlayInner').height($('.overlayInner').outerHeight()+'px');
            $('.overlayInner').addClass('set');
            
            $('.overlayHolder').click(function(){
                $(this).remove();
            });
            $('.overlayInner').click(function(e){
                e.stopPropagation();
            });
            
        });
    }
    if($('.single-clubs').length) {
        $( ".accordion" ).accordion({icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },collapsible: true, active: false,heightStyle:"content"});
        $('#viewmoreFixtures').click(function(){
            if($('.single-clubs #fixtures tr.toggle').hasClass('hidden')) {
                $('.single-clubs #fixtures tr.hidden').removeClass('hidden');
                $(this).html('VIEW LESS');
            } else {
                $('.single-clubs #fixtures tr.toggle').addClass('hidden');
                $(this).html('VIEW MORE');
            }
        });
    }
    
    $('.jumpLink').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {
    
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                 $('html,body').animate({
                     scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    
});

function spaceExperts() {
    var $ = jQuery;
    $('.expertOuter').height('');
    resizeElements('.expertOuter');
    var holderWidth = $('#expertsHolder').width();
    var expertWidth = $('.expertOuter').width();
    
//console.log(holderWidth);
//console.log(expertWidth);

    noExperts = Math.floor(holderWidth / expertWidth);
//console.log(noExperts);

    var expMargin = (holderWidth - (expertWidth * noExperts)) / noExperts;
//console.log(expMargin);

    var margin = Math.floor(expMargin / 2);
//console.log(margin);

    $('.expertOuter').css('margin-left',margin+'px');
    $('.expertOuter').css('margin-right',margin+'px');
//console.log(((margin * 2) + (expertWidth)) * noExperts);
}

function resizeElements(el) {
  var $ = jQuery;
  if($(el).length) {
    var maxHeight = 0;
    $(el).each(function(){
      if($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });
    $(el).height(maxHeight+'px');
  }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; path=/";
} 
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};