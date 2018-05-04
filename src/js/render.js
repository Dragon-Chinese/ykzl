define(['jquery', 'handlebars'], function($, Handlebars) {
    function render(soucerTpl, data, targetEle) {
        var swiperTpl = $(soucerTpl).html();
        var template = Handlebars.compile(swiperTpl);
        Handlebars.registerHelper("addInd", function(ind) {
            ind += 1;
            return ind
        })
        
         Handlebars.registerHelper("status", function(status) {
            if (status) {
                return "完结"
            } else {
                return "连载中"
            }
        })

        Handlebars.registerHelper("equal", function(param1, param2, options) {
            if (param1 == param2) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            }
        })

        Handlebars.registerHelper("limit", function(param1, param2, options) {
            if (param1 < param2) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            }
        })
        var html = template(data);
        $(targetEle).html(html);
    }
    return render
})