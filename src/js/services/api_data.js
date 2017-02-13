/* globals $, ActDash */
//required jQuery

ActDash.APIData = function () {
    this.urlBase = "http://localhost/act.web.api/api/";
    this.access_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdnIiOiIobG9jYWwpIiwiZGIiOiJ2MTkiLCJ1biI6Impqb25lcyIsImlkIjoiMWNkYzA5OWYtNTcyMC00YjA2LTk3NTgtMzMzYmE0NjZiYjc0IiwiaWF0IjoiMjAxNy0wMi0xM1QyMDo0ODo1Ni40NDU3MjYxWiJ9.Vc_fQLyxuQvQZ5AYljEGKQsFBItYeq-LB4kvDJUfJ-w";
};

ActDash.APIData.prototype = {

    callApi: function (type, endpoint, cb_success, cb_fail) {
        var url = this.urlBase + endpoint;
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            async: true,
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