function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
};


var openWidget = getUrlVars()['open'];

var getWidgetHeight;
function userPref() {
    // Adjust the content font-size to the iframe size
    var clientHeigh = document.documentElement.clientHeight;
    var innerHeigh = window.innerHeight;
    var elFontSize = 0;
    var elements = null;

    elements = document.querySelector(".success, .error, .back");
    if (elements.length != 0) {
        while (innerHeigh < clientHeigh) {
            Array.from(elements).forEach(function() {
                elFontSize = parseInt(this.style.fontSize);
                elFontSize--;
                this.style.fontSize = elFontSize + "px";
            });
            if (clientHeigh === document.documentElement.clientHeight) {
                break;
            } else {
                clientHeigh = document.documentElement.clientHeight;
            }
        }
    }

    // Set subcription cookie value to true if user has successfully subscribed
    if (openWidget == "auto#" ) {
        var success = document.querySelector(".success");
        if (success) {
            // The target origin is * because we cannot determine what the origin of the user's website will be
            // This could be a security risk if we are sending sensitive data but not in this case
            window.parent.postMessage({'subscribed': true}, "*");
        }
    }
};

function popinResponsive () {
    if (document.querySelector('.mj-w-overlay-editor') && document.querySelector('.mj-w-overlay-editor').classList.contains('mj-w-resp')) {
        document.querySelector('body').classList.remove('responsive')
    }

    if (document.getElementsByClassName("mj-w-overlay-editor").length) {
        getWidgetHeight = getWidgetHeight ? getWidgetHeight : document.querySelector(".mj-w-overlay-editor").offsetHeight;
    }

    var iframeDetect = (window.self !== window.top);

    if(iframeDetect === true) {

        if(document.getElementsByClassName("mj-embedded").length) {
            if(document.querySelector('.mj-vertical')) {

                var widthEmbbededVertical = document.querySelector("form.mj-form").offsetWidth;

                var knowBackgroundColor = document.querySelector('.mj-embedded').style.backgroundColor;

                if (widthEmbbededVertical < 1200) {
                    document.querySelector('body').style.backgroundColor = knowBackgroundColor;
                }else{
                    document.querySelector('body').style.backgroundColor = "transparent";
                }
            }

            if(document.querySelector('.mj-horizontal')) {

                var widthEmbbededHorizontal = document.querySelector("form.mj-form").offsetWidth;

                var knowBackgroundColor = document.querySelector('.mj-embedded').style.backgroundColor;

                if (openWidget === "auto") {
                    document.querySelector('.mj-embedded').style.height = "212px";
                    document.querySelector('.mj-embedded').style.setProperty("padding", "0px", "important");
                }

                if (widthEmbbededHorizontal < 1200) {
                    document.querySelector('body').style.backgroundColor = knowBackgroundColor;
                }else{
                    document.querySelector('body').style.backgroundColor = "transparent";
                }
            }
        }
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
        /* Mobile responsive version */

        if (document.getElementsByClassName("mj-w-overlay-editor").length) {
            // Popin horizontal
            if (document.querySelector('.mj-horizontal')) {

                var widthPopinHorizontal = document.querySelector("form.mj-form").offsetWidth;
                if (widthPopinHorizontal < 640) {

                    if (!document.querySelector('.mj-w-overlay-editor').classList.contains('mj-w-resp')) {
                        document.querySelector('html').style.overflow = "auto";
                        document.querySelector('body').style.overflow = "auto";
                        document.querySelector('body').style.height = "100%";
                        document.querySelector('.mj-w-overlay-editor').style.minHeight = "100%";
                    }

                    document.querySelector('.mj-w-overlay-editor').style.width = "100%";
                    document.querySelector('.mj-w-overlay-editor').style.height = "auto";
                    document.querySelector('.mj-w-overlay-editor').style.boxShadow = "none";

                    document.querySelector('.w-preview-field-table').style.width = "100%";
                    document.querySelector('.mj-form-button').style.width = "100%";
                    document.querySelector('.mj-form-button').style.margin = "0 auto";

                    var inputPopinCell = document.querySelectorAll('.w-preview-fields-content-cell input');

                    if (inputPopinCell.length != 0) {
                        for (var i = 0; i < inputPopinCell.length; i++) {
                            if (inputPopinCell[i].getAttribute('type') != 'checkbox') {
                                inputPopinCell[i].style.width = "100%";
                            }
                        }
                    }
                } else {

                    if (!document.querySelector('.mj-w-overlay-editor').classList.contains('mj-w-resp')) {
                        document.querySelector('.mj-w-overlay-editor').style.height = getWidgetHeight;
                        document.querySelector('.mj-w-overlay-editor').style.minHeight = "328px";
                    }

                    if (document.getElementsByClassName('w-preview-fields-content-cell').length === 1 && document.querySelectorAll('#w-preview-consent-checkbox').length === 0) {
                        document.querySelector('.w-preview-field-table input').style.width = "60%";
                        document.querySelector('.mj-form-button').style.width = "35%";
                        document.querySelector('.mj-form-button').style.margin = "-46px 0px 0px";
                    }
                }

            }

            //Popin vertical
            if (document.querySelector('.mj-vertical')) {

                if (!document.querySelector('.mj-w-overlay-editor').classList.contains('mj-w-resp')) {
                    document.querySelector('html').style.overflow = "auto";
                    document.querySelector('body').style.overflow = "auto";
                    document.querySelector('.mj-w-overlay-editor').style.height = "100%";
                } else {
                    document.querySelector('.mj-w-overlay-editor').style.height = "auto";
                    document.querySelector('.mj-w-overlay-editor').style.minHeight = "auto";
                }
                document.querySelector('.mj-w-overlay-editor').style.boxShadow = "none";

                var widthPopinVertical = document.querySelector("form.mj-form").offsetWidth;

                /* We need to know the width of the content popin for made responsive. So it's 690px and the responsive begin here */
                if (widthPopinVertical < 690) {
                    document.querySelector('.mj-w-overlay-editor').style.width = "100%";

                    document.querySelector('.mj-popin-header').style.width = "100%";
                    document.querySelector('.mj-popin-header').style.height = "auto";

                    document.querySelector('.mj-layout_vertical').style.width = "100%";
                    if (!document.querySelector('.mj-w-overlay-editor').classList.contains('mj-w-resp')) {
                        document.querySelector('.mj-layout_vertical').style.minHeight = "auto";
                        document.querySelector('.mj-popin-body').style.minHeight = "0";
                    } else {
                        document.querySelector('.mj-popin-body').style.minHeight = "auto";
                        document.querySelector('.mj-layout_vertical').style.minHeight = "auto";
                    }

                    document.querySelector('.mj-popin-body').style.width = "100%";
                    document.querySelector('.mj-w-popin-block').style.height = "auto";

                    document.querySelector('.mj-w-popin-block').style.display = "flex";
                    document.querySelector('.mj-w-popin-block').style.width = "100%";
                    document.querySelector('.mj-w-popin-block').style.flexDirection = "column";

                    document.querySelector('.mj-popin-footer').style.width = "100%";
                } else {

                    document.querySelector('.mj-vertical').style.width = "auto";
                    document.querySelector('.mj-popin-header').style.width = "55%";

                    document.querySelector('.mj-layout_vertical').style.width = "45%";
                    document.querySelector('.mj-layout_vertical').style.minHeight = "400px";
                    
                    if (!document.querySelector('.mj-w-overlay-editor').classList.contains('mj-w-resp')) {
                        document.querySelector('.mj-w-popin-block').style.height = "100%";
                        document.querySelector('.mj-popin-body').style.minHeight = "200px";
                    } else {
                        document.querySelector('.mj-w-popin-block').style.height = "auto";
                        document.querySelector('.mj-popin-body').style.minHeight = "200px";
                    }
                    document.querySelector('.mj-popin-footer').style.width = "100%";

                    document.querySelector('.mj-w-popin-block').style.display = "table";
                    document.querySelector('.mj-w-popin-block').style.width = "100%";
                }
            }
        }
    }
}

