jQuery(document).ready(function ($) {

  // Smooth scroll for the menu and links with .scrollto classes
  $('.smoothscroll').on('click', function (e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {

        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // aplication items
  $(".portfolio-item,.portfolio-popup").click(function (e) {
    var ev = e || window.event;
    if (ev && ev.stopPropagation) {
      //非IE浏览器
      ev.stopPropagation();
    } else {
      //IE浏览器(IE11以下)
      ev.cancelBubble = true;
    }
    $("#" + e.target.id).slideToggle()
  });

  // 定义一个分页方法，可多次调用
  function paginationNick(opt) {
    // 参数设置
    var pager = {
      paginationBox: '',//分页容器-- 必填
      mainBox: '',//内容盒子--必填
      numBtnBox: '',//数字按钮盒子-- 必填
      btnBox: '',//按钮盒子 --必填
      ipt: '',//input class-- 必填
      goBtn: '',//go btn class --必填
      currentBtn: '',//当前按钮class name --必填
      pageCount: 8,//每页显示几条数据
      numBtnCount: 1,//当前页左右两边各多少个数字按钮
      currentPage: 0,//当前页码data-page，首屏默认值
      maxCount: 0,//动态数据分成的最大页码
      data: []//动态的数据
    };
    pager = $.extend(pager, opt);
    //请求数据页面跳转方法
    function goPage(btn) {
      pager.data = [
        { 'href': 'https://www.hk01.com/%E4%B8%96%E7%95%8C%E5%B0%88%E9%A1%8C/588481/neuralink-%E6%98%AF%E4%BB%80%E9%BA%BC%E4%BB%A4elon-musk%E5%A4%9C%E4%B8%8D%E8%83%BD%E5%AF%90', 'title': '香港01报导：“Neuralink｜是什麼令Elon Musk夜不能寐？”', 'date': 'Feb 17, 2021' },
        { 'href': 'https://www.nature.com/articles/s41598-020-80477-w', 'title': 'Geissler, C. et al.: 《Shedding light on the prefrontal correlates of mental workload in simulated driving: a functional near-infrared spectroscopy study》', 'date': 'January 12, 2021' },
        { 'href': 'https://www.nature.com/articles/s41598-020-71287-1', 'title': 'Kangassalo, L. et al.: 《Neuroadaptive modelling for generating images matching perceptual categories》', 'date': 'September 07, 2020' },
        { 'href': 'https://www.nature.com/articles/s42256-020-00237-3', 'title': 'Lechner, M. et al.: 《Neural circuit policies enabling auditable autonomy》', 'date': '10 March 2020' },
        { 'href': 'https://www.nature.com/articles/s41598-020-71287-1', 'title': 'Scientific Reports:《Neuroadaptive modelling for generating images matching perceptual categories》', 'date': 'September 7, 2020' },
        { 'href': "https://www.youtube.com/watch?v=sr8hzF3j2fo", 'title': 'Elon Mask’s Neuralink Presentation', 'date': 'August 28, 2020' },
        { 'href': 'https://www.nature.com/articles/s41593-020-0608-8', 'title': 'Facebook Reality Labs: 《Machine translation of cortical activity to text with an encoder–decoder framework》', 'date': 'March 20, 2020' },
        { 'href': 'https://www.nature.com/articles/s41467-019-10994-4', 'title': 'Facebook Reality Labs: 《Real-time decoding of question-and-answer speech dialogue using human cortical activity》', 'date': 'July 30, 2019' },
        { 'href': 'https://arxiv.org/abs/1907.11692', 'title': 'Facebook AI:《RoBERTa: A Robustly Optimized BERT Pretraining Approach》', 'date': 'July 26,2019 ' },
        { 'href': 'https://arxiv.org/abs/1907.11065', 'title': '复旦大学：《DropAttention: A Regularization Method for Fully-Connected Self-Attention Networks》', 'date': 'July 25, 2019' },
        { 'href': 'https://www.biorxiv.org/content/10.1101/703801v1', 'title': 'Neuralink Paper: An Integrated brain-macine interface platform with thousands of channels.', 'date': 'July 17, 2019' },
        { 'href': 'https://arxiv.org/abs/1906.02448', 'title': '中国科学院计算技术研究所：《Bridging the Gap between Training and Inference for Neural Machine Translation》', 'date': 'June 6, 2019' },
      ];
      //设置动态数据分成的最大页码
      pager.maxCount = Math.ceil(pager.data.length / pager.pageCount);
      // 设置当前页码
      if (!isNaN(btn)) {//数字按钮
        pager.currentPage = parseInt(btn);
      } else {
        switch (btn) {
          case 'first':
            pager.currentPage = 0;
            break;
          case 'prev':
            if (pager.currentPage > 0) {
              --pager.currentPage;
            }
            break;
          case 'next':
            if (pager.currentPage + 1 < pager.maxCount) {
              ++pager.currentPage;
            }
            break;
          case 'last':
            pager.currentPage = pager.maxCount - 1;
            break;
        }
      }
      //创建数字按钮
      createNumBtn(pager.currentPage);
      //赋值给页码跳转输入框的value，表示当前页码
      $('.' + pager.btnBox + ' .' + pager.ipt).val(pager.currentPage + 1);
      // 内容区填充数据
      var arr = [], str = '';
      arr = pager.data.slice(pager.pageCount * pager.currentPage,
        pager.data.length - pager.pageCount * (pager.currentPage + 1) > -1 ?
          pager.pageCount * (pager.currentPage + 1) : pager.data.length);
      // 分每页的前半部分和后半部分
      function buildItem(arr, start, end) {
        var strHtml = ''
        for (let item = start; item < end; item++) {
          console.log(arr[item])
          strHtml += `<a href=${arr[item]['href']}>
                    <li style="text-align: left;">
                      ${arr[item]['title']}
                    </li>
                    </a>
                    <i style="text-indent: 1.5em;display: block; font-size: 0.8em; text-align: left">${arr[item]['date']}</i>
                    <br>`
        }
        return strHtml;
      }

      str = `<div class="col-md-4 col-md-offset-2">
            ${buildItem(arr, 0, Math.ceil(arr.length / 2))}
            </div>
            <div class="col-md-4 col-md-offset-1">
            ${buildItem(arr, Math.ceil(arr.length / 2), arr.length)}
            </div>`

      $('.' + pager.mainBox).html(str);
    }
    //创建非数字按钮
    function createOtherBtn() {
      $('.' + pager.paginationBox).html('<div class="' + pager.btnBox + '"><button data-page="first" class="first-btn">首页</button><button data-page="prev" class="prev-btn">上一页</button><span class="' + pager.numBtnBox + '"></span><button data-page="next" class="next-btn">下一页</button><input type="text" placeholder="页码" class="' + pager.ipt + '"><button data-page class="' + pager.goBtn + '">跳转</button><button data-page="last" class="last-btn">尾页</button></div>');
      //ipt value变化并赋值给go btn data-page
      $('.' + pager.btnBox + ' .' + pager.ipt).change(function () {
        if (!isNaN($(this).val())) {//是数字
          if ($(this).val() > pager.maxCount) {//限制value最大值，跳转尾页
            $(this).val(pager.maxCount);
          }
          if ($(this).val() < 1) {//限制value最小值，跳转首页
            $(this).val(1);
          }
        } else {//非数字清空value
          $(this).val('');
        }
        $('.' + pager.btnBox + ' .' + pager.goBtn).attr('data-page', $(this).val() ? $(this).val() - 1 : '');
      });
      //每个btn绑定请求数据页面跳转方法
      $('.' + pager.btnBox + ' button').each(function (i, v) {
        $(this).click(function () {
          //有值且不是上一次的页码时才调用
          if (v.getAttribute('data-page') && v.getAttribute('data-page') != pager.currentPage) {
            goPage(v.getAttribute('data-page'));
          }
        });
      });
    }
    //创建数字按钮
    function createNumBtn(page) {
      //page是页面index从0开始，这里的page加减一要注意
      var str = '';
      if (pager.maxCount > pager.numBtnCount * 2) {//若最大页码数大于等于固定数字按钮总数（pager.numBtnCount*2+1）时
        //此页左边右边各pager.numBtnCount个数字按钮
        if (page - pager.numBtnCount > -1) {//此页左边有pager.numBtnCount页 page页码从0开始
          for (var m = pager.numBtnCount; m > 0; m--) {
            str += '<button data-page="' + (page - m) + '">' + (page - m + 1) + '</button>';
          }
        } else {
          for (var k = 0; k < page; k++) {
            str += '<button data-page="' + k + '">' + (k + 1) + '</button>';
          }
        }
        str += '<button data-page="' + page + '" class="' + pager.currentBtn + '" disabled="disabled">' + (page + 1) + '</button>';//此页
        if (pager.maxCount - page > pager.numBtnCount) {//此页右边有pager.numBtnCount页 page页码从0开始
          for (var j = 1; j < pager.numBtnCount + 1; j++) {
            str += '<button data-page="' + (page + j) + '">' + (page + j + 1) + '</button>';
          }
        } else {
          for (var i = page + 1; i < pager.maxCount; i++) {
            str += '<button data-page="' + i + '">' + (i + 1) + '</button>';
          }
        }
        /*数字按钮总数小于固定的数字按钮总数pager.numBtnCount*2+1时，
        这个分支，可以省略*/
        if (str.match(/<\/button>/ig).length < pager.numBtnCount * 2 + 1) {
          str = '';
          if (page < pager.numBtnCount) {//此页左边页码少于固定按钮数时
            for (var n = 0; n < page; n++) {//此页左边
              str += '<button data-page="' + n + '">' + (n + 1) + '</button>';
            }
            str += '<button data-page="' + page + '" class="' + pager.currentBtn + '" disabled="disabled">' + (page + 1) + '</button>';//此页
            for (var x = 1; x < pager.numBtnCount * 2 + 1 - page; x++) {//此页右边
              str += '<button data-page="' + (page + x) + '">' + (page + x + 1) + '</button>';
            }
          }
          if (pager.maxCount - page - 1 < pager.numBtnCount) {
            for (var y = pager.numBtnCount * 2 - (pager.maxCount - page - 1); y > 0; y--) {//此页左边
              str += '<button data-page="' + (page - y) + '">' + (page - y + 1) + '</button>';
            }
            str += '<button data-page="' + page + '" class="' + pager.currentBtn + '" disabled="disabled">' + (page + 1) + '</button>';//此页
            for (var z = page + 1; z < pager.maxCount; z++) {//此页右边
              str += '<button data-page="' + z + '">' + (z + 1) + '</button>';
            }
          }
        }
      } else {
        str = '';
        for (var n = 0; n < page; n++) {//此页左边
          str += '<button data-page="' + n + '">' + (n + 1) + '</button>';
        }
        str += '<button data-page="' + page + '" class="' + pager.currentBtn + '" disabled="disabled">' + (page + 1) + '</button>';//此页
        for (var x = 1; x < pager.maxCount - page; x++) {//此页右边
          str += '<button data-page="' + (page + x) + '">' + (page + x + 1) + '</button>';
        }
      }
      $('.' + pager.numBtnBox).html(str);

      //每个btn绑定请求数据页面跳转方法
      $('.' + pager.numBtnBox + ' button').each(function (i, v) {
        console.log(i);
        $(this).click(function () {
          goPage(v.getAttribute('data-page'));
        });
      });
      //按钮禁用 && 左右键图标
      $('.' + pager.btnBox + ' button').not('.' + pager.currentBtn).attr('disabled', false);
      $('.left-page').off('click');
      $('.right-page').off('click');
      $('.left-page').click(function () {
        goPage('prev');
      });
      $('.right-page').click(function () {
        goPage('next');
      });
      $('.right-page,.left-page').css('opacity', '1');
      if (!page) {//首页时
        $('.' + pager.btnBox + ' .first-btn').attr('disabled', true);
        $('.' + pager.btnBox + ' .prev-btn').attr('disabled', 'disabled');
        $('.left-page').off('click');
        $('.left-page').css('opacity', '0.3');
      }
      if (page == pager.maxCount - 1) {//尾页时
        $('.' + pager.btnBox + ' .last-btn').attr('disabled', true);
        $('.' + pager.btnBox + ' .next-btn').attr('disabled', true);
        $('.right-page').off('click');
        $('.right-page').css('opacity', '0.3');
      }
    }
    //首屏加载
    createOtherBtn();//首屏加载一次非数字按钮即可
    goPage();//请求数据页面跳转满足条件按钮点击都执行，首屏默认跳转到currentPage
  }
  //调用
  paginationNick({
    paginationBox: 'pagination-nick',//分页容器--必填
    mainBox: 'main-box-nick',//内容盒子--必填
    numBtnBox: 'num-box-nick',//数字按钮盒子-- 必填
    btnBox: 'btn-box-nick',//按钮盒子 --必填
    ipt: 'page-ipt-nick',//input class-- 必填
    goBtn: 'go-btn-nick',//go btn class --必填
    currentBtn: 'active-nick'//当前按钮class name --必填
  });
});
