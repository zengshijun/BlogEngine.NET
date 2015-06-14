﻿angular.module('blogAdmin').controller('NavController', ["$scope", "$location", "$rootScope", function ($scope, $location, $rootScope) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path() || $location.path().startsWith(viewLocation + "/");
    };
    $scope.IsPrimary = $rootScope.SiteVars.IsPrimary;
    $scope.security = $rootScope.security;
    $scope.UserVars = UserVars;

    $(".nav-primary > li").removeClass("active");

    if ($location.path().indexOf("blogs") > -1) {
        $("#mu-blogs").addClass("active");
    }
    else if ($location.path().indexOf("content") > -1) {
        $("#mu-content").addClass("active");
    }
    else if ($location.path().indexOf("custom") > -1) {
        $("#mu-custom").addClass("active");
    }
    else if ($location.path().indexOf("users") > -1) {
        $("#mu-users").addClass("active");
    }
    else if ($location.path().indexOf("settings") > -1) {
        $("#mu-settings").addClass("active");
    }
    else {
        $("#mu-dashboard").addClass("active");
    }
    if ($location.$$absUrl.indexOf("editor/post.cshtml") > -1) {
        $(".nav-primary > li").removeClass("active");
        $("#mu-content").addClass("active");
    }
    $(".nav-primary > li > a").click(function () {
        $(".nav-primary > li").removeClass("active");
        $(this).parent().addClass("active");
    });
}]);

angular.module('blogAdmin').controller('SubNavController', ["$scope", "$location", "$rootScope", function ($scope, $location, $rootScope) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.security = $rootScope.security;
    $scope.UserVars = UserVars;
}]);

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

function spinOn() {
    $("#spinner").removeClass("loaded");
    $("#spinner").addClass("loading");
}

function spinOff() {
    $("#spinner").removeClass("loading");
    $("#spinner").addClass("loaded");
}

function loading(id) {
    $("#" + id + "-spinner").removeClass("loaded");
    $("#" + id + "-spinner").addClass("loading");
}

function loaded(id) {
    $("#" + id + "-spinner").removeClass("loading");
    $("#" + id + "-spinner").addClass("loaded");
}

function rowSpinOff(items) {
    if (items.length > 0) {
        $('#tr-spinner').hide();
    }
    else {
        $('#div-spinner').html(BlogAdmin.i18n.empty);
    }
}

function selectedOption(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].OptionValue.toUpperCase() == val.toUpperCase()) return arr[i];
    }
}

function findInArray(arr, name, value) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (name in arr[i] && arr[i][name] == value) return arr[i];
    };
    return false;
}

function webRoot(url) {
    var result = SiteVars.ApplicationRelativeWebRoot;
    if (url.substring(0, 1) === "/") {
        return result + url.substring(1);
    }
    else {
        return result + url;
    }
}

function processChecked(url, action, scope, dataService) {
    spinOn();
    var i = scope.items.length;
    var checked = [];
    while (i--) {
        var item = scope.items[i];
        if (item.IsChecked === true) {
            checked.push(item);
        }
    }
    if (checked.length < 1) {
        return false;
    }
    dataService.processChecked(url + action, checked)
    .success(function (data) {
        scope.load();
        toastr.success(BlogAdmin.i18n.completed);
        if ($('#chkAll')) {
            $('#chkAll').prop('checked', false);
        }
        spinOff();
    })
    .error(function (data) {
        toastr.error(BlogAdmin.i18n.failed);
        spinOff();
    });
}

function getFromQueryString(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}