function iframe(translation) {
    /* This code is done for retro compatibility version, so don't delete please */
    if (document.getElementsByClassName("mj-w-overlay-editor").length) {
        var userWidth = document.querySelector('.mj-w-overlay-editor').style.width ;
        var userHeight = document.querySelector('.mj-w-overlay-editor').style.height ;
        getWidgetHeight = document.querySelector(".mj-w-overlay-editor").offsetHeight;

        document.querySelector('.mj-w-overlay-editor').style.boxShadow = "none";

        if (document.querySelector('.mj-horizontal')) {
            document.querySelector('.mj-w-popin-content').style.padding = "20px 0px 0px";
            document.querySelector('.mj-popin-header').style.height = "141px";
            document.querySelector('.mj-w-popin-block').style.height = "auto";

            var inputPopin = document.querySelectorAll('.w-preview-field-table input');

            if (inputPopin.length > 1) {
                for (var i = 0; i < inputPopin.length; i++) {
                    if (inputPopin[i].getAttribute('type') != 'checkbox') {
                        inputPopin[i].style.width = "100%";
                    }
                }
            }

            if (document.getElementsByClassName('w-preview-fields-content-cell').length > 1 || document.querySelectorAll('#w-preview-consent-checkbox').length !== 0) {
                document.querySelector('.w-preview-field-table').style.width = "100%";
                document.querySelector('.mj-form-button').style.width = "100%";
                document.querySelector('.mj-form-button').style.margin = "0 auto";
            } else {
                document.querySelector('.mj-form-button').style.width = "35%";
                document.querySelector('.mj-form-button').style.margin = "-46px 0px 0px";
                try {
                    // If selector fails, it makes Safari stop the execution flow.
                    document.querySelector('.w-preview-field-table input:not([type="checkbox"]').style.width = "60%";
                } catch(e) {}
            }


        }
    }

    /** End of Retro Compatibility code **/

    window.addEventListener('resize', function() {
      popinResponsive();
    }, false);


    function mailcheckHideSlow() {
        if (document.querySelector(".mj-mailcheck") && document.querySelector(".mj-mailcheck").style.display === "block") {
            document.querySelector(".mj-mailcheck").style.display = "none";
        }
    };


    if(typeof Mailcheck != "undefined") {
        // Embed widget
        var fieldEmail = document.getElementById('w-preview-fields-content-cell-field-email');
        if (!fieldEmail) {
            // Popin widget
            fieldEmail = document.querySelector('.w-preview-fields-content-cell-field-email');
        }
        fieldEmail.onblur = function(){
            Mailcheck.run({
                email: fieldEmail.value,
                suggested: function(suggestion) {
                    if (!document.querySelector('.mj-mailcheck')) {
                        var suggestionText = translation;
                        var suggestionTitle = suggestionText.replace("%suggestion%", suggestion.full);
                            suggestionText = suggestionText.replace("%suggestion%", "<a class=\"mj-w-suggest\" href=\"#\" title=\"" + suggestionTitle + "\">" + suggestion.full + "</a>");
                        fieldEmail.insertAdjacentHTML('afterend', "<div class=\"mj-mailcheck\">" + suggestionText + "<span class=\"mj-close-suggestion\">X</span></div>");
                        document.querySelector('.mj-mailcheck').style.display = 'block';
                    } else {
                        document.querySelector('.mj-w-suggest').textContent = suggestion.full;
                        var visible = document.querySelector(".mj-mailcheck").style.display;
                        if (visible != 'block') {
                            document.querySelector(".mj-mailcheck").style.display = 'block';
                        }
                    }

                    document.querySelector(".mj-w-suggest").onclick = function () {
                        fieldEmail.value = this.textContent;
                        document.querySelector(".mj-mailcheck").style.display = "none";
                    };

                    document.querySelector('.mj-close-suggestion').onclick = function() {
                        mailcheckHideSlow();
                    };

                    document.querySelector("form.mj-form").onkeypress = function(){
                        mailcheckHideSlow();
                    };
                },
                empty: function() {

                }
            });
        };
    }

    // Add button action and set pointer cursor
    // Embed mode
    var subscribeButton = document.getElementById("form-button");
    if (!subscribeButton) {
        // Popin mode
        subscribeButton = document.querySelector(".mj-form-button");
    }
    if (subscribeButton) {
        subscribeButton.style.cursor = "pointer";
        subscribeButton.onclick = function() {
            var mailcheckDisplay = document.querySelector(".mj-mailcheck");
            if(mailcheckDisplay) {
                mailcheckDisplay.style.display = "none";
            }
            document.querySelector(".mj-submit_button").click();
        };
    }
};
