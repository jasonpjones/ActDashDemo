/* globals $, ActDash */
//required jQuery

ActDash.APIData = function () {
    this.urlBase = "http://localhost/act.web.api/api/";
    this.access_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdnIiOiIobG9jYWwpIiwiZGIiOiJ2MTkiLCJ1biI6Impqb25lcyIsImlkIjoiMWNkYzA5OWYtNTcyMC00YjA2LTk3NTgtMzMzYmE0NjZiYjc0IiwiaWF0IjoiMjAxNy0wMi0xN1QyMTowMTo1NS4zNjY1NTU0WiJ9.ZYsvlOIAUtw5tGUjaH_HS387_DyXMbcYh50AciKyK6k";
};

ActDash.APIData.prototype = {

    callApi: function (type, endpoint, cb_success, cb_fail) {
        var url = this.urlBase + endpoint;
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            async: false,       //important - when deserializing and calling this from a loop, this has to be non-async or the calls step on eachother.
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', this.access_token);
                xhr.setRequestHeader('Content-Type', 'application-json');
            }.bind(this),
            success: function (data) {
                if (typeof cb_success === 'function') {
                    cb_success(data);
                }
            },
            error: function (xhr, txt, e) {
                if (typeof cb_fail === 'function') {
                    cb_fail(xhr, txt, e);
                }
            }
        });
    }

